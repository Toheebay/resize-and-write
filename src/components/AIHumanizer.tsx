import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Copy, User, Bot } from 'lucide-react';
import { humanizeAI } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const AIHumanizer = () => {
  const [text, setText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleHumanize = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to humanize.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await humanizeAI(text);
      setHumanizedText(result);
      toast({
        title: "Success",
        description: "Text has been humanized successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to humanize text. Please try again.",
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
            <div className="flex items-center justify-center gap-4 mb-4">
              <Bot className="w-12 h-12 text-muted-foreground" />
              <div className="text-2xl">→</div>
              <User className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">AI Humanizer</h1>
            <p className="text-xl text-muted-foreground">
              Transform AI-generated text into natural, human-like content that bypasses AI detection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI-Generated Text
                </CardTitle>
                <CardDescription>
                  Paste your AI-generated text that needs to be humanized
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your AI-generated text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Characters: {text.length}</span>
                  <span>Words: {text.split(' ').filter(word => word.length > 0).length}</span>
                </div>
                <Button 
                  onClick={handleHumanize} 
                  disabled={isProcessing || !text.trim()}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Humanizing Text...
                    </>
                  ) : (
                    'Humanize Text'
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Humanized Text
                </CardTitle>
                <CardDescription>
                  Your text rewritten to sound more natural and human
                </CardDescription>
              </CardHeader>
              <CardContent>
                {humanizedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={humanizedText}
                      readOnly
                      className="min-h-[300px] resize-none"
                    />
                    <Button
                      onClick={() => copyToClipboard(humanizedText)}
                      variant="outline"
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Humanized Text
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Humanized text will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How AI Humanization Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">What it does:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Replaces formal AI language with natural expressions</li>
                    <li>• Varies sentence structure and length</li>
                    <li>• Adds human-like imperfections and conversational tone</li>
                    <li>• Reduces repetitive patterns common in AI text</li>
                    <li>• Maintains original meaning while improving readability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Best for:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Blog posts and articles</li>
                    <li>• Social media content</li>
                    <li>• Email marketing</li>
                    <li>• Product descriptions</li>
                    <li>• Creative writing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIHumanizer;