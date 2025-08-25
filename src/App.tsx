
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SaaSServices from "./pages/SaaSServices";

import PDFProcessor from "./components/PDFProcessor";
import VoiceRecorder from "./components/VoiceRecorder";
import PDFMerger from "./components/PDFMerger";
import PDFSplitter from "./components/PDFSplitter";
import PDFSigner from "./components/PDFSigner";
import WordToPDFConverter from "./components/WordToPDFConverter";
import Paraphraser from "./components/Paraphraser";
import GrammarCheck from "./components/GrammarCheck";
import AIDetector from "./components/AIDetector";
import PlagiarismCheck from "./components/PlagiarismCheck";
import AIHumanizer from "./components/AIHumanizer";
import CitationGenerator from "./components/CitationGenerator";
import Summarizer from "./components/Summarizer";
import Translator from "./components/Translator";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
          <Route path="/" element={<Index />} />
          
          {/* PDF Tools */}
          <Route 
            path="/compress" 
            element={
              <PDFProcessor 
                tool="compress" 
                title="Compress PDF" 
                description="Reduce PDF file size while maintaining quality"
              />
            } 
          />
          <Route 
            path="/enlarge" 
            element={
              <PDFProcessor 
                tool="enlarge" 
                title="Enlarge PDF" 
                description="Increase PDF file size to meet requirements"
              />
            } 
          />
          <Route 
            path="/convert" 
            element={
              <PDFProcessor 
                tool="convert" 
                title="PDF to Word" 
                description="Convert PDF documents to editable Word files"
              />
            } 
          />
          <Route path="/word-to-pdf" element={<WordToPDFConverter />} />
          <Route path="/voice-notes" element={<VoiceRecorder />} />
          <Route path="/merge" element={<PDFMerger />} />
          <Route path="/split" element={<PDFSplitter />} />
          <Route path="/sign" element={<PDFSigner />} />
          
          {/* AI-Powered Text Tools */}
          <Route path="/paraphraser" element={<Paraphraser />} />
          <Route path="/grammar-check" element={<GrammarCheck />} />
          <Route path="/ai-detector" element={<AIDetector />} />
          <Route path="/plagiarism-check" element={<PlagiarismCheck />} />
          <Route path="/ai-humanizer" element={<AIHumanizer />} />
          <Route path="/citation-generator" element={<CitationGenerator />} />
          <Route path="/summarizer" element={<Summarizer />} />
          <Route path="/translator" element={<Translator />} />
          
          <Route path="/saas-services" element={<SaaSServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
