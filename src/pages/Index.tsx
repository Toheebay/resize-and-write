import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ToolsSection from "@/components/ToolsSection";
import DocumentGenerator from "@/components/DocumentGenerator";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";
import WelcomeModal from "@/components/WelcomeModal";

const Index = () => {
  return (
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
  );
};

export default Index;
