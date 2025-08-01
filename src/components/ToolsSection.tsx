import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Minimize2, 
  Maximize2, 
  FileEdit, 
  Upload, 
  Download,
  Zap,
  Shield,
  Mic,
  Merge,
  Scissors,
  PenTool
} from "lucide-react";

const ToolsSection = () => {
  const tools = [
    {
      icon: FileText,
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word files instantly with perfect formatting preservation.",
      features: ["Maintains original layout", "Preserves images & tables", "Batch conversion support"],
      color: "from-blue-500 to-cyan-500",
      path: "/convert"
    },
    {
      icon: Minimize2,
      title: "Compress PDF",
      description: "Reduce PDF file size while maintaining quality. Choose your target size in KB.",
      features: ["Custom size selection", "Quality optimization", "Bulk compression"],
      color: "from-green-500 to-emerald-500",
      path: "/compress"
    },
    {
      icon: Maximize2,
      title: "Enlarge PDF",
      description: "Increase PDF file size to meet specific requirements without quality loss.",
      features: ["Size requirements met", "Quality enhancement", "Professional output"],
      color: "from-purple-500 to-violet-500",
      path: "/enlarge"
    },
    {
      icon: Mic,
      title: "Voice to PDF",
      description: "Record voice notes and convert them to professional PDF documents instantly.",
      features: ["Voice transcription", "Auto formatting", "Instant download"],
      color: "from-pink-500 to-rose-500",
      path: "/voice-notes"
    },
    {
      icon: Merge,
      title: "Merge PDFs",
      description: "Combine multiple PDF files into a single document with custom ordering.",
      features: ["Multiple file support", "Custom ordering", "Batch processing"],
      color: "from-indigo-500 to-blue-500",
      path: "/merge"
    },
    {
      icon: Scissors,
      title: "Split PDF",
      description: "Extract specific pages from PDF documents with flexible page ranges.",
      features: ["Page range selection", "Multiple extracts", "Fast processing"],
      color: "from-yellow-500 to-orange-500",
      path: "/split"
    },
    {
      icon: PenTool,
      title: "e-Signature",
      description: "Add digital signatures to PDF documents with professional positioning.",
      features: ["Digital signing", "Custom positioning", "Legal compliance"],
      color: "from-teal-500 to-cyan-500",
      path: "/sign"
    }
  ];

  return (
    <section id="tools" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful PDF Tools at Your
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Fingertips</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to work with PDF documents. Fast, secure, and professional results every time.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tools.map((tool, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card border-0"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.color} mx-auto mb-4 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{tool.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={tool.path}>
                  <Button 
                    variant="gradient" 
                    className="w-full group-hover:shadow-glow"
                  >
                    Try Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="bg-gradient-card rounded-2xl p-8 border border-border shadow-card">
          <h3 className="text-2xl font-bold text-center mb-8">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload",
                description: "Drag & drop or select your PDF files"
              },
              {
                icon: Zap,
                title: "Process",
                description: "Choose your tool and configure settings"
              },
              {
                icon: Download,
                title: "Download",
                description: "Get your processed files instantly"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-hero mx-auto mb-4 flex items-center justify-center shadow-glow">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Your files are automatically deleted after 1 hour</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;