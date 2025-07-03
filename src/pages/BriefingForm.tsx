import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const BriefingForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    
    try {
      // Create project in database
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          project_name: formData.projectName,
          template_id: formData.selectedTemplate,
          offers_and_prices: `${formData.mainOffer}\n\nPrices: ${formData.prices}\n\nCall to Action: ${formData.callToAction}`,
          observations: `Target Audience: ${formData.targetAudience}\n\nObjectives: ${formData.objectives}\n\nTone: ${formData.tone}\n\nAdditional Info: ${formData.additionalInfo}\n\nDelivery Formats: ${formData.deliveryFormat.join(', ')}\n\nUrgent Delivery: ${formData.urgentDelivery ? 'Yes' : 'No'}`
        })
        .select()
        .single();

      if (error) throw error;

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

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
        </div>

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
                    ].map((format) => (
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
                        <Label htmlFor={format.id} className="text-sm">{format.label}</Label>
                      </div>
                    ))}
                  </div>
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
            <Button type="submit" variant="cta" size="lg" className="px-12" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Briefing"}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Our team will review your briefing and start production within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BriefingForm;