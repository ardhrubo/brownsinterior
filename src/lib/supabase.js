import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const NOTIFICATION_EMAIL =
  import.meta.env.VITE_NOTIFICATION_EMAIL || 'brownsinterior.bd@gmail.com';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-supabase-anon')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'browns_interior_inquiries_v1';

/**
 * Send an instant email notification to the configured studio email address
 * whenever a client submits the inquiry/quote form.
 */
export async function sendEmailNotification(inquiry) {
  const targetEmail = NOTIFICATION_EMAIL;
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY || '';

  const subject = `New Project Inquiry: ${inquiry.service_category}${
    inquiry.sub_service ? ` (${inquiry.sub_service})` : ''
  } — ${inquiry.name}`;

  const payload = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    Client_Name: inquiry.name,
    Email: inquiry.email,
    Phone_WhatsApp: inquiry.phone,
    Service_Category: inquiry.service_category,
    Specialized_Service: inquiry.sub_service || 'General Category Inquiry',
    Project_Location: inquiry.location || 'Not specified',
    Approx_Area_SqFt: inquiry.area_sqft ? `${inquiry.area_sqft} sq ft` : 'Not specified',
    Estimated_Budget: inquiry.estimated_budget || 'Requested Custom Quote',
    Project_Details: inquiry.message,
    Submitted_At: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
  };

  try {
    if (web3FormsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject,
          from_name: "Brown's Interior Website",
          replyto: inquiry.email,
          ...payload,
        }),
      });
      return res.ok;
    }

    // Default: FormSubmit.co AJAX endpoint sends directly to NOTIFICATION_EMAIL
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch (err) {
    console.warn('Email notification warning:', err);
    return false;
  }
}

/**
 * Submit an inquiry:
 * 1. Inserts into Supabase `inquiries` table (if configured)
 * 2. Also stores a backup copy in localStorage for local testing
 * 3. Sends an email notification to `NOTIFICATION_EMAIL`
 */
export async function submitInquiry(formData) {
  const record = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    service_category: formData.service_category,
    sub_service: formData.sub_service || '',
    location: formData.location?.trim() || '',
    area_sqft: formData.area_sqft ? Number(formData.area_sqft) : null,
    estimated_budget: formData.estimated_budget || '',
    message: formData.message.trim(),
    status: 'new',
    source: formData.source || 'website_contact_form',
  };

  let dbRecord = null;
  let savedToSupabase = false;

  // 1. Send email notification in parallel
  const emailPromise = sendEmailNotification(record);

  // 2. Insert into Supabase if credentials are configured
  if (supabase) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ ...record }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error.message);
      throw new Error(error.message || 'Could not save inquiry to Supabase.');
    }
    dbRecord = data;
    savedToSupabase = true;
  }

  const emailSent = await emailPromise;

  // 3. If saved to Supabase and email succeeded, mark email_sent = true
  if (savedToSupabase && dbRecord?.id && emailSent) {
    await supabase
      .from('inquiries')
      .update({ email_sent: true })
      .eq('id', dbRecord.id);
  }

  // 4. Always save a local copy so local demo / offline testing works seamlessly
  const fallbackItem = dbRecord || {
    id: crypto.randomUUID ? crypto.randomUUID() : `inq-${Date.now()}`,
    ...record,
    email_sent: emailSent,
    created_at: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([fallbackItem, ...existing]));
  } catch {
    // ignore storage errors
  }

  return {
    record: fallbackItem,
    savedToSupabase,
    emailSent,
    recipientEmail: NOTIFICATION_EMAIL,
  };
}
