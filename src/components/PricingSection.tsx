import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Preços Imbatíveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vídeos profissionais com qualidade de estúdio por uma fração do preço tradicional
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic */}
          <Card className="hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$79</span>
                <span className="text-muted-foreground">/vídeo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Template personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Locução profissional</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Até 30 segundos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Entrega em 48h</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Escolher Plano
              </Button>
            </CardContent>
          </Card>

          {/* Professional */}
          <Card className="hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="h-4 w-4" />
                Mais Popular
              </span>
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Profissional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$149</span>
                <span className="text-muted-foreground">/vídeo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Template personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Locução profissional</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Até 60 segundos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Entrega em 24h</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>2 revisões incluídas</span>
                </li>
              </ul>
              <Button variant="cta" className="w-full">
                Escolher Plano
              </Button>
            </CardContent>
          </Card>

          {/* Premium */}
          <Card className="hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$299</span>
                <span className="text-muted-foreground">/vídeo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Template personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Locução profissional</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Até 90 segundos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Entrega em 12h</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Revisões ilimitadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Escolher Plano
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-scale-in">
          <p className="text-lg text-muted-foreground mb-6">
            Todos os planos incluem locução profissional e qualidade de estúdio
          </p>
          <Button variant="hero" size="lg">
            Comece Seu Projeto Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;