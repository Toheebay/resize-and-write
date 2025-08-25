import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Copy, Languages, ArrowRightLeft } from 'lucide-react';
import { translateText } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const Translator = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('spanish');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'auto', name: 'Auto-detect' },
    { code: 'english', name: 'English' },
    { code: 'spanish', name: 'Spanish' },
    { code: 'french', name: 'French' },
    { code: 'german', name: 'German' },
    { code: 'italian', name: 'Italian' },
    { code: 'portuguese', name: 'Portuguese' },
    { code: 'chinese', name: 'Chinese' },
    { code: 'japanese', name: 'Japanese' },
    { code: 'korean', name: 'Korean' },
    { code: 'arabic', name: 'Arabic' },
    { code: 'russian', name: 'Russian' },
    { code: 'hindi', name: 'Hindi' }
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to translate.",
        variant: "destructive",
      });
      return;
    }

    if (sourceLang === targetLang && sourceLang !== 'auto') {
      toast({
        title: "Error",
        description: "Source and target languages cannot be the same.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await translateText(sourceText, targetLang);
      setTranslatedText(result);
      toast({
        title: "Translation Complete",
        description: `Text translated to ${languages.find(l => l.code === targetLang)?.name}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to translate text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const swapLanguages = () => {
    if (sourceLang === 'auto') return;
    
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    
    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const copyToClipboard = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied",
      description: "Text copied to clipboard!",
    });
  };

  const getLanguageName = (code: string) => {
    return languages.find(l => l.code === code)?.name || code;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Languages className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Language Translator</h1>
            <p className="text-xl text-muted-foreground">
              Translate text between multiple languages with high accuracy
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Translation Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapLanguages}
                  disabled={sourceLang === 'auto'}
                  className="mt-6"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>

                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.filter(lang => lang.code !== 'auto').map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Source Text
                  <Badge variant="secondary">{getLanguageName(sourceLang)}</Badge>
                </CardTitle>
                <CardDescription>
                  Enter the text you want to translate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Characters: {sourceText.length}</span>
                  <span>Words: {sourceText.split(' ').filter(word => word.length > 0).length}</span>
                </div>
                <Button 
                  onClick={handleTranslate} 
                  disabled={isProcessing || !sourceText.trim()}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Languages className="w-4 h-4 mr-2" />
                      Translate Text
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Translated Text
                  <Badge variant="secondary">{getLanguageName(targetLang)}</Badge>
                </CardTitle>
                <CardDescription>
                  Your translated text will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {translatedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={translatedText}
                      readOnly
                      className="min-h-[300px] resize-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(translatedText)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Translation
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Languages className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Your translation will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Translation Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Supported Languages:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 13+ major languages</li>
                    <li>• Auto-detection</li>
                    <li>• Bidirectional translation</li>
                    <li>• Context-aware results</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Best For:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Documents and articles</li>
                    <li>• Emails and messages</li>
                    <li>• Website content</li>
                    <li>• Academic papers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Features:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Instant translation</li>
                    <li>• Character count</li>
                    <li>• Language swapping</li>
                    <li>• Copy to clipboard</li>
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

export default Translator;