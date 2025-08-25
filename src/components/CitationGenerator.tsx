import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, BookOpen, Plus, Trash2 } from 'lucide-react';
import { generateCitation } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const CitationGenerator = () => {
  const [sources, setSources] = useState<any[]>([]);
  const [currentSource, setCurrentSource] = useState({
    title: '',
    author: '',
    year: '',
    url: '',
    publisher: '',
    type: 'website'
  });
  const [citationFormat, setCitationFormat] = useState('apa');
  const [generatedCitations, setGeneratedCitations] = useState<string[]>([]);
  const { toast } = useToast();

  const addSource = () => {
    if (!currentSource.title || !currentSource.author) {
      toast({
        title: "Error",
        description: "Please fill in the title and author fields.",
        variant: "destructive",
      });
      return;
    }

    const newSource = { ...currentSource, id: Date.now() };
    setSources([...sources, newSource]);
    setCurrentSource({
      title: '',
      author: '',
      year: '',
      url: '',
      publisher: '',
      type: 'website'
    });
    
    toast({
      title: "Source Added",
      description: "Source has been added to your bibliography.",
    });
  };

  const removeSource = (id: number) => {
    setSources(sources.filter(source => source.id !== id));
    toast({
      title: "Source Removed",
      description: "Source has been removed from your bibliography.",
    });
  };

  const generateAllCitations = () => {
    if (sources.length === 0) {
      toast({
        title: "No Sources",
        description: "Please add at least one source to generate citations.",
        variant: "destructive",
      });
      return;
    }

    const citations = sources.map(source => generateCitation(source, citationFormat));
    setGeneratedCitations(citations);
    
    toast({
      title: "Citations Generated",
      description: `Generated ${citations.length} citations in ${citationFormat.toUpperCase()} format.`,
    });
  };

  const copyAllCitations = async () => {
    const citationsText = generatedCitations.join('\n\n');
    await navigator.clipboard.writeText(citationsText);
    toast({
      title: "Copied",
      description: "All citations copied to clipboard!",
    });
  };

  const copyCitation = async (citation: string) => {
    await navigator.clipboard.writeText(citation);
    toast({
      title: "Copied",
      description: "Citation copied to clipboard!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Citation Generator</h1>
            <p className="text-xl text-muted-foreground">
              Generate properly formatted citations in APA, MLA, and Chicago styles
            </p>
          </div>

          <Tabs defaultValue="add-source" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add-source">Add Sources</TabsTrigger>
              <TabsTrigger value="generate">Generate Citations</TabsTrigger>
            </TabsList>

            <TabsContent value="add-source" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Source</CardTitle>
                  <CardDescription>
                    Enter the details of your source to generate proper citations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="source-type">Source Type</Label>
                      <Select
                        value={currentSource.type}
                        onValueChange={(value) => setCurrentSource({...currentSource, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="book">Book</SelectItem>
                          <SelectItem value="journal">Journal Article</SelectItem>
                          <SelectItem value="newspaper">Newspaper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        placeholder="2024"
                        value={currentSource.year}
                        onChange={(e) => setCurrentSource({...currentSource, year: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter the title"
                      value={currentSource.title}
                      onChange={(e) => setCurrentSource({...currentSource, title: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      placeholder="Last, First"
                      value={currentSource.author}
                      onChange={(e) => setCurrentSource({...currentSource, author: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      placeholder="Enter publisher name"
                      value={currentSource.publisher}
                      onChange={(e) => setCurrentSource({...currentSource, publisher: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      value={currentSource.url}
                      onChange={(e) => setCurrentSource({...currentSource, url: e.target.value})}
                    />
                  </div>

                  <Button onClick={addSource} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Source
                  </Button>
                </CardContent>
              </Card>

              {sources.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Added Sources ({sources.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sources.map((source) => (
                        <div key={source.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{source.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {source.author} ({source.year}) - {source.type}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSource(source.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="generate" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Citations</CardTitle>
                  <CardDescription>
                    Choose your citation format and generate properly formatted citations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select value={citationFormat} onValueChange={setCitationFormat}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apa">APA Style</SelectItem>
                        <SelectItem value="mla">MLA Style</SelectItem>
                        <SelectItem value="chicago">Chicago Style</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={generateAllCitations} className="flex-1">
                      Generate Citations
                    </Button>
                  </div>

                  {generatedCitations.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Generated Citations ({citationFormat.toUpperCase()})</h4>
                        <Button variant="outline" onClick={copyAllCitations}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy All
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {generatedCitations.map((citation, index) => (
                          <div key={index} className="p-4 bg-muted rounded-lg">
                            <div className="flex justify-between items-start gap-4">
                              <p className="text-sm flex-1">{citation}</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyCitation(citation)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CitationGenerator;