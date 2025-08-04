import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Users, 
  CheckSquare, 
  TrendingUp, 
  Calculator, 
  MessageCircle, 
  UserCheck, 
  FileText, 
  GraduationCap,
  Puzzle,
  Briefcase,
  Settings,
  Target,
  DollarSign,
  HeadphonesIcon,
  Building
} from "lucide-react";

const SaaSServices = () => {
  const serviceCategories = [
    {
      title: "🧩 Business Essentials",
      icon: <Puzzle className="h-6 w-6" />,
      services: [
        "Google Workspace (Email, Drive, Docs, etc.)",
        "Microsoft 365",
        "Zoom Setup & Branding",
        "Slack Workspace Setup"
      ]
    },
    {
      title: "🛠️ Project & Task Management",
      icon: <CheckSquare className="h-6 w-6" />,
      services: [
        "Trello",
        "Asana",
        "ClickUp",
        "Monday.com",
        "Notion (Custom Workspaces)"
      ]
    },
    {
      title: "💼 CRM & Sales Tools",
      icon: <Briefcase className="h-6 w-6" />,
      services: [
        "Salesforce",
        "HubSpot",
        "Zoho CRM",
        "Pipedrive"
      ]
    },
    {
      title: "📣 Marketing Automation",
      icon: <TrendingUp className="h-6 w-6" />,
      services: [
        "Mailchimp",
        "ActiveCampaign",
        "Sendinblue",
        "ConvertKit"
      ]
    },
    {
      title: "🧾 Accounting & Finance",
      icon: <Calculator className="h-6 w-6" />,
      services: [
        "QuickBooks Online",
        "Xero",
        "FreshBooks",
        "Wave Accounting"
      ]
    },
    {
      title: "💬 Support & Help Desk",
      icon: <MessageCircle className="h-6 w-6" />,
      services: [
        "Zendesk",
        "Freshdesk",
        "Intercom",
        "Tawk.to"
      ]
    },
    {
      title: "👥 HR & Team Management",
      icon: <Users className="h-6 w-6" />,
      services: [
        "BambooHR",
        "Gusto (Payroll & Benefits)",
        "Deel (Remote Hiring)",
        "Rippling"
      ]
    },
    {
      title: "📝 Documents & Signing",
      icon: <FileText className="h-6 w-6" />,
      services: [
        "DocuSign",
        "PandaDoc",
        "Adobe Acrobat Sign",
        "Dropbox Sign"
      ]
    },
    {
      title: "💻 E-learning & Courses",
      icon: <GraduationCap className="h-6 w-6" />,
      services: [
        "Teachable",
        "Thinkific",
        "Kajabi",
        "Moodle Cloud"
      ]
    }
  ];

  const serviceOptions = [
    {
      title: "Request SaaS Setup or Customization",
      description: "Get your chosen SaaS platform configured and customized to match your organization's workflow and branding requirements.",
      icon: <Settings className="h-8 w-8" />,
      features: [
        "Initial setup and configuration",
        "Custom branding and design",
        "User role and permission setup",
        "Workflow optimization",
        "Training and documentation"
      ]
    },
    {
      title: "Get Integration Help",
      description: "Connect your existing tools and create seamless workflows between different platforms for maximum efficiency.",
      icon: <Target className="h-8 w-8" />,
      features: [
        "API integrations",
        "Data migration and sync",
        "Automation setup",
        "Cross-platform workflows",
        "Troubleshooting and optimization"
      ]
    },
    {
      title: "Bundle Multiple SaaS",
      description: "Create a comprehensive business solution by bundling multiple SaaS tools that work together perfectly.",
      icon: <Building className="h-8 w-8" />,
      features: [
        "Strategic tool selection",
        "Complete ecosystem setup",
        "Unified user experience",
        "Cost optimization",
        "Ongoing management and support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            SaaS Solutions & Integration Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your business with expert SaaS setup, customization, and integration services. 
            We help organizations leverage the power of modern software solutions.
          </p>
          <Button size="lg" variant="gradient" className="text-lg px-8 py-6">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            SaaS Platforms We Work With
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <Badge key={serviceIndex} variant="secondary" className="mr-2 mb-2">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Service Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We Can Help Your Organization
          </h2>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceOptions.map((option, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    {option.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
                  <CardDescription className="text-base">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your specific needs and create a customized SaaS solution 
            that drives your organization forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="gradient">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaaSServices;