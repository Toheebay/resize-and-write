import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { splitPDF, validatePDFFile, formatFileSize } from '@/utils/pdfUtils';
import { Upload, Download, Scissors, FileText } from 'lucide-react';

const PDFSplitter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageRanges, setPageRanges] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!validatePDFFile(selectedFile)) {
        toast({
          title: "Invalid file",
          description: "Please select a valid PDF file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSplit = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (!pageRanges.trim()) {
      toast({
        title: "Error",
        description: "Please specify page ranges to extract",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await splitPDF(file, pageRanges);
      toast({
        title: "Success",
        description: "PDF split successfully",
      });
    } catch (error) {
      console.error('Error splitting PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to split PDF",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validatePDFFile(droppedFile)) {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file",
        description: "Please drop a valid PDF file",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Split PDF
          </h1>
          <p className="text-muted-foreground">
            Extract specific pages from your PDF document
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept=".pdf"
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
                  <p className="text-lg font-medium">Select PDF file</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to select a PDF file
                  </p>
                </div>
              </label>
            </div>

            {file && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="page-ranges">Page Ranges</Label>
                  <Input
                    id="page-ranges"
                    value={pageRanges}
                    onChange={(e) => setPageRanges(e.target.value)}
                    placeholder="e.g., 1-3,5,7-9"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Specify pages to extract (e.g., "1-3,5,7-9" for pages 1-3, page 5, and pages 7-9)
                  </p>
                </div>

                <Button
                  onClick={handleSplit}
                  disabled={isProcessing || !pageRanges.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    "Splitting..."
                  ) : (
                    <>
                      <Scissors className="mr-2 h-4 w-4" />
                      Split PDF
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">How to split PDFs</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Select or drag and drop a PDF file</p>
            <p>2. Specify which pages to extract using page ranges</p>
            <p>3. Use formats like "1-3" for consecutive pages or "1,3,5" for specific pages</p>
            <p>4. Click "Split PDF" to extract the specified pages</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Page Range Examples:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• "1-5" - Extract pages 1 through 5</li>
              <li>• "1,3,5" - Extract pages 1, 3, and 5</li>
              <li>• "1-3,7-9" - Extract pages 1-3 and 7-9</li>
              <li>• "2,4-6,10" - Extract page 2, pages 4-6, and page 10</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PDFSplitter;