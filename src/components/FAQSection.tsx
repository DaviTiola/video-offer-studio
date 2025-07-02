import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      id: "item-1",
      question: "How quickly can you deliver a video?",
      answer: "Our standard delivery time is 24 hours from briefing completion. We also offer urgent delivery (12 hours) for an additional fee. Our streamlined process and template-based approach allow us to maintain high quality while meeting tight deadlines."
    },
    {
      id: "item-2",
      question: "What if I need revisions?",
      answer: "All packages include 2-3 rounds of revisions. We work closely with you to ensure the final video meets your exact specifications. Our goal is your complete satisfaction with the final product."
    },
    {
      id: "item-3",
      question: "What video formats do you provide?",
      answer: "We deliver videos optimized for all major platforms: Instagram Stories, Instagram Feed, Facebook Ads, YouTube, TikTok, LinkedIn, and more. Each video is formatted specifically for your target platform's requirements."
    },
    {
      id: "item-4",
      question: "Do you provide voiceover?",
      answer: "Yes! Professional voiceover is included in all packages. We work with experienced voice actors who can match your brand's tone and style. We also offer multiple voice options for you to choose from."
    },
    {
      id: "item-5",
      question: "Can you work with our existing brand guidelines?",
      answer: "Absolutely. We can customize any template to match your brand colors, fonts, and style guidelines. Simply provide us with your brand assets and guidelines during the briefing process."
    },
    {
      id: "item-6",
      question: "What makes your system scalable?",
      answer: "Our template-based approach combined with professional production standards allows us to create high-quality videos quickly and consistently. This means you can launch multiple campaigns without the traditional time and cost barriers."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our video production process
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="fade-in-up">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="glass border-0 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;