import { FileText, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Tools",
      links: [
        { name: "PDF to Word", href: "#" },
        { name: "Compress PDF", href: "#" },
        { name: "Enlarge PDF", href: "#" },
        { name: "Generate Documents", href: "#" },
        { name: "All Tools", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "Status", href: "#" },
        { name: "Privacy Policy", href: "#" }
      ]
    }
  ];

  const contactInfo = [
    { icon: Mail, text: "adebayoajani23@gmail.com" },
    { icon: Phone, text: "+234 802 476 4090" },
    { icon: MapPin, text: "Lagos, Nigeria" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-hero rounded-lg shadow-glow">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                PDFMaster
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The most powerful and user-friendly PDF processing platform. 
              Convert, compress, enlarge, and generate professional documents with ease.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-muted-foreground">
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 PDFMaster. All rights reserved.</span>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            <div className="text-sm text-muted-foreground font-medium">🔒 SSL Encrypted</div>
            <div className="text-sm text-muted-foreground font-medium">🛡️ GDPR Compliant</div>
            <div className="text-sm text-muted-foreground font-medium">⚡ 99.9% Uptime</div>
            <div className="text-sm text-muted-foreground font-medium">🌍 Available Worldwide</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;