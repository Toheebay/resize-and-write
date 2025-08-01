import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { mergePDFs, validatePDFFile, formatFileSize } from '@/utils/pdfUtils';
import { Upload, Download, X, FileText } from 'lucide-react';

const PDFMerger = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      if (!validatePDFFile(file)) {
        toast({
          title: "Invalid file",
          description: `${file.name} is not a valid PDF file`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Error",
        description: "Please select at least 2 PDF files to merge",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await mergePDFs(files);
      toast({
        title: "Success",
        description: "PDFs merged successfully",
      });
    } catch (error) {
      console.error('Error merging PDFs:', error);
      toast({
        title: "Error",
        description: "Failed to merge PDFs",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === files.length - 1)
    ) {
      return;
    }

    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setFiles(newFiles);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Merge PDFs
          </h1>
          <p className="text-muted-foreground">
            Combine multiple PDF files into a single document
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Select PDF files</p>
                  <p className="text-sm text-muted-foreground">
                    Choose multiple PDF files to merge
                  </p>
                </div>
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Selected Files ({files.length})</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveFile(index, 'up')}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveFile(index, 'down')}
                          disabled={index === files.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleMerge}
                  disabled={isProcessing || files.length < 2}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    "Merging..."
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Merge PDFs
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">How to merge PDFs</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Click "Select PDF files" to choose multiple PDF documents</p>
            <p>2. Use the ↑ and ↓ buttons to reorder files as needed</p>
            <p>3. Remove unwanted files using the X button</p>
            <p>4. Click "Merge PDFs" to combine them into one document</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PDFMerger;