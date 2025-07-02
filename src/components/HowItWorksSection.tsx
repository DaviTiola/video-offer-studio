import { Clock, FileText, Play, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Smart Briefing",
      subtitle: "10 Minutes",
      description: "Fill out our online form with your offers, prices, texts, and campaign objectives. Our form is designed to quickly and accurately extract all the information our team needs.",
      icon: FileText,
      time: "10 min"
    },
    {
      number: "02", 
      title: "Style Selection",
      subtitle: "5 Minutes",
      description: "Access our template gallery and choose the video style that best matches your brand and campaign tone. Start from a tested, high-performance visual model.",
      icon: Play,
      time: "5 min"
    },
    {
      number: "03",
      title: "Magic Production",
      subtitle: "Up to 24 Hours",
      description: "Our production team handles everything: professional editing, text and price animation, soundtrack selection, and high-resolution finishing. Ready for Instagram, Facebook, or WhatsApp.",
      icon: CheckCircle,
      time: "24h"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How Simple AV Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From briefing to video in 24 hours. Our system eliminates complexity, cost, and delays in video production.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                    {step.number}
                  </div>
                  
                  {/* Icon and Time */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {step.time}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-scale-in">
          <p className="text-lg text-muted-foreground mb-6">
            Launch high-impact campaigns in 3 simple steps
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;