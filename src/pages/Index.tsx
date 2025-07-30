import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ToolsSection from "@/components/ToolsSection";
import DocumentGenerator from "@/components/DocumentGenerator";
import BlogSection from "@/components/BlogSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ToolsSection />
      <DocumentGenerator />
      <BlogSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
