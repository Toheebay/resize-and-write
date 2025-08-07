import { Card } from "@/components/ui/card";
import { Monitor, Smartphone, Share2, Palette } from "lucide-react";

const AboutSection = () => {
  const services = [
    {
      icon: Monitor,
      title: "Website Design & Development",
      description: "Custom, responsive websites that reflect your brand and convert visitors to clients."
    },
    {
      icon: Smartphone,
      title: "Mobile App Development", 
      description: "Functional and user-friendly apps for Android and iOS to bring your ideas to life."
    },
    {
      icon: Share2,
      title: "Facebook & Social Media Management",
      description: "Boost your online presence, engage your audience, and grow your business."
    },
    {
      icon: Palette,
      title: "Graphics & Branding",
      description: "Logos, flyers, and visuals that communicate your identity clearly."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            About Toheebay Web Services
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            At Toheebay Web Services, we specialize in delivering smart, affordable, and results-driven 
            digital solutions for individuals, startups, and businesses. With a passion for innovation 
            and a deep understanding of digital trends, we provide:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-hero rounded-full shadow-glow">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-subtle rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our goal is simple: <strong className="text-foreground">Help you succeed online.</strong> Whether you're 
              starting from scratch or need a revamp, we're ready to bring your vision to reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;