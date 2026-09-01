import { Resend } from "resend";

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  const receiveEmail = process.env.CONTACT_RECEIVE_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!receiveEmail) {
    console.error("CONTACT_RECEIVE_EMAIL is not set");
    return;
  }

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — skipping email notification");
    return;
  }

  // Lazy initialization — only create Resend client when actually needed
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: receiveEmail,
      subject: `New message from ${data.name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #6B5BFF; margin-bottom: 16px;">New Contact Message</h2>
          <div style="background: #f8f8fc; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          </div>
          <div style="background: #f8f8fc; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    // Don't throw — we still want to save the message to DB
  }
}
