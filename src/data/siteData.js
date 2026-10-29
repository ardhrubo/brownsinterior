export const testimonials = [
  { name: 'Rafiq Ahmed', role: 'Apartment Owner, Gulshan', rating: 5, text: "Thoughtful planning, premium materials, and on-time delivery for our Gulshan home." },
  { name: 'Nusrat Jahan', role: 'Café Owner, Dhanmondi', rating: 5, text: 'They captured our brand perfectly—seating flow improved and guests love the ambiance.' },
  { name: 'Tanvir Hasan', role: 'Marketing Manager, Expo', rating: 5, text: 'Our exhibition booth matched the 3D render down to the last detail.' },
  { name: 'Shirin Akter', role: 'Homeowner, Bashundhara', rating: 5, text: 'Transparent costing and exceptional attention to detail throughout our renovation.' },
  { name: 'Mahmud Karim', role: 'Director, Corporate Office', rating: 5, text: 'From floor planning to turnkey execution, our office was delivered right on budget.' },
  { name: 'Farzana Rahman', role: 'Remote Client, UK', rating: 5, text: 'Designed my Dhaka apartment entirely remotely with clear drawings and regular updates.' },
];

export const processSteps = [
  {
    step: '01',
    phase: 'Discovery',
    duration: 'Days 1 – 3',
    title: 'Site Visit',
    text: 'Vision, budget & laser measurements.',
  },
  {
    step: '02',
    phase: 'Planning',
    duration: 'Week 1 – 2',
    title: 'Space Layout',
    text: '2D zoning & curated mood boards.',
  },
  {
    step: '03',
    phase: '3D Design',
    duration: 'Week 2 – 3',
    title: '3D Visualization',
    text: 'Photorealistic renders & CAD drawings.',
  },
  {
    step: '04',
    phase: 'Costing',
    duration: 'Week 3 – 4',
    title: 'Materials & BOQ',
    text: 'Material samples & itemized budget.',
  },
  {
    step: '05',
    phase: 'Execution',
    duration: 'Week 4 – 10',
    title: 'Turnkey Build',
    text: 'In-house fabrication & site supervision.',
  },
  {
    step: '06',
    phase: 'Delivery',
    duration: 'Final Week',
    title: 'Handover',
    text: 'Quality check & 1-year warranty.',
  },
];
export const blogPreviews = [
  {
    slug: 'small-apartment-design-tips',
    title: '7 Smart Design Tips for Small Apartments in Dhaka (800–1,500 Sq Ft)',
    category: 'Residential Interior',
    date: 'Oct 20, 2026',
    readTime: '9 min read',
    image: '/portfolio/residential/bedroom-dark-luxury-suite.webp',
    excerpt: 'Discover expert interior design strategies tailored for Dhaka’s 800 to 1,500 sq ft apartments. Learn how custom furniture, vertical storage, and strategic color balance create breathtaking, spacious sanctuaries.',
  },
  {
    slug: 'exhibition-stall-design-guide-bangladesh',
    title: 'Exhibition Stall & Pavilion Design Guide for Bangladesh Trade Fairs (ICCB & BICC)',
    category: 'Exhibition Design',
    date: 'Oct 14, 2026',
    readTime: '8 min read',
    image: '/portfolio/booth/booth-1.webp',
    excerpt: 'Planning a trade show booth at ICCB or BICC in Dhaka? Explore our engineering guide to modular stall fabrication, 360-degree brand visibility, VIP lounge zoning, and 24-hour setup execution.',
  },
  {
    slug: 'interior-design-cost-in-bangladesh-guide',
    title: 'Interior Design Cost in Bangladesh (2026 Per Sq Ft BOQ & Material Guide)',
    category: 'Budget & BOQ Guide',
    date: 'Oct 05, 2026',
    readTime: '10 min read',
    image: '/portfolio/residential/living-marble-luxury-hall.webp',
    excerpt: 'How much does interior design actually cost in Dhaka? Break down real per-square-foot pricing across Standard, Premium, and Luxury tiers—from HPL board and marine ply to Italian marble and smart lighting.',
  },
];

export const stats = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Commercial Brands' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Engr. Aslam Sheikh',
    role: 'Founder & Principal Designer',
    category: 'management',
    categoryLabel: 'Leadership',
    image: '/team/engr-aslam-sheikh.webp',
    qualifications: [
      'Dip. Architecture & Interior Design (NPI)',
      'B.Sc. in Civil Engg., IUBAT',
      'IEB Membership No: A29734',
    ],
    qualificationSummary: 'Dip. Architecture & Interior Design (NPI) · B.Sc. Civil Engg. (IUBAT) · IEB A29734',
    specialty: 'Interior Architecture & Structural Engineering',
    responsibilities: 'Interior Design, Structural Consultancy & Overall Business Management.',
    badgeIcon: 'Award',
  },
  {
    id: 2,
    name: 'Engr. Tanjimul Islam Fuad',
    role: 'Project Manager & Civil Engineer',
    category: 'management',
    categoryLabel: 'Project Management',
    image: '/team/engr-tanjimul-fuad.webp',
    qualifications: [
      'Project Coordination & Quality Control',
      'B.Sc. Engr. (Civil), IUBAT',
      'IEB Membership No: 29474',
    ],
    qualificationSummary: 'B.Sc. Engr. (Civil), IUBAT · IEB Membership No: 29474',
    specialty: 'Project Coordination & Quality Control',
    responsibilities: 'Project Coordination, Site Supervision & Engineering Quality Control.',
    badgeIcon: 'ClipboardCheck',
  },
  {
    id: 3,
    name: 'Abdur Rahman Dhrubo',
    role: 'IT and Office Administrator',
    category: 'management',
    categoryLabel: 'IT & Software Architecture',
    image: '/team/abdur-rahman-dhrubo.webp',
    qualifications: [
      'Full-Stack Engineer & Automation Specialist',
      'B.Sc., Jagannath University, Dhaka',
    ],
    qualificationSummary: 'Full-Stack Engineer · Jagannath University',
    website: 'https://ardhrubo.dev/',
    github: 'https://github.com/ardhrubo',
    specialty: 'Web Systems, Process Automation & Cloud Infrastructure',
    responsibilities: 'Full-Stack Web Engineering, Systems Automation & IT Operations Architecture.',
    badgeIcon: 'Laptop',
  },
  {
    id: 4,
    name: 'Md Mohammad Ali',
    role: '3D Visualizer',
    category: 'management',
    categoryLabel: '3D Visualization',
    specialty: 'Realistic 3D Modeling & Rendering',
    responsibilities: '3D Modeling, Realistic Rendering & Design Presentation.',
    badgeIcon: 'Layers',
  },
  {
    id: 5,
    name: 'Md Polash Hossain',
    role: 'Marketing Executive',
    category: 'management',
    categoryLabel: 'Client Relations',
    specialty: 'Business Promotion & Client Relations',
    responsibilities: 'Business Promotion, Lead Generation & Client Relations.',
    badgeIcon: 'TrendingUp',
  },
  {
    id: 6,
    name: 'Ashraful Islam',
    role: 'Architect & Site Supervisor',
    category: 'management',
    categoryLabel: 'Architecture & Supervision',
    specialty: 'Architectural Coordination & Site Supervision',
    responsibilities: 'Responsible for architectural coordination, site supervision, and ensuring work follows the approved design and project requirements.',
    badgeIcon: 'Compass',
  },
  {
    id: 7,
    name: 'Md Shahidul Islam',
    role: 'Head of Carpentry & Furniture',
    category: 'execution',
    categoryLabel: 'Woodwork & Cabinetry',
    specialty: 'Furniture Production & Cabinetry',
    responsibilities: 'Furniture Production, Cabinetry & Woodwork Execution.',
    badgeIcon: 'Hammer',
  },
  {
    id: 8,
    name: 'Md Mukter Hossain',
    role: 'Electrical Technician',
    category: 'execution',
    categoryLabel: 'Electrical & Lighting',
    specialty: 'Electrical Wiring & Lighting Setup',
    responsibilities: 'Electrical Wiring, Lighting & Installation.',
    badgeIcon: 'Zap',
  },
  {
    id: 9,
    name: 'Md Shabuj',
    role: 'Glass Work Specialist',
    category: 'execution',
    categoryLabel: 'Glass & Glazing',
    specialty: 'Glass Partitions & Mirrors',
    responsibilities: 'Glass Partitions, Mirrors & Installation.',
    badgeIcon: 'Layers3',
  },
  {
    id: 10,
    name: 'Johirul Islam',
    role: 'Painting & Finishing Specialist',
    category: 'execution',
    categoryLabel: 'Finishing & Polish',
    specialty: 'Interior Painting & Polishing Works',
    responsibilities: 'Interior Painting, Polishing & Finishing Works.',
    badgeIcon: 'Paintbrush',
  },
];

export const WHATSAPP_NUMBER = '8801768436319';
export const DEFAULT_WHATSAPP_MESSAGE = `Hello Brown’s Interiors,

I would like to schedule a consultation with Engr. Aslam Sheikh to discuss my interior design project. Kindly let me know a convenient time to discuss the project details and explore how your team can assist me.

Thank you. I look forward to hearing from you.`;

export const getWhatsAppUrl = (customMessage) => {
  const msg = customMessage || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
