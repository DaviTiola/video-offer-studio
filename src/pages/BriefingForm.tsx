import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, CheckCircle, CreditCard, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const BriefingForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    companyName: "",
    projectName: "",
    selectedTemplate: "",
    mainOffer: "",
    prices: "",
    callToAction: "",
    targetAudience: "",
    tone: "",
    objectives: "",
    additionalInfo: "",
    deliveryFormat: [],
    urgentDelivery: false
  });

  // Load user credits
  useEffect(() => {
    const loadUserCredits = async () => {
      if (!user) {
        setLoadingCredits(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('video_credits')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setUserCredits(data?.video_credits || 0);
      } catch (error) {
        console.error('Error loading credits:', error);
      } finally {
        setLoadingCredits(false);
      }
    };

    loadUserCredits();
  }, [user]);

  // Calculate addon pricing
  const selectedFormats = formData.deliveryFormat;
  const baseFormatIncluded = selectedFormats.length > 0; // First format is free
  const additionalFormats = Math.max(0, selectedFormats.length - 1);
  const addonCost = additionalFormats * 15; // $15 per additional format
  const urgentCost = formData.urgentDelivery ? 50 : 0;
  const totalAddonCost = addonCost + urgentCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a project briefing.",
        variant: "destructive",
      });
      window.location.href = '/auth';
      return;
    }

    // Check if user has credits
    if (userCredits <= 0) {
      toast({
        title: "No Credits Available",
        description: "You need video credits to submit a project. Please purchase a video package first.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (totalAddonCost > 0) {
        // Create Stripe checkout for add-ons
        const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-addon-checkout', {
          body: {
            amount: totalAddonCost * 100, // Convert to cents
            addonFormats: selectedFormats
          }
        });

        if (checkoutError) throw checkoutError;

        // Store form data in sessionStorage to continue after payment
        sessionStorage.setItem('briefingFormData', JSON.stringify(formData));
        
        // Redirect to Stripe checkout
        window.open(checkoutData.url, '_blank');
        return;
      } else {
        // No add-ons, submit directly and deduct credit
        await submitProject();
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitProject = async () => {
    try {
      // Create project in database
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user!.id,
          project_name: formData.projectName,
          template_id: formData.selectedTemplate,
          offers_and_prices: `${formData.mainOffer}\n\nPrices: ${formData.prices}\n\nCall to Action: ${formData.callToAction}`,
          observations: `Target Audience: ${formData.targetAudience}\n\nObjectives: ${formData.objectives}\n\nTone: ${formData.tone}\n\nAdditional Info: ${formData.additionalInfo}\n\nDelivery Formats: ${formData.deliveryFormat.join(', ')}\n\nUrgent Delivery: ${formData.urgentDelivery ? 'Yes' : 'No'}\n\nAddon Cost: $${totalAddonCost}`
        })
        .select()
        .single();

      if (error) throw error;

      // Deduct 1 credit from user
      const { error: creditError } = await supabase
        .from('profiles')
        .update({ video_credits: userCredits - 1 })
        .eq('user_id', user!.id);

      if (creditError) throw creditError;

      setUserCredits(prev => prev - 1);
      setIsSubmitted(true);
      
      toast({
        title: "Project Submitted Successfully!",
        description: "Our team will start working on your video within 24 hours.",
      });

      // Reset form
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        companyName: "",
        projectName: "",
        selectedTemplate: "",
        mainOffer: "",
        prices: "",
        callToAction: "",
        targetAudience: "",
        tone: "",
        objectives: "",
        additionalInfo: "",
        deliveryFormat: [],
        urgentDelivery: false
      });

      // Clear any stored form data
      sessionStorage.removeItem('briefingFormData');

    } catch (error) {
      console.error('Project submission error:', error);
      throw error;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Briefing Received!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your submission. Our production team will start working on your video and deliver it within 24 hours.
            </p>
            <div className="space-y-3">
              <Button variant="cta" className="w-full" onClick={() => window.location.href = '/app/dashboard'}>
                View Dashboard
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                Submit Another Briefing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loadingCredits) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Video Production Briefing
          </h1>
          <p className="text-xl text-muted-foreground">
            Provide us with your campaign details and we'll create your professional video in 24 hours.
          </p>
          
          {/* Credits Display */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-medium">Available Credits: {userCredits}</span>
            </div>
            {userCredits <= 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span className="text-destructive font-medium">No credits available</span>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/#pricing'}>
                  Purchase Credits
                </Button>
              </div>
            )}
          </div>
        </div>

        {userCredits <= 0 ? (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No Video Credits Available
              </h2>
              <p className="text-muted-foreground mb-6">
                You need video credits to submit a project briefing. Please purchase a video package to get started.
              </p>
              <div className="space-y-3">
                <Button variant="cta" className="w-full" onClick={() => window.location.href = '/#pricing'}>
                  View Pricing Packages
                </Button>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/app/dashboard'}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Full Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientPhone">Phone</Label>
                  <Input
                    id="clientPhone"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project/Campaign Name *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="selectedTemplate">Selected Template</Label>
                  <Select value={formData.selectedTemplate} onValueChange={(value) => setFormData(prev => ({ ...prev, selectedTemplate: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern & Clean</SelectItem>
                      <SelectItem value="aggressive">Bold & Aggressive</SelectItem>
                      <SelectItem value="elegant">Elegant & Sophisticated</SelectItem>
                      <SelectItem value="fun">Fun & Energetic</SelectItem>
                      <SelectItem value="professional">Professional & Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tone">Video Tone *</Label>
                  <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="urgent">Urgent & Direct</SelectItem>
                      <SelectItem value="luxury">Luxury & Premium</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Content */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Campaign Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mainOffer">Main Offer/Message *</Label>
                  <Textarea
                    id="mainOffer"
                    placeholder="Describe your main offer, product, or service that will be featured in the video"
                    value={formData.mainOffer}
                    onChange={(e) => setFormData(prev => ({ ...prev, mainOffer: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prices">Prices/Offers *</Label>
                    <Textarea
                      id="prices"
                      placeholder="List your prices, discounts, or special offers"
                      value={formData.prices}
                      onChange={(e) => setFormData(prev => ({ ...prev, prices: e.target.value }))}
                      required
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="callToAction">Call to Action *</Label>
                    <Textarea
                      id="callToAction"
                      placeholder="What action should viewers take? (Call now, Visit website, etc.)"
                      value={formData.callToAction}
                      onChange={(e) => setFormData(prev => ({ ...prev, callToAction: e.target.value }))}
                      required
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    placeholder="Describe who this video is for (age, interests, demographics)"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="objectives">Campaign Objectives</Label>
                  <Textarea
                    id="objectives"
                    placeholder="What are your goals? (Increase sales, brand awareness, lead generation, etc.)"
                    value={formData.objectives}
                    onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any other details, special requests, or important information"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  Delivery Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Video Formats Needed</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: "instagram-story", label: "Instagram Stories (9:16)" },
                      { id: "instagram-feed", label: "Instagram Feed (1:1)" },
                      { id: "facebook-ad", label: "Facebook Ads (16:9)" },
                      { id: "youtube", label: "YouTube (16:9)" }
                    ].map((format, index) => (
                      <div key={format.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={format.id}
                          checked={formData.deliveryFormat.includes(format.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData(prev => ({ 
                                ...prev, 
                                deliveryFormat: [...prev.deliveryFormat, format.id] 
                              }));
                            } else {
                              setFormData(prev => ({ 
                                ...prev, 
                                deliveryFormat: prev.deliveryFormat.filter(f => f !== format.id) 
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={format.id} className="text-sm">
                          {format.label}
                          {index === 0 && formData.deliveryFormat.includes(format.id) && (
                            <span className="text-primary text-xs ml-1">(FREE)</span>
                          )}
                          {index > 0 && formData.deliveryFormat.includes(format.id) && (
                            <span className="text-muted-foreground text-xs ml-1">(+$15)</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pricing Calculator */}
                  {selectedFormats.length > 0 && (
                    <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                      <h4 className="font-medium mb-2">Pricing Summary:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Base Video (1 Credit):</span>
                          <span className="font-medium">Included</span>
                        </div>
                        {additionalFormats > 0 && (
                          <div className="flex justify-between">
                            <span>Additional Formats ({additionalFormats}x $15):</span>
                            <span className="font-medium">${addonCost}.00</span>
                          </div>
                        )}
                        {formData.urgentDelivery && (
                          <div className="flex justify-between">
                            <span>Urgent Delivery:</span>
                            <span className="font-medium">$50.00</span>
                          </div>
                        )}
                        <div className="border-t pt-1 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total Due Today:</span>
                            <span className="text-primary">${totalAddonCost}.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="urgent"
                    checked={formData.urgentDelivery}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, urgentDelivery: checked as boolean }))}
                  />
                  <Label htmlFor="urgent">
                    Urgent delivery (12 hours) - Additional $50
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit */}
          <div className="mt-8 text-center">
            <Button 
              type="submit" 
              variant="cta" 
              size="lg" 
              className="px-12" 
              disabled={isSubmitting || userCredits <= 0}
            >
              {isSubmitting ? "Processing..." : 
               totalAddonCost > 0 ? "Proceed to Payment for Add-ons" : 
               "Submit Project & Use 1 Credit"}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              {totalAddonCost > 0 ? 
                `You'll be redirected to payment for $${totalAddonCost} in add-ons` :
                "Our team will review your briefing and start production within 24 hours"
              }
            </p>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default BriefingForm;