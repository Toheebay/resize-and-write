import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Database, 
  Code, 
  Palette,
  ArrowRight,
  CheckCircle 
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Website Design & Development",
      description: "Custom, responsive websites that convert visitors into customers",
      features: [
        "Modern, mobile-first design",
        "SEO optimized",
        "Content Management System",
        "E-commerce integration"
      ],
      price: "Starting from $999"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: [
        "React Native development",
        "UI/UX design",
        "App Store deployment",
        "Backend integration"
      ],
      price: "Starting from $2999"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete online store setup with payment processing and inventory management",
      features: [
        "Shopify & WooCommerce",
        "Payment gateway setup",
        "Inventory management",
        "Order tracking system"
      ],
      price: "Starting from $1499"
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Robust server-side solutions and API development",
      features: [
        "RESTful API development",
        "Database design",
        "Cloud deployment",
        "Authentication systems"
      ],
      price: "Starting from $1299"
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Tailored software solutions for your specific business needs",
      features: [
        "Business process automation",
        "Integration solutions",
        "Legacy system modernization",
        "Performance optimization"
      ],
      price: "Custom pricing"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design that enhances user experience and engagement",
      features: [
        "User research & testing",
        "Wireframing & prototyping",
        "Brand identity design",
        "Design system creation"
      ],
      price: "Starting from $799"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to deployment, we provide comprehensive digital solutions 
            that drive your business forward
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{service.price}</span>
                  <Button variant="outline" size="sm" className="group/btn">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your requirements and create a solution that perfectly fits your business needs.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started Today
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;