import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ToolsSection from "@/components/ToolsSection";
import DocumentGenerator from "@/components/DocumentGenerator";
import BlogSection from "@/components/BlogSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
      
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
