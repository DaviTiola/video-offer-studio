import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";

const PortfolioSection = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Liquid Death - Chaos Campaign",
      description: "High-energy brand video showcasing the rebellious spirit of the water brand",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      device: "iphone",
      category: "Brand Video"
    },
    {
      id: 2,
      title: "Brooklinen - Product Showcase",
      description: "Elegant product demonstration highlighting premium bedding quality",
      thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      device: "macbook",
      category: "Product Demo"
    },
    {
      id: 3,
      title: "Athletic Greens - Health Focus",
      description: "Clean, professional video emphasizing wellness and nutrition benefits",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      device: "iphone",
      category: "Lifestyle"
    }
  ];

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="portfolio" className="py-20 bg-background section-divider">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Work in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how we've helped leading brands scale their video production and drive conversions
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group overflow-hidden border-0 bg-gradient-card hover:shadow-glow transition-all duration-500 tilt-3d"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                {/* Device Mockup */}
                <div className="relative">
                  {item.device === 'iphone' ? (
                    // iPhone Mockup
                    <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-[2.5rem] p-2 shadow-xl">
                      <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                        <img 
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button 
                            variant="hero"
                            size="sm"
                            onClick={() => openVideo(item.videoUrl)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Watch
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // MacBook Mockup
                    <div className="relative mx-auto w-80 h-48">
                      <div className="w-full h-40 bg-gray-800 rounded-t-lg p-2">
                        <div className="w-full h-full bg-black rounded-md overflow-hidden relative">
                          <img 
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button 
                              variant="hero"
                              size="sm"
                              onClick={() => openVideo(item.videoUrl)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Watch
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-8 bg-gray-300 rounded-b-lg relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => openVideo(item.videoUrl)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 fade-in-up">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to create videos that convert like these?
          </p>
          <Button variant="hero">
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;