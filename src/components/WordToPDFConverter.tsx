
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileEdit, 
  Download,
  X,
  CheckCircle 
} from "lucide-react";
import { toast } from "sonner";
import { convertWordToPDF, formatFileSize } from "@/utils/documentUtils";

const WordToPDFConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.toLowerCase().endsWith('.docx') && !selectedFile.name.toLowerCase().endsWith('.doc')) {
      toast.error("Please select a valid Word document (.docx, .doc) or text file");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
      toast.error("File size must be less than 100MB");
      return;
    }

    setFile(selectedFile);
    toast.success("Document loaded successfully!");
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please select a Word document first");
      return;
    }

    setProcessing(true);
    const progressInterval = simulateProgress();

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      await convertWordToPDF(file);
      setProgress(100);
      toast.success("Word document converted to PDF successfully!");
    } catch (error: any) {
      toast.error(error.message || "Conversion failed");
      console.error('Conversion error:', error);
    } finally {
      clearInterval(progressInterval);
      setProcessing(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elegant bg-gradient-card border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 mx-auto mb-4 flex items-center justify-center shadow-glow">
                <FileEdit className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Word to PDF Converter</CardTitle>
              <CardDescription className="text-lg">
                Convert Word documents to professional PDF files with optimal compression and quality
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary hover:bg-primary/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".docx,.doc,.txt"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                  id="word-upload"
                />
                
                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="h-8 w-8" />
                      <span className="font-medium">Document Selected</span>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-left">{file.name}</p>
                          <p className="text-sm text-muted-foreground text-left">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFile(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="word-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your Word document here</p>
                    <p className="text-muted-foreground">
                      or <span className="text-primary">click to browse</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports .docx, .doc, and .txt files • Maximum: 100MB
                    </p>
                  </label>
                )}
              </div>

              {/* Progress Bar */}
              {processing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Converting to PDF...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {/* Convert Button */}
              <Button
                onClick={handleConvert}
                disabled={!file || processing}
                variant="gradient"
                className="w-full"
                size="lg"
              >
                {processing ? (
                  <>Converting...</>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Convert to PDF & Download
                  </>
                )}
              </Button>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Perfect Formatting</h4>
                  <p className="text-sm text-muted-foreground">Maintains original layout and styling</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <FileEdit className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">High Quality</h4>
                  <p className="text-sm text-muted-foreground">Professional PDF output</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <Download className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-medium">Instant Download</h4>
                  <p className="text-sm text-muted-foreground">Ready in seconds</p>
                </div>
              </div>

              {/* Info */}
              <div className="text-center text-sm text-muted-foreground">
                <p>Your documents are processed securely and automatically deleted after conversion</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WordToPDFConverter;
