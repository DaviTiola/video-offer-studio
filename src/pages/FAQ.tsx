import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the Simple AV process work?",
      answer: "Our process is simple: 1) Fill out our briefing form with your campaign details (10 minutes), 2) Choose a template style from our gallery (5 minutes), 3) Our team produces your professional video and delivers it within 24 hours. You'll receive an email with the download link when it's ready."
    },
    {
      question: "What's included in each package?",
      answer: "All packages include professional voiceover, custom template adaptation, 24-hour delivery, and multiple format exports. Single videos include 2 revisions, while 5 and 10 video packages include 3 revisions. The 10-video package also includes priority support."
    },
    {
      question: "How quickly can you deliver my video?",
      answer: "Standard delivery is within 24 hours. If you need it faster, we offer urgent delivery in 12 hours for an additional $50. We start working on your project as soon as we receive your completed briefing."
    },
    {
      question: "What video formats do you provide?",
      answer: "We deliver your video in all the formats you need: Instagram Stories (9:16), Instagram Feed (1:1), Facebook Ads (16:9), YouTube (16:9), and any other custom dimensions you require. All formats are included at no extra cost."
    },
    {
      question: "Can I request revisions?",
      answer: "Absolutely! Single video packages include 2 revisions, while multi-video packages (5 and 10 videos) include 3 revisions. We want you to be completely satisfied with the final result."
    },
    {
      question: "Do you provide the voiceover?",
      answer: "Yes! Professional voiceover is included in all packages. Our experienced voice actors will bring your script to life with the tone and style that matches your brand and campaign objectives."
    },
    {
      question: "What if I don't have a script?",
      answer: "No problem! Our team can help create compelling copy based on the information you provide in the briefing form. We'll craft a script that effectively communicates your offer and drives action."
    },
    {
      question: "Can I use my own branding/colors?",
      answer: "Yes! While we start with proven templates, we customize colors, fonts, and branding elements to match your brand identity. Just include your brand guidelines or preferences in the briefing form."
    },
    {
      question: "What types of businesses do you work with?",
      answer: "We work with all types of businesses: e-commerce stores, service providers, restaurants, real estate, fitness, beauty, tech startups, and more. Our templates are designed to work across industries."
    },
    {
      question: "How do multi-video packages work?",
      answer: "Multi-video packages are perfect for ongoing campaigns. You can submit briefings for different videos over time, or create multiple versions of the same campaign. The pricing applies to each video in the package, and you get bulk savings."
    },
    {
      question: "What if I'm not satisfied with the result?",
      answer: "Your satisfaction is guaranteed. If you're not happy with the video after revisions, we'll work with you to make it right or provide a full refund. We stand behind our work 100%."
    },
    {
      question: "Do you offer custom video lengths?",
      answer: "Our templates are optimized for social media (typically 15-60 seconds), which performs best on most platforms. If you need a longer video, contact us to discuss custom pricing and timeline."
    },
    {
      question: "Can I see examples of your work?",
      answer: "Yes! Check out our template gallery on the homepage to see examples of different styles and approaches. Each template shows the type of professional quality you can expect."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Choose your package, then fill out our briefing form with your campaign details. Select a template style, and our team will handle the rest. You'll have your professional video within 24 hours."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Payment is processed securely, and you'll receive a receipt immediately after purchase."
    }
  ];

  const categories = [
    { name: "Process & Timeline", items: faqs.slice(0, 3) },
    { name: "Package Details", items: faqs.slice(3, 7) },
    { name: "Customization", items: faqs.slice(7, 10) },
    { name: "Getting Started", items: faqs.slice(10) }
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
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about our video production process, packages, and services.
            </p>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
                {category.name}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.items.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${categoryIndex}-${index}`} className="border-0">
                    <Card className="bg-gradient-card border-0 hover:shadow-glow transition-all duration-300">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <span className="text-left font-medium text-foreground">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <section className="text-center mt-16">
          <Card className="bg-gradient-card border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our team is here to help you get started with your video project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="cta">
                    Contact Support
                  </Button>
                </Link>
                <Link to="/briefing">
                  <Button variant="outline">
                    Start Your Project
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

export default FAQ;