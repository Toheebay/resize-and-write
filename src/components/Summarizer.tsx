import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Loader2, Copy, FileText, Zap } from 'lucide-react';
import { summarizeText } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to summarize.",
        variant: "destructive",
      });
      return;
    }

    if (text.length < 200) {
      toast({
        title: "Text Too Short",
        description: "Please enter at least 200 characters for meaningful summarization.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await summarizeText(text, length);
      setSummary(result);
      toast({
        title: "Summary Generated",
        description: `Created a ${length} summary of your text.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to summarize text. Please try again.",
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
      description: "Summary copied to clipboard!",
    });
  };

  const getWordCount = (text: string) => {
    return text.split(' ').filter(word => word.length > 0).length;
  };

  const getCompressionRatio = () => {
    if (!text || !summary) return 0;
    const originalWords = getWordCount(text);
    const summaryWords = getWordCount(summary);
    return Math.round(((originalWords - summaryWords) / originalWords) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Zap className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Text Summarizer</h1>
            <p className="text-xl text-muted-foreground">
              Generate concise summaries of long texts while preserving key information
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Original Text</CardTitle>
                <CardDescription>
                  Enter the text you want to summarize (minimum 200 characters)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your long text here to generate a summary..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Characters: {text.length}</span>
                  <span>Words: {getWordCount(text)}</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Summary Length</label>
                    <Select value={length} onValueChange={(value: 'short' | 'medium' | 'long') => setLength(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (2-3 sentences)</SelectItem>
                        <SelectItem value="medium">Medium (4-5 sentences)</SelectItem>
                        <SelectItem value="long">Long (6+ sentences)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleSummarize} 
                    disabled={isProcessing || text.length < 200}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Summary...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Summary
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>
                  Your condensed text summary will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {summary ? (
                  <div className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      <Badge variant="secondary">
                        {getWordCount(summary)} words
                      </Badge>
                      <Badge variant="outline">
                        {getCompressionRatio()}% shorter
                      </Badge>
                    </div>
                    
                    <Textarea
                      value={summary}
                      readOnly
                      className="min-h-[200px] resize-none"
                    />
                    
                    <Button
                      onClick={() => copyToClipboard(summary)}
                      variant="outline"
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Summary
                    </Button>

                    <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
                      <strong>Summary Statistics:</strong>
                      <div className="mt-2 space-y-1">
                        <div>Original: {getWordCount(text)} words</div>
                        <div>Summary: {getWordCount(summary)} words</div>
                        <div>Compression: {getCompressionRatio()}% reduction</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Your summary will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How Text Summarization Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Preserves main ideas and key points</li>
                    <li>• Maintains logical flow and coherence</li>
                    <li>• Removes redundant information</li>
                    <li>• Adjustable summary length</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Best For:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Research papers and articles</li>
                    <li>• Long documents and reports</li>
                    <li>• News articles and blogs</li>
                    <li>• Academic content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Use Cases:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Executive summaries</li>
                    <li>• Abstract generation</li>
                    <li>• Content briefings</li>
                    <li>• Study notes</li>
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

export default Summarizer;