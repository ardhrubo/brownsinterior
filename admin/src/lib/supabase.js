import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'browns2026';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-supabase-anon')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const DEMO_STORAGE_KEY = 'browns_admin_demo_inquiries_v1';

const defaultSeedInquiries = [
  {
    id: 'demo-1',
    name: 'Rafiqul Islam',
    email: 'rafiq.islam@example.com',
    phone: '+880 1711-234567',
    service_category: 'Interior Design',
    sub_service: 'Residential Interior Design',
    location: 'Gulshan-2, Dhaka',
    area_sqft: 2450,
    estimated_budget: '৳ 32,00,000 – ৳ 38,00,000',
    message:
      'We recently took handover of a 4-bedroom apartment in Gulshan-2. Looking for full turnkey interior design including living/dining, modular kitchen, and master wardrobes.',
    status: 'new',
    admin_notes: '',
    source: 'cost_calculator_quote',
    email_sent: true,
    created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
  },
  {
    id: 'demo-2',
    name: 'Nusrat Chowdhury',
    email: 'nusrat@auroraretail.com',
    phone: '+880 1819-876543',
    service_category: 'Exhibition & Trade Show Booth Design',
    sub_service: 'Custom Booth Design',
    location: 'ICCB Bashundhara, Dhaka',
    area_sqft: 600,
    estimated_budget: '৳ 8,50,000 – ৳ 10,00,000',
    message:
      'Need a 20ft x 30ft island pavilion booth for the upcoming trade expo at ICCB. Need 3D renders by next week and full fabrication.',
    status: 'contacted',
    admin_notes: 'Called client; meeting scheduled for Thursday 3 PM with Ahmed Jamil Rahul.',
    source: 'website_contact_form',
    email_sent: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'demo-3',
    name: 'Tariqul Hasan (NRB - UK)',
    email: 'tariq.uk@example.co.uk',
    phone: '+44 7700 900077',
    service_category: 'Additional Services',
    sub_service: 'Remote & International Design Services',
    location: 'Banani DOHS, Dhaka',
    area_sqft: 1950,
    estimated_budget: '৳ 24,00,000 – ৳ 28,00,000',
    message:
      'I live in London and want to renovate and furnish my family flat in Banani DOHS remotely. Available for a Zoom consultation after 4 PM Dhaka time.',
    status: 'quoted',
    admin_notes: 'Sent itemized BOQ and 3D concept proposal via email.',
    source: 'website_contact_form',
    email_sent: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
];

function getLocalDemoInquiries() {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(defaultSeedInquiries));
      return defaultSeedInquiries;
    }
    return JSON.parse(raw);
  } catch {
    return defaultSeedInquiries;
  }
}

function saveLocalDemoInquiries(list) {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function fetchInquiries() {
  if (supabase) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  return getLocalDemoInquiries();
}

export async function updateInquiryRecord(id, updates) {
  if (supabase) {
    const { data, error } = await supabase
      .from('inquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const list = getLocalDemoInquiries();
  const next = list.map((item) =>
    item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item
  );
  saveLocalDemoInquiries(next);
  return next.find((i) => i.id === id);
}

export async function deleteInquiryRecord(id) {
  if (supabase) {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  const list = getLocalDemoInquiries().filter((item) => item.id !== id);
  saveLocalDemoInquiries(list);
  return true;
}
