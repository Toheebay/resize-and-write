import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { checkGrammar } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const GrammarCheck = () => {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleGrammarCheck = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to check.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await checkGrammar(text);
      setCorrectedText(result.correctedText);
      setSuggestions(result.suggestions);
      toast({
        title: "Analysis Complete",
        description: `Found ${result.suggestions.length} suggestions for improvement.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check grammar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied",
      description: "Text copied to clipboard!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Grammar Checker</h1>
            <p className="text-xl text-muted-foreground">
              Check and correct grammar, spelling, and punctuation errors in your text
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Original Text</CardTitle>
                <CardDescription>
                  Enter the text you want to check for grammar errors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <Button 
                  onClick={handleGrammarCheck} 
                  disabled={isProcessing || !text.trim()}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Checking Grammar...
                    </>
                  ) : (
                    'Check Grammar'
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Corrected Text</CardTitle>
                <CardDescription>
                  Your corrected text with suggestions applied
                </CardDescription>
              </CardHeader>
              <CardContent>
                {correctedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={correctedText}
                      readOnly
                      className="min-h-[200px] resize-none"
                    />
                    <Button
                      onClick={() => copyToClipboard(correctedText)}
                      variant="outline"
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Corrected Text
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
                    Corrected text will appear here
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {suggestions.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Grammar Suggestions ({suggestions.length})
                </CardTitle>
                <CardDescription>
                  Review the suggested corrections below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{suggestion.type}</Badge>
                          <span className="text-sm font-medium">
                            "{suggestion.original}" → "{suggestion.suggestion}"
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Position: {suggestion.position}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GrammarCheck;