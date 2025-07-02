import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { number: "500+", label: "Videos Produced" },
    { number: "24h", label: "Average Delivery" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Template Styles" }
  ];

  const team = [
    {
      name: "Alex Rodriguez",
      role: "Creative Director",
      description: "10+ years in video production and creative direction"
    },
    {
      name: "Sarah Johnson", 
      role: "Lead Editor",
      description: "Expert in motion graphics and professional video editing"
    },
    {
      name: "Mike Chen",
      role: "Technical Director", 
      description: "Specializes in automation and production optimization"
    }
  ];

  const values = [
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "We believe quality shouldn't take weeks. Our streamlined process delivers professional results in 24 hours."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every video is crafted with your marketing objectives in mind, designed to convert viewers into customers."
    },
    {
      icon: Award,
      title: "Studio Quality",
      description: "Professional-grade production values at a fraction of traditional studio costs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About Simple AV
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            We're revolutionizing video production by making professional-quality marketing videos accessible, affordable, and fast.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Traditional video production is slow, expensive, and complex. We created Simple AV to eliminate these barriers and democratize access to professional video marketing.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our streamlined system combines proven templates, expert production, and smart automation to deliver studio-quality videos in 24 hours - not 24 days.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-gradient-card border-0 hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="bg-gradient-card border-0 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-gradient-card border-0 hover:shadow-glow transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Transform Your Marketing?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of businesses who've accelerated their growth with our professional video production system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/briefing">
                  <Button variant="cta" size="lg">
                    Start Your Project
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;