import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'browns_lang_v1';

/**
 * Provides persistent EN / BN language state and helper flags across the app.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'bn' ? 'bn' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'bn' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isBn: lang === 'bn' }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Returns { lang, setLang, toggleLang, isBn } from LanguageProvider.
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return { lang: 'en', setLang: () => {}, toggleLang: () => {}, isBn: false };
  }
  return ctx;
}

export const statsBn = {
  'Projects Completed': 'সম্পন্ন প্রজেক্ট',
  'Years Experience': 'বছরের অভিজ্ঞতা',
  'Commercial Brands': 'কর্পোরেট ক্লায়েন্ট',
  'Client Satisfaction': 'ক্লায়েন্ট সন্তুষ্টি',
};

export const serviceCategoryBn = {
  'interior-design': {
    shortTitle: 'ইন্টেরিয়র ডিজাইন',
    title: 'ইন্টেরিয়র ডিজাইন',
    shortDesc: 'ফ্ল্যাট, ডুপ্লেক্স, অফিস ও শোরুমের কমপ্লিট ইন্টেরিয়র ডিজাইন ও সুন্দর ফিনিশিং।',
  },
  'architecture': {
    shortTitle: 'আর্কিটেকচার',
    title: 'আর্কিটেকচার ও বিল্ডিং ডিজাইন',
    shortDesc: 'বাড়ি ও কমার্শিয়াল ভবনের আধুনিক বিল্ডিং ডিজাইন, 2D ফ্লোর প্ল্যান ও 3D ভিউ।',
  },
  'engineering': {
    shortTitle: 'ইঞ্জিনিয়ারিং',
    title: 'ইঞ্জিনিয়ারিং ও স্ট্রাকচারাল',
    shortDesc: 'IEB নিবন্ধিত সিভিল ইঞ্জিনিয়ারদের তত্ত্বাবধানে নিরাপদ ও মজবুত স্ট্রাকচারাল ডিজাইন।',
  },
  'renovation-remodeling': {
    shortTitle: 'রেনোভেশন',
    title: 'রেনোভেশন ও রিমডেলিং',
    shortDesc: 'পুরনো ফ্ল্যাট, বাসা বা অফিস আধুনিক ও নতুন লুকে সাজিয়ে তোলা।',
  },
  'exhibition-booth-design': {
    shortTitle: 'এক্সিবিশন ও বুথ',
    title: 'এক্সিবিশন বুথ ও স্টল ডিজাইন',
    shortDesc: 'মেলা ও প্রদর্শনীর জন্য আকর্ষণীয় 3D এক্সিবিশন বুথ ডিজাইন ও দ্রুত সেটআপ।',
  },
  'project-management': {
    shortTitle: 'প্রজেক্ট ম্যানেজমেন্ট',
    title: 'প্রজেক্ট ম্যানেজমেন্ট',
    shortDesc: 'সাইট সুপারভিশন, বাজেট প্ল্যানিং (BOQ) ও ম্যাটেরিয়াল নির্বাচনে বিশেষজ্ঞ তদারকি।',
  },
  'additional-services': {
    shortTitle: 'বিশেষ সার্ভিস',
    title: 'অন্যান্য বিশেষ সার্ভিস',
    shortDesc: 'কাস্টম ফার্নিচার, 2D/3D ড্রয়িং, লাইটিং, সিলিং ও কমপ্লিট টার্নকি ইন্টেরিয়র সমাধান।',
  },
};

export const serviceOptionBn = {
  'residential-interior': 'বাসা ও ফ্ল্যাট ইন্টেরিয়র',
  'commercial-interior': 'কমার্শিয়াল ইন্টেরিয়র',
  'office-retail-interior': 'অফিস ও শোরুম ইন্টেরিয়র',
  'building-design-planning': 'বিল্ডিং ডিজাইন ও প্ল্যানিং',
  'floor-plans-elevations': 'ফ্লোর প্ল্যান ও এলিভেশন',
  'exterior-facade-design': 'এক্সটেরিয়র ও সামনের ডিজাইন',
  'architectural-drawings': 'আর্কিটেকচারাল ড্রয়িং',
  'structural-design-consultancy': 'স্ট্রাকচারাল ডিজাইন ও পরামর্শ',
  'structural-analysis': 'স্ট্রাকচারাল অ্যানালাইসিস',
  'technical-drawings': 'টেকনিক্যাল ড্রয়িং',
  'residential-renovation': 'বাসা ও ফ্ল্যাট রেনোভেশন',
  'commercial-renovation': 'অফিস ও শোরুম রেনোভেশন',
  'kitchen-bathroom-remodeling': 'কিচেন ও বাথরুম রিমডেলিং',
  'space-optimization': 'জায়গার সঠিক ব্যবহার ও লেআউট',
  'exhibition-booth-design-service': 'এক্সিবিশন বুথ ডিজাইন',
  'trade-show-stand-design': 'ট্রেড শো স্টল ডিজাইন',
  'custom-booth-design': 'কাস্টম বুথ ডিজাইন',
  '3d-booth-visualization': '3D বুথ ভিউ ও ডিজাইন',
  'booth-layout-technical-drawings': 'বুথ লেআউট ও টেকনিক্যাল ড্রয়িং',
  'site-supervision': 'সাইট সুপারভিশন ও তদারকি',
  'project-planning-coordination': 'প্রজেক্ট প্ল্যানিং ও সমন্বয়',
  'material-selection': 'ম্যাটেরিয়াল নির্বাচন',
  'cost-estimation-budget-planning': 'খরচ হিসাব ও বাজেট প্ল্যানিং (BOQ)',
  'custom-furniture-design': 'কাস্টম ফার্নিচার ডিজাইন',
  '2d-drawings-3d-visualization': '2D ড্রয়িং ও 3D ডিজাইন',
  'lighting-ceiling-design': 'লাইটিং ও সিলিং ডিজাইন',
  'electrical-plumbing-coordination': 'ইলেকট্রিক্যাল ও প্লাম্বিং কাজ',
  'turnkey-interior-solutions': 'কমপ্লিট টার্নকি ইন্টেরিয়র',
  'remote-international-design-services': 'অনলাইন ও প্রবাসী ডিজাইন সার্ভিস',
};

export const projectCategoryBn = {
  All: 'সব প্রজেক্ট',
  Residential: 'বাসা ও ফ্ল্যাট',
  Commercial: 'কমার্শিয়াল ও অফিস',
  Architectural: 'বিল্ডিং ডিজাইন',
  Booth: 'এক্সিবিশন বুথ',
};

export const processStepsBn = {
  '01': {
    phase: 'প্রাথমিক ধাপ',
    duration: '১ – ৩ দিন',
    title: 'সাইট ভিজিট ও আলোচনা',
    text: 'আমরা সরাসরি আপনার ফ্ল্যাট বা অফিস ভিজিট করি, মাপ নিই এবং আপনার পছন্দ ও বাজেট নিয়ে বিস্তারিত কথা বলি।',
  },
  '02': {
    phase: 'প্ল্যানিং',
    duration: '১ম – ২য় সপ্তাহ',
    title: '2D স্পেস লেআউট',
    text: 'ফার্নিচার কোথায় বসবে এবং প্রতিটি রুমের জায়গা কীভাবে সবচেয়ে ভালোভাবে ব্যবহার করা যাবে তার 2D লেআউট তৈরি করা হয়।',
  },
  '03': {
    phase: '3D ডিজাইন',
    duration: '২য় – ৩য় সপ্তাহ',
    title: '3D ভিজুয়ালাইজেশন',
    text: 'কাজ শুরুর আগেই পুরো বাসা বা অফিস কেমন দেখাবে তা পরিষ্কারভাবে দেখার জন্য বাস্তবসম্মত 3D ডিজাইন তৈরি করা হয়।',
  },
  '04': {
    phase: 'বাজেট',
    duration: '৩য় – ৪র্থ সপ্তাহ',
    title: 'ম্যাটেরিয়াল ও BOQ',
    text: 'বোর্ড, হার্ডওয়্যার ও রঙের স্যাম্পল দেখিয়ে স্পষ্ট ও লিখিত বাজেট (BOQ) চূড়ান্ত করা হয়।',
  },
  '05': {
    phase: 'বাস্তবায়ন',
    duration: '৪র্থ – ১০ম সপ্তাহ',
    title: 'টার্নকি কাজ',
    text: 'আমাদের নিজস্ব আর্কিটেক্ট, ইঞ্জিনিয়ার ও অভিজ্ঞ মিস্ত্রিদের সরাসরি তদারকিতে ফার্নিচার, সিলিং, লাইটিং ও রঙের কাজ সম্পন্ন হয়।',
  },
  '06': {
    phase: 'হ্যান্ডওভার',
    duration: 'চূড়ান্ত সপ্তাহ',
    title: 'প্রজেক্ট হস্তান্তর',
    text: 'সব কাজ ও ফিনিশিং ভালোভাবে চেক ও ক্লিনিং শেষে সময়মতো ১ বছরের সার্ভিস ওয়ারেন্টিসহ প্রজেক্ট বুঝিয়ে দেওয়া হয়।',
  },
};
