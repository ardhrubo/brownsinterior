// Optional Supabase Edge Function for sending email notifications via Resend API
// Can be triggered by a Supabase Database Webhook on INSERT into `public.inquiries`

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") || "brownsinterior.bd@gmail.com";

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record || payload;

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5ded6; border-radius: 12px; overflow: hidden;">
        <div style="background: #221e1b; color: #c9b59c; padding: 24px;">
          <h2 style="margin: 0; color: #ffffff;">New Project Inquiry — Brown's Interior</h2>
          <p style="margin: 6px 0 0; font-size: 14px;">Submitted via ${record.source || "Website"}</p>
        </div>
        <div style="padding: 24px; background: #fdfbf9; color: #2c2623;">
          <p><strong>Client Name:</strong> ${record.name}</p>
          <p><strong>Phone / WhatsApp:</strong> ${record.phone}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Service Category:</strong> ${record.service_category}</p>
          ${record.sub_service ? `<p><strong>Specialized Service:</strong> ${record.sub_service}</p>` : ""}
          ${record.location ? `<p><strong>Project Location:</strong> ${record.location}</p>` : ""}
          ${record.area_sqft ? `<p><strong>Approx. Area:</strong> ${record.area_sqft} sq ft</p>` : ""}
          ${record.estimated_budget ? `<p><strong>Estimated Budget:</strong> ${record.estimated_budget}</p>` : ""}
          <hr style="border: none; border-top: 1px solid #e5ded6; margin: 16px 0;" />
          <p><strong>Project Details / Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f4efea; padding: 14px; border-radius: 8px;">${record.message}</p>
        </div>
      </div>
    `;

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ ok: true, info: "No RESEND_API_KEY set; client-side FormSubmit email already active." }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Brown's Interior <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        reply_to: record.email,
        subject: `New Inquiry: ${record.service_category} — ${record.name}`,
        html,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
