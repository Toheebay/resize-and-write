import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { createPDFFromText } from '@/utils/pdfUtils';
import { Mic, MicOff, Download, Loader2 } from 'lucide-react';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [title, setTitle] = useState('Voice Notes');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Failed to access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      let binary = '';
      const chunkSize = 0x8000;
      
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }
      
      const base64Audio = btoa(binary);

      // Send to Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('voice-to-text', {
        body: { audio: base64Audio }
      });

      if (error) {
        throw error;
      }

      setTranscription(data.text);
      toast({
        title: "Transcription complete",
        description: "Your voice has been converted to text",
      });
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Error",
        description: "Failed to process audio recording",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePDF = async () => {
    if (!transcription.trim()) {
      toast({
        title: "Error",
        description: "No transcription available to convert to PDF",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPDFFromText(transcription, title);
      toast({
        title: "PDF created",
        description: "Your voice notes have been saved as a PDF",
      });
    } catch (error) {
      console.error('Error creating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to create PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Voice to PDF Notes
          </h1>
          <p className="text-muted-foreground">
            Record your voice and convert it to a PDF document
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
              />
            </div>

            <div className="flex justify-center">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                size="lg"
                className={`w-32 h-32 rounded-full transition-all ${
                  isRecording
                    ? 'bg-destructive hover:bg-destructive/90 animate-pulse'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isProcessing ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : isRecording ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isProcessing
                  ? 'Processing audio...'
                  : isRecording
                  ? 'Recording... Click to stop'
                  : 'Click to start recording'}
              </p>
            </div>

            {transcription && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="transcription">Transcription</Label>
                  <Textarea
                    id="transcription"
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                    rows={10}
                    placeholder="Your transcribed text will appear here..."
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={generatePDF}
                  className="w-full"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download as PDF
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">How it works</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Click the microphone button to start recording</p>
            <p>2. Speak clearly into your microphone</p>
            <p>3. Click again to stop recording</p>
            <p>4. Edit the transcription if needed</p>
            <p>5. Download your notes as a PDF</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VoiceRecorder;