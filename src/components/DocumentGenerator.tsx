import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Upload, Download, Printer, FileText, Image } from "lucide-react";
import { toast } from "sonner";

const DocumentGenerator = () => {
  const [formData, setFormData] = useState({
    documentType: "",
    title: "",
    content: "",
    companyName: "",
    contactInfo: "",
    date: new Date().toISOString().split('T')[0],
    generatedContent: ""
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const documentTypes = [
    { value: "invoice", label: "Invoice" },
    { value: "letter", label: "Business Letter" },
    { value: "report", label: "Report" },
    { value: "proposal", label: "Proposal" },
    { value: "contract", label: "Contract" },
    { value: "certificate", label: "Certificate" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Logo file size must be less than 5MB");
        return;
      }
      setLogo(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Logo uploaded successfully!");
    }
  };

  const generateDocument = () => {
    if (!formData.documentType || !formData.title) {
      toast.error("Please fill in required fields");
      return;
    }

    // Generate actual document content
    const documentContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${formData.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { max-height: 80px; margin-bottom: 20px; }
        .company-info { margin-bottom: 20px; }
        .content { margin-top: 30px; }
        .footer { margin-top: 40px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        ${logoPreview ? `<img src="${logoPreview}" alt="Logo" class="logo">` : ''}
        <h1>${formData.title}</h1>
    </div>
    
    <div class="company-info">
        ${formData.companyName ? `<h2>${formData.companyName}</h2>` : ''}
        ${formData.contactInfo ? `<p>${formData.contactInfo.replace(/\n/g, '<br>')}</p>` : ''}
        <p><strong>Date:</strong> ${new Date(formData.date).toLocaleDateString()}</p>
    </div>
    
    <div class="content">
        <p>${formData.content.replace(/\n/g, '</p><p>')}</p>
    </div>
    
    <div class="footer">
        <p>Generated on ${new Date().toLocaleDateString()} - Document Type: ${formData.documentType}</p>
    </div>
</body>
</html>
    `;

    // Store generated content for download
    setFormData(prev => ({ ...prev, generatedContent: documentContent }));
    toast.success("Document generated successfully! Ready for download.");
  };

  const downloadDocument = () => {
    if (!formData.generatedContent) {
      toast.error("Please generate document first");
      return;
    }

    const blob = new Blob([formData.generatedContent], { type: 'text/html' });
    const fileName = `${formData.title.replace(/\s+/g, '_')}_${formData.documentType}.html`;
    
    // Using file-saver to trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Document downloaded successfully!");
  };

  const printDocument = () => {
    if (!formData.generatedContent) {
      toast.error("Please generate document first");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(formData.generatedContent);
      printWindow.document.close();
      printWindow.print();
      toast.success("Opening print dialog...");
    } else {
      toast.error("Please allow popups to print document");
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional Document
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Generator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create professional documents with custom branding, logos, and content. Perfect for invoices, letters, reports, and more.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Document Details</span>
                  </CardTitle>
                  <CardDescription>
                    Fill in the information below to generate your professional document
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Document Type */}
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type *</Label>
                    <Select value={formData.documentType} onValueChange={(value) => handleInputChange('documentType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Document Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter document title"
                    />
                  </div>

                  {/* Company Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company/Organization Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Contact Information</Label>
                    <Textarea
                      id="contactInfo"
                      value={formData.contactInfo}
                      onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                      placeholder="Email, phone, address..."
                      rows={3}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Document Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Enter the main content of your document..."
                      rows={8}
                    />
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <label htmlFor="logo" className="cursor-pointer">
                        {logoPreview ? (
                          <div className="space-y-4">
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="max-h-24 mx-auto rounded-lg shadow-card"
                            />
                            <p className="text-sm text-muted-foreground">
                              Click to change logo
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center">
                              <Image className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">Upload your logo</p>
                              <p className="text-sm text-muted-foreground">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview & Actions */}
            <div className="space-y-6">
              {/* Preview Card */}
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle>Document Preview</CardTitle>
                  <CardDescription>
                    Preview of your generated document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border min-h-64">
                    {formData.title ? (
                      <div className="space-y-4">
                        {logoPreview && (
                          <img 
                            src={logoPreview} 
                            alt="Logo" 
                            className="h-12 object-contain"
                          />
                        )}
                        <h3 className="text-xl font-bold text-gray-900">
                          {formData.title}
                        </h3>
                        {formData.companyName && (
                          <p className="text-gray-700 font-medium">
                            {formData.companyName}
                          </p>
                        )}
                        {formData.date && (
                          <p className="text-gray-600 text-sm">
                            Date: {new Date(formData.date).toLocaleDateString()}
                          </p>
                        )}
                        {formData.content && (
                          <div className="text-gray-700 text-sm leading-relaxed">
                            {formData.content.substring(0, 150)}
                            {formData.content.length > 150 && "..."}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        <FileText className="h-12 w-12 mx-auto mb-4" />
                        <p>Fill in the form to see preview</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={generateDocument}
                    variant="gradient" 
                    className="w-full"
                    size="lg"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Document
                  </Button>
                  <Button 
                    onClick={downloadDocument}
                    variant="default" 
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    onClick={printDocument}
                    variant="outline" 
                    className="w-full"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Document
                  </Button>
                </CardContent>
              </Card>

              {/* Template Options */}
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle>Template Styles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {["Modern", "Classic", "Minimal", "Corporate"].map((style) => (
                      <Button 
                        key={style}
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentGenerator;