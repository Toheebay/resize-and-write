import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { addSignatureToPDF, validatePDFFile, formatFileSize } from '@/utils/pdfUtils';
import SignaturePad from './SignaturePad';
import { Upload, Download, PenTool, FileText } from 'lucide-react';

const PDFSigner = () => {
  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 50 });
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

  const handleSignatureCreate = (dataUrl: string) => {
    setSignature(dataUrl);
    toast({
      title: "Signature saved",
      description: "Your signature is ready to be added to the PDF",
    });
  };

  const handleSignatureClear = () => {
    setSignature(null);
  };

  const handleSignPDF = async () => {
    if (!file || !signature) {
      toast({
        title: "Error",
        description: "Please select a PDF file and create a signature",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await addSignatureToPDF(file, signature, signaturePosition.x, signaturePosition.y);
      toast({
        title: "Success",
        description: "PDF signed successfully",
      });
    } catch (error) {
      console.error('Error signing PDF:', error);
      toast({
        title: "Error",
        description: "Failed to sign PDF",
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
            e-Signature
          </h1>
          <p className="text-muted-foreground">
            Add your digital signature to PDF documents
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
                    Drag and drop or click to select a PDF file to sign
                  </p>
                </div>
              </label>
            </div>

            {file && (
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <FileText className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <SignaturePad
          onSignatureCreate={handleSignatureCreate}
          onClear={handleSignatureClear}
        />

        {signature && (
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Signature Preview</h3>
              <div className="border rounded-lg p-4 bg-white">
                <img
                  src={signature}
                  alt="Signature preview"
                  className="max-w-full h-auto"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">X Position</label>
                  <input
                    type="number"
                    value={signaturePosition.x}
                    onChange={(e) => setSignaturePosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                    max="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Y Position</label>
                  <input
                    type="number"
                    value={signaturePosition.y}
                    onChange={(e) => setSignaturePosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                    max="700"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {file && signature && (
          <Button
            onClick={handleSignPDF}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              "Signing..."
            ) : (
              <>
                <PenTool className="mr-2 h-4 w-4" />
                Sign PDF
              </>
            )}
          </Button>
        )}

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">How to sign PDFs</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Upload the PDF document you want to sign</p>
            <p>2. Create your signature using the signature pad</p>
            <p>3. Adjust the signature position using X and Y coordinates</p>
            <p>4. Click "Sign PDF" to add your signature to the document</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PDFSigner;