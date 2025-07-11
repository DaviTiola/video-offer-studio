import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PricingSection = () => {
  const [stripeLinks, setStripeLinks] = useState({
    single_video: "",
    video_5_package: "",
    video_10_package: ""
  });

  useEffect(() => {
    const loadStripeLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('setting_name, setting_value')
          .in('setting_name', ['stripe_single_video_link', 'stripe_5_video_package_link', 'stripe_10_video_package_link']);

        if (error) throw error;

        const linksObj = data.reduce((acc, setting) => {
          switch (setting.setting_name) {
            case 'stripe_single_video_link':
              acc.single_video = setting.setting_value || '';
              break;
            case 'stripe_5_video_package_link':
              acc.video_5_package = setting.setting_value || '';
              break;
            case 'stripe_10_video_package_link':
              acc.video_10_package = setting.setting_value || '';
              break;
          }
          return acc;
        }, { single_video: '', video_5_package: '', video_10_package: '' });

        setStripeLinks(linksObj);
      } catch (error) {
        console.error('Error loading Stripe links:', error);
      }
    };

    loadStripeLinks();
  }, []);

  const handlePurchase = (link: string) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('Payment link not configured. Please contact support.');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Unbeatable Prices
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional studio-quality videos for a fraction of traditional pricing
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Single Video */}
          <Card className="hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Single Video</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$79</span>
                <span className="text-muted-foreground">/video</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Professional voiceover</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>24-hour delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>2 revisions included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Custom template</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handlePurchase(stripeLinks.single_video)}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* 5 Video Package */}
          <Card className="hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="h-4 w-4" />
                Most Popular
              </span>
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">5 Video Package</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$69</span>
                <span className="text-muted-foreground">/each</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Professional voiceover</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>24-hour delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>3 revisions included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Custom templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Save $50 total</span>
                </li>
              </ul>
              <Button 
                variant="cta" 
                className="w-full"
                onClick={() => handlePurchase(stripeLinks.video_5_package)}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* 10 Video Package */}
          <Card className="hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">10 Video Package</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$59</span>
                <span className="text-muted-foreground">/each</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Professional voiceover</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>24-hour delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>3 revisions included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Save $200 total</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handlePurchase(stripeLinks.video_10_package)}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-scale-in">
          <p className="text-lg text-muted-foreground mb-6">
            All plans include professional voiceover and studio-quality production
          </p>
          <Button variant="hero" size="lg">
            Start Your Project Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;