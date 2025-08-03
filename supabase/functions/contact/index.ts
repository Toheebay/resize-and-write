import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactRequest = await req.json();

    // Send email to business owner
    const businessEmailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["adebayoajani23@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>This message was sent from your website contact form.</small></p>
      `,
    });

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Contact <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting us!",
      html: `
        <h1>Thank you for your message, ${name}!</h1>
        <p>We have received your inquiry about "${subject}" and will get back to you within 24 hours.</p>
        
        <h3>Your message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <p>If you have any urgent questions, please feel free to call us at <strong>+234 706 741 2852</strong>.</p>
        
        <p>Best regards,<br>
        The Development Team</p>
      `,
    });

    console.log("Emails sent successfully:", { businessEmailResponse, userEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Message sent successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);