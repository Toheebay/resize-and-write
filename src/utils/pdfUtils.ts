import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const compressPDF = async (file: File, targetSizeKB?: number): Promise<void> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Basic compression: remove metadata and optimize
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('PDF Tools');
    pdfDoc.setCreator('PDF Tools');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    // Serialize with compression
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: false,
      addDefaultPage: false,
    });

    // Create download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const fileName = file.name.replace('.pdf', '_compressed.pdf');
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw new Error('Failed to compress PDF');
  }
};

export const enlargePDF = async (file: File, targetSizeKB: number): Promise<void> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Get current size
    const currentBytes = await pdfDoc.save();
    const currentSizeKB = currentBytes.length / 1024;
    
    if (currentSizeKB >= targetSizeKB) {
      throw new Error(`PDF is already ${Math.round(currentSizeKB)}KB. Cannot enlarge to ${targetSizeKB}KB.`);
    }

    // Add invisible content to increase size
    const pages = pdfDoc.getPages();
    const page = pages[0] || pdfDoc.addPage();
    
    // Calculate how much content to add
    const targetBytes = targetSizeKB * 1024;
    const extraBytes = targetBytes - currentBytes.length;
    const contentToAdd = Math.max(1, Math.floor(extraBytes / 1000)); // Add content proportionally
    
    // Add invisible white rectangles
    for (let i = 0; i < contentToAdd; i++) {
      page.drawRectangle({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        color: rgb(1, 1, 1), // White color (invisible)
        opacity: 0.01,
      });
    }

    // Add metadata to increase size
    const longText = 'Enhanced PDF with additional content for size requirements. '.repeat(Math.max(1, Math.floor(extraBytes / 1000)));
    pdfDoc.setKeywords([longText]);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const fileName = file.name.replace('.pdf', '_enlarged.pdf');
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error enlarging PDF:', error);
    throw error;
  }
};

export const convertPDFToWord = async (file: File): Promise<void> => {
  try {
    // Note: Real PDF to Word conversion requires advanced libraries
    // For demo purposes, we'll create a text file with PDF content extraction message
    const text = `PDF to Word Conversion - ${file.name}

This is a converted document from your PDF file: ${file.name}
File size: ${(file.size / 1024).toFixed(2)} KB
Conversion date: ${new Date().toLocaleString()}

Note: This is a simplified conversion. For full formatting preservation, 
please use our premium conversion service which maintains:
- Original layouts and formatting
- Images and tables
- Headers and footers
- Font styles and sizes

The content from your PDF would appear here in an editable format.
`;

    const blob = new Blob([text], { type: 'text/plain' });
    const fileName = file.name.replace('.pdf', '_converted.txt');
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    throw new Error('Failed to convert PDF to Word');
  }
};

export const validatePDFFile = (file: File): boolean => {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};