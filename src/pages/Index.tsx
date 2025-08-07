import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ToolsSection from "@/components/ToolsSection";
import DocumentGenerator from "@/components/DocumentGenerator";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";
import WelcomeModal from "@/components/WelcomeModal";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <WelcomeModal />
        <Header />
        <HeroSection />
        
        {/* Header Ad */}
        <div className="container mx-auto px-4 py-4">
          <AdSense 
            adSlot="1234567890" 
            className="text-center"
            adFormat="auto"
          />
        </div>
        
        <ServicesSection />
        <ToolsSection />
        <DocumentGenerator />
        <AboutSection />
        <BlogSection />
        
        {/* Middle Ad */}
        <div className="container mx-auto px-4 py-4">
          <AdSense 
            adSlot="2345678901" 
            className="text-center"
            adFormat="auto"
          />
        </div>
        
        <ContactSection />
        <PricingSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
