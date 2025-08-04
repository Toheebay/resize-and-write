import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Globe, 
  Smartphone, 
  GraduationCap, 
  Wrench, 
  ClipboardList 
} from "lucide-react";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show modal on first visit
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const options = [
    {
      id: "website",
      title: "Design Website",
      description: "Get a custom website designed for your business",
      icon: Globe,
      action: () => {
        setIsOpen(false);
        // Scroll to services section
        setTimeout(() => {
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
    {
      id: "app",
      title: "Design App",
      description: "Create mobile or web applications",
      icon: Smartphone,
      action: () => {
        setIsOpen(false);
        navigate("/saas-services");
      }
    },
    {
      id: "scholarship",
      title: "Research on Scholarship",
      description: "Find scholarship opportunities and funding",
      icon: GraduationCap,
      action: () => {
        setIsOpen(false);
        // Scroll to blog section for research content
        setTimeout(() => {
          document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
    {
      id: "tools",
      title: "Using Tools",
      description: "Access PDF tools and utilities",
      icon: Wrench,
      action: () => {
        setIsOpen(false);
        // Scroll to tools section
        setTimeout(() => {
          document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
    {
      id: "survey",
      title: "Survey Around",
      description: "Explore and discover services",
      icon: ClipboardList,
      action: () => {
        setIsOpen(false);
        // Scroll to contact section for inquiries
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome! What would you like to do today?
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            Choose an option to get started with our services
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card 
                key={option.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30"
                onClick={option.action}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="px-8"
          >
            Skip for now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;