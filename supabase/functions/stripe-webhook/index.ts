import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const signature = req.headers.get("Stripe-Signature");
  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  
  if (!webhookSecret || !stripeSecretKey) {
    console.error("Missing required environment variables");
    return new Response("Configuration error", { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
  
  // Create Supabase client with service role key
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log(`Processing webhook event: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log("Processing checkout session:", session.id);
      
      if (!session.customer_email) {
        console.error("No customer email in session");
        return new Response("No customer email", { status: 400 });
      }

      // Determine credits based on the amount paid
      let credits = 0;
      const amountPaid = session.amount_total || 0;
      
      // Map amounts to credit packages
      if (amountPaid >= 59000) { // $590 for 10 videos
        credits = 10;
      } else if (amountPaid >= 34500) { // $345 for 5 videos  
        credits = 5;
      } else if (amountPaid >= 7900) { // $79 for 1 video
        credits = 1;
      }

      console.log(`Amount paid: ${amountPaid}, Credits to grant: ${credits}`);

      // Check if user already exists
      const { data: existingUser } = await supabaseService.auth.admin.getUserByEmail(session.customer_email);
      
      let userId: string;

      if (existingUser.user) {
        // User exists, update their credits
        userId = existingUser.user.id;
        console.log(`Existing user found: ${userId}`);
        
        const { data: profile, error: profileError } = await supabaseService
          .from('profiles')
          .select('video_credits')
          .eq('user_id', userId)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return new Response("Error fetching profile", { status: 500 });
        }

        const newCredits = (profile?.video_credits || 0) + credits;
        
        const { error: updateError } = await supabaseService
          .from('profiles')
          .update({ video_credits: newCredits })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error updating credits:', updateError);
          return new Response("Error updating credits", { status: 500 });
        }

        console.log(`Updated credits for existing user: ${newCredits}`);
      } else {
        // Create new user
        console.log(`Creating new user for email: ${session.customer_email}`);
        
        const { data: newUser, error: userError } = await supabaseService.auth.admin.createUser({
          email: session.customer_email,
          email_confirm: true,
          user_metadata: {
            full_name: session.customer_details?.name || ""
          }
        });

        if (userError) {
          console.error('Error creating user:', userError);
          return new Response("Error creating user", { status: 500 });
        }

        userId = newUser.user.id;
        console.log(`New user created: ${userId}`);

        // Update profile with credits
        const { error: updateError } = await supabaseService
          .from('profiles')
          .update({ video_credits: credits })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error setting initial credits:', updateError);
          return new Response("Error setting credits", { status: 500 });
        }

        console.log(`Set initial credits for new user: ${credits}`);

        // Send password reset email to allow user to set password
        const { error: resetError } = await supabaseService.auth.admin.generateLink({
          type: 'recovery',
          email: session.customer_email,
          options: {
            redirectTo: `${req.headers.get("origin") || "https://hyjeykiayvetbreouaio.supabase.co"}/auth`
          }
        });

        if (resetError) {
          console.error('Error sending password reset email:', resetError);
        } else {
          console.log('Password reset email sent successfully');
        }
      }

      // Record the order
      const { error: orderError } = await supabaseService
        .from('orders')
        .insert({
          user_id: userId,
          stripe_session_id: session.id,
          order_type: 'video_package',
          amount: amountPaid,
          status: 'completed',
          credits_granted: credits
        });

      if (orderError) {
        console.error('Error recording order:', orderError);
        // Don't fail the webhook for this
      }

      console.log(`Webhook processing completed successfully for session: ${session.id}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
});