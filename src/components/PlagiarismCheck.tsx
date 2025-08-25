import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, AlertTriangle, ExternalLink } from 'lucide-react';
import { checkPlagiarism } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const PlagiarismCheck = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePlagiarismCheck = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to check for plagiarism.",
        variant: "destructive",
      });
      return;
    }

    if (text.length < 100) {
      toast({
        title: "Text Too Short",
        description: "Please enter at least 100 characters for accurate plagiarism detection.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await checkPlagiarism(text);
      setResults(result);
      toast({
        title: "Scan Complete",
        description: `Plagiarism check completed. ${result.sources.length} potential sources found.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check for plagiarism. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity > 70) return 'text-red-500';
    if (similarity > 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getSimilarityLabel = (similarity: number) => {
    if (similarity > 70) return 'High Risk';
    if (similarity > 40) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Plagiarism Checker</h1>
            <p className="text-xl text-muted-foreground">
              Check your text for potential plagiarism against millions of web sources
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Text to Check</CardTitle>
                <CardDescription>
                  Enter at least 100 characters for accurate plagiarism detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste the text you want to check for plagiarism here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Characters: {text.length}</span>
                  <span>Words: {text.split(' ').filter(word => word.length > 0).length}</span>
                </div>
                <Button 
                  onClick={handlePlagiarismCheck} 
                  disabled={isProcessing || text.length < 100}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning for Plagiarism...
                    </>
                  ) : (
                    'Check for Plagiarism'
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plagiarism Results</CardTitle>
                <CardDescription>
                  Similarity score and potential source matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <Shield className={`w-12 h-12 ${getSimilarityColor(results.similarity)}`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {results.similarity}% Similar
                      </h3>
                      <Badge 
                        variant={results.similarity > 40 ? 'destructive' : 'secondary'}
                        className="text-lg px-4 py-2"
                      >
                        {getSimilarityLabel(results.similarity)}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Similarity Level:</span>
                        <span className={`font-bold ${getSimilarityColor(results.similarity)}`}>
                          {getSimilarityLabel(results.similarity)}
                        </span>
                      </div>
                      <Progress value={results.similarity} className="h-3" />
                    </div>

                    {results.sources.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Potential Sources Found:</h4>
                        {results.sources.map((source: any, index: number) => (
                          <Card key={index} className="border-l-4 border-l-orange-500">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h5 className="font-semibold mb-1">{source.title}</h5>
                                  <p className="text-sm text-muted-foreground mb-2">{source.url}</p>
                                  <Badge variant="outline">{source.similarity}% match</Badge>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(source.url, '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
                      <strong>Note:</strong> This tool checks for potential plagiarism by comparing your text against 
                      web sources. Results are estimates and may include false positives. Always verify sources manually.
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Plagiarism results will appear here</p>
                    </div>
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

export default PlagiarismCheck;