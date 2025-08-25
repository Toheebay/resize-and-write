import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, FileText } from 'lucide-react';
import { paraphraseText } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const Paraphraser = () => {
  const [text, setText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [tone, setTone] = useState('neutral');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleParaphrase = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to paraphrase.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await paraphraseText(text, tone);
      setParaphrasedText(result);
      toast({
        title: "Success",
        description: "Text paraphrased successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to paraphrase text. Please try again.",
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
            <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">AI Paraphraser</h1>
            <p className="text-xl text-muted-foreground">
              Rewrite your text with different tones and styles while maintaining the original meaning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Original Text</CardTitle>
                <CardDescription>
                  Enter the text you want to paraphrase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleParaphrase} 
                    disabled={isProcessing || !text.trim()}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Paraphrasing...
                      </>
                    ) : (
                      'Paraphrase Text'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paraphrased Text</CardTitle>
                <CardDescription>
                  Your rewritten text will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paraphrasedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={paraphrasedText}
                      readOnly
                      className="min-h-[200px] resize-none"
                    />
                    <Button
                      onClick={() => copyToClipboard(paraphrasedText)}
                      variant="outline"
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
                    Paraphrased text will appear here
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Paraphraser;