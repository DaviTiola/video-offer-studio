const SocialProofSection = () => {
  const logos = [
    { name: "Liquid Death", src: "/api/placeholder/120/40" },
    { name: "Brooklinen", src: "/api/placeholder/120/40" },
    { name: "Athletic Greens", src: "/api/placeholder/120/40" }
  ];

  return (
    <section className="py-16 bg-background section-divider">
      <div className="container mx-auto px-6">
        <div className="text-center fade-in-up">
          <h2 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-12">
            Trusted by the Game-Changers
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 opacity-60">
            {logos.map((logo, index) => (
              <div 
                key={logo.name} 
                className="grayscale hover:grayscale-0 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;