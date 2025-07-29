import { Button } from "@/components/ui/button";
import { FileText, Zap, Shield, Download } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const features = [
    {
      icon: FileText,
      text: "Convert PDF to Word"
    },
    {
      icon: Zap,
      text: "Lightning Fast"
    },
    {
      icon: Shield,
      text: "100% Secure"
    },
    {
      icon: Download,
      text: "Free Downloads"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="PDF Processing Hero" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              PDF Documents
            </span>
            in Seconds
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Convert, compress, enlarge, and generate professional documents with our advanced PDF processing tools. No registration required.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white border border-white/20"
              >
                <feature.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button 
                variant="hero" 
                size="xl"
                className="bg-white text-primary hover:bg-white/90 shadow-glow"
              >
                Start Processing PDFs
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-blue-200 text-sm mb-4">Trusted by 50,000+ users worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-white font-semibold">4.9/5 ★★★★★</div>
              <div className="text-white">•</div>
              <div className="text-white font-semibold">1M+ Documents Processed</div>
              <div className="text-white">•</div>
              <div className="text-white font-semibold">100% Secure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>
  );
};

export default HeroSection;