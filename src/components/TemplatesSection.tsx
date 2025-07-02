import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Star } from "lucide-react";

interface VideoTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  duration: string;
  rating: number;
  code: string;
  businessType: string[];
}

const TemplatesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [templates, setTemplates] = useState<VideoTemplate[]>([]);
  
  // Carregar templates do localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem("videoTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      // Templates padrão se não houver salvos
      const defaultTemplates: VideoTemplate[] = [
        {
          id: "1",
          title: "Flash Sale Promo",
          category: "sales",
          description: "High-energy flash sale template with countdown timer and discount highlights",
          thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
          duration: "30s",
          rating: 4.8,
          code: "FLASH001",
          businessType: ["Retail", "Supermarket", "Electronics"]
        },
        {
          id: "2", 
          title: "Restaurant Special",
          category: "food",
          description: "Appetizing food showcase with elegant transitions and mouth-watering effects",
          thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
          duration: "45s",
          rating: 4.9,
          code: "FOOD002",
          businessType: ["Restaurant", "Cafe", "Food Delivery"]
        },
        {
          id: "3",
          title: "Service Spotlight",
          category: "services",
          description: "Professional service presentation with client testimonials and before/after",
          thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=600&h=400&fit=crop",
          duration: "60s", 
          rating: 4.7,
          code: "SERV003",
          businessType: ["Barber Shop", "Salon", "Clinic"]
        },
        {
          id: "4",
          title: "Product Launch",
          category: "product",
          description: "Dynamic product reveal with 3D effects and feature highlights",
          thumbnail: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=600&h=400&fit=crop",
          duration: "90s",
          rating: 4.6,
          code: "PROD004", 
          businessType: ["Retail", "Tech", "Fashion"]
        },
        {
          id: "5",
          title: "Seasonal Offers",
          category: "seasonal",
          description: "Holiday-themed template with festive animations and special pricing",
          thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&h=400&fit=crop",
          duration: "40s",
          rating: 4.5,
          code: "SEAS005",
          businessType: ["Retail", "Fashion", "Gifts"]
        },
        {
          id: "6",
          title: "Grand Opening", 
          category: "events",
          description: "Celebratory grand opening template with confetti and special promotions",
          thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=600&h=400&fit=crop",
          duration: "50s",
          rating: 4.8,
          code: "EVENT006",
          businessType: ["All Business Types"]
        }
      ];
      setTemplates(defaultTemplates);
      localStorage.setItem("videoTemplates", JSON.stringify(defaultTemplates));
    }
  }, []);

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "sales", name: "Sales & Promos" },
    { id: "food", name: "Food & Dining" },
    { id: "services", name: "Services" },
    { id: "product", name: "Products" },
    { id: "seasonal", name: "Seasonal" },
    { id: "events", name: "Events" }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template: VideoTemplate) => {
    console.log("Selected template:", template);
    // In real app, this would navigate to template customization or trigger a modal
  };

  return (
    <section id="templates" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Professional Video Templates
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our collection of studio-quality templates designed specifically for retail businesses
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-scale-in">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <Card 
              key={template.id} 
              className="group hover:shadow-glow transition-all duration-500 border-0 bg-gradient-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={template.thumbnail} 
                    alt={template.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      variant="hero" 
                      size="lg"
                      onClick={() => handleTemplateSelect(template)}
                      className="transform scale-90 group-hover:scale-100 transition-transform duration-300"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Preview
                    </Button>
                  </div>
                  
                  {/* Duration Badge */}
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                    {template.duration}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{template.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {template.description}
                  </p>

                  {/* Business Types */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.businessType.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-mono">
                      #{template.code}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="cta" 
                        size="sm"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        Choose
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-scale-in">
          <p className="text-lg text-muted-foreground mb-6">
            Can't find the perfect template? We create custom videos too!
          </p>
          <Button variant="hero">
            Request Custom Template
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;