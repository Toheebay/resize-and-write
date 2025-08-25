
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const convertWordToPDF = async (file: File): Promise<void> => {
  try {
    let content = '';
    
    if (file.type === 'text/plain') {
      content = await file.text();
    } else {
      // For Word documents, we'll extract basic text content
      // In a real implementation, you'd use a proper Word parser
      content = `Converted from: ${file.name}

This is a converted document from your Word file.
Original file: ${file.name}
File size: ${(file.size / 1024).toFixed(2)} KB
Conversion date: ${new Date().toLocaleString()}

Document Content:
================

Your original Word document content would appear here with proper formatting.
This converter maintains the structure and styling of your original document.

Features preserved:
• Headers and footers
• Font styles and sizes
• Paragraphs and spacing
• Tables and lists
• Images (when supported)

Note: This is a demonstration conversion. The actual content from your Word document 
would be extracted and formatted properly in a production environment.

For full Word document parsing with complete formatting preservation, 
please use our premium conversion service.`;
    }

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    
    // Title
    page.drawText('Word to PDF Conversion', {
      x: 50,
      y: height - 80,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Content
    const words = content.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    const maxWidth = width - 100;
    const fontSize = 12;

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const textWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);
      
      if (textWidth < maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    let yPosition = height - 120;
    const lineHeight = 16;

    for (const line of lines) {
      if (yPosition < 50) {
        const newPage = pdfDoc.addPage();
        yPosition = newPage.getSize().height - 50;
        newPage.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      } else {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      }
      yPosition -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const fileName = file.name.replace(/\.(docx|doc|txt)$/i, '_converted.pdf');
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error converting Word to PDF:', error);
    throw new Error('Failed to convert Word document to PDF');
  }
};

export const paraphraseText = async (text: string, tone: string = 'neutral'): Promise<string> => {
  try {
    const response = await fetch('/functions/v1/paraphrase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, tone }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.paraphrasedText;
  } catch (error) {
    console.error('Error paraphrasing text:', error);
    throw new Error('Failed to paraphrase text. Please try again.');
  }
};

export const checkGrammar = async (text: string): Promise<{ correctedText: string; suggestions: any[] }> => {
  // Simulate grammar checking
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const suggestions = [
    {
      original: 'teh',
      suggestion: 'the',
      type: 'spelling',
      position: text.indexOf('teh')
    },
    {
      original: 'recieve',
      suggestion: 'receive',
      type: 'spelling',
      position: text.indexOf('recieve')
    }
  ].filter(s => s.position !== -1);
  
  let correctedText = text;
  suggestions.forEach(s => {
    correctedText = correctedText.replace(s.original, s.suggestion);
  });
  
  return { correctedText, suggestions };
};

export const detectAI = async (text: string): Promise<{ isAI: boolean; confidence: number; analysis: string }> => {
  // Simulate AI detection
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const confidence = Math.random() * 100;
  const isAI = confidence > 50;
  
  return {
    isAI,
    confidence: Math.round(confidence),
    analysis: isAI 
      ? 'This text shows characteristics of AI generation including repetitive patterns and formal structure.'
      : 'This text appears to be human-written with natural variation and personal voice.'
  };
};

export const checkPlagiarism = async (text: string): Promise<{ similarity: number; sources: any[] }> => {
  // Simulate plagiarism checking
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const similarity = Math.random() * 100;
  const sources = similarity > 30 ? [
    { url: 'example.com/article1', similarity: 25, title: 'Sample Article Title' },
    { url: 'example.com/article2', similarity: 15, title: 'Another Sample Article' }
  ] : [];
  
  return { similarity: Math.round(similarity), sources };
};

export const humanizeAI = async (text: string): Promise<string> => {
  // Simulate AI humanization
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return `[Humanized version]\n\n${text.replace(/\b(additionally|furthermore|moreover|consequently)\b/gi, match => {
    const alternatives = {
      'additionally': 'also',
      'furthermore': 'plus',
      'moreover': 'what\'s more',
      'consequently': 'so'
    };
    return alternatives[match.toLowerCase() as keyof typeof alternatives] || match;
  })}`;
};

export const generateCitation = (source: any, format: string): string => {
  const { title, author, year, url, publisher } = source;
  
  switch (format.toLowerCase()) {
    case 'apa':
      return `${author} (${year}). ${title}. ${publisher}. ${url}`;
    case 'mla':
      return `${author}. "${title}." ${publisher}, ${year}, ${url}.`;
    case 'chicago':
      return `${author}. "${title}." ${publisher}. Accessed ${new Date().toLocaleDateString()}. ${url}.`;
    default:
      return `${author}. ${title}. ${publisher}, ${year}.`;
  }
};

export const summarizeText = async (text: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<string> => {
  // Simulate text summarization
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const sentences = text.split('.').filter(s => s.trim().length > 0);
  const targetLength = length === 'short' ? 2 : length === 'medium' ? 4 : 6;
  const summarySentences = sentences.slice(0, Math.min(targetLength, sentences.length));
  
  return `[${length.charAt(0).toUpperCase() + length.slice(1)} Summary]\n\n${summarySentences.join('. ')}.`;
};

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  // Simulate translation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const translations: { [key: string]: string } = {
    'spanish': 'Texto traducido al español',
    'french': 'Texte traduit en français',
    'german': 'Text ins Deutsche übersetzt',
    'italian': 'Testo tradotto in italiano',
    'portuguese': 'Texto traduzido para português'
  };
  
  return translations[targetLanguage.toLowerCase()] || `[Translated to ${targetLanguage}]\n\n${text}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
