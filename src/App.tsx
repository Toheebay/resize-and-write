import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./components/Auth";
import PDFProcessor from "./components/PDFProcessor";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
