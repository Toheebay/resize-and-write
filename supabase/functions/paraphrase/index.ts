import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, tone } = await req.json();

    if (!text?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const toneInstructions = {
      neutral: "Rewrite the following text while maintaining the same meaning but using different words and sentence structures. Keep a neutral tone.",
      formal: "Rewrite the following text in a formal, professional tone while maintaining the same meaning. Use sophisticated vocabulary and sentence structures.",
      casual: "Rewrite the following text in a casual, conversational tone while maintaining the same meaning. Use everyday language and relaxed phrasing.",
      academic: "Rewrite the following text in an academic tone while maintaining the same meaning. Use scholarly language, proper citations format, and formal structure.",
      creative: "Rewrite the following text in a creative, engaging tone while maintaining the same meaning. Use vivid language, varied sentence structures, and interesting word choices."
    };

    const instruction = toneInstructions[tone as keyof typeof toneInstructions] || toneInstructions.neutral;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert paraphrasing assistant. Your task is to rewrite text while preserving the original meaning completely. Always maintain factual accuracy and the core message. ${instruction}`
          },
          {
            role: 'user',
            content: text
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to paraphrase text' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const paraphrasedText = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ paraphrasedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in paraphrase function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});