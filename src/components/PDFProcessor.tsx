import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Minimize2, 
  Maximize2, 
  Download,
  X,
  CheckCircle 
} from "lucide-react";
import { toast } from "sonner";
import { compressPDF, enlargePDF, convertPDFToWord, validatePDFFile, formatFileSize } from "@/utils/pdfUtils";

interface PDFProcessorProps {
  tool: 'compress' | 'enlarge' | 'convert';
  title: string;
  description: string;
}

const PDFProcessor = ({ tool, title, description }: PDFProcessorProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetSize, setTargetSize] = useState('');
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
    if (!validatePDFFile(selectedFile)) {
      toast.error("Please select a valid PDF file");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
      toast.error("File size must be less than 50MB");
      return;
    }

    setFile(selectedFile);
    toast.success("PDF file loaded successfully!");
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

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please select a PDF file first");
      return;
    }

    if ((tool === 'compress' || tool === 'enlarge') && !targetSize) {
      toast.error("Please specify target size in KB");
      return;
    }

    setProcessing(true);
    const progressInterval = simulateProgress();

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time

      const targetSizeKB = targetSize ? parseInt(targetSize) : undefined;

      switch (tool) {
        case 'compress':
          await compressPDF(file, targetSizeKB);
          toast.success("PDF compressed successfully!");
          break;
        case 'enlarge':
          if (!targetSizeKB) {
            throw new Error("Target size is required");
          }
          await enlargePDF(file, targetSizeKB);
          toast.success("PDF enlarged successfully!");
          break;
        case 'convert':
          await convertPDFToWord(file);
          toast.success("PDF converted to Word successfully!");
          break;
      }

      setProgress(100);
    } catch (error: any) {
      toast.error(error.message || "Processing failed");
      console.error('Processing error:', error);
    } finally {
      clearInterval(progressInterval);
      setProcessing(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const getIcon = () => {
    switch (tool) {
      case 'compress': return Minimize2;
      case 'enlarge': return Maximize2;
      case 'convert': return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-elegant bg-gradient-card border-0">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center shadow-glow">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
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
              accept=".pdf"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
              id="pdf-upload"
            />
            
            {file ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-8 w-8" />
                  <span className="font-medium">File Selected</span>
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
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop your PDF here</p>
                <p className="text-muted-foreground">
                  or <span className="text-primary">click to browse</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Maximum file size: 50MB
                </p>
              </label>
            )}
          </div>

          {/* Size Input for Compress/Enlarge */}
          {(tool === 'compress' || tool === 'enlarge') && (
            <div className="space-y-2">
              <Label htmlFor="target-size">
                Target Size (KB) {tool === 'compress' ? '(smaller)' : '(larger)'}
              </Label>
              <Input
                id="target-size"
                type="number"
                placeholder={`Enter target size in KB`}
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
                min="1"
                max="10000"
              />
              <p className="text-xs text-muted-foreground">
                {tool === 'compress' 
                  ? 'Enter a size smaller than your current file' 
                  : 'Enter a size larger than your current file'
                }
                {file && ` (Current: ${Math.round(file.size / 1024)}KB)`}
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {processing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Process Button */}
          <Button
            onClick={handleProcess}
            disabled={!file || processing}
            variant="gradient"
            className="w-full"
            size="lg"
          >
            {processing ? (
              <>Processing...</>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                {tool === 'compress' && 'Compress & Download'}
                {tool === 'enlarge' && 'Enlarge & Download'}
                {tool === 'convert' && 'Convert & Download'}
              </>
            )}
          </Button>

          {/* Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Your files are processed locally and automatically deleted after download</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFProcessor;