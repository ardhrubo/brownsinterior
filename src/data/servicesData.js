import { Sofa, Building2, HardHat, Hammer, Presentation, ClipboardList, Sparkles } from 'lucide-react';

const img = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const servicesData = [
  {
    slug: 'interior-design',
    number: '01',
    title: 'Interior Design',
    shortTitle: 'Interior Design',
    tagline: 'Bespoke living & commercial spaces crafted for everyday luxury.',
    icon: Sofa,
    image: img('photo-1618221195710-dd6b41faaea6'),
    description: 'Thoughtfully crafted interiors balancing comfort, material warmth, and function.',
    intro: 'We plan every room around how you live and work — combining spatial flow, custom woodwork, and layered lighting.',
    options: [
      {
        slug: 'residential-interior',
        title: 'Residential Interior',
        tagline: 'Warm, functional homes tailored to your family lifestyle.',
        image: img('photo-1600210492486-724fe5c67fb0', 1400),
        desc: 'Turnkey design and execution for apartments, duplexes, and villas in Dhaka.',
        specs: [
          { label: 'Best For', value: 'Apartments, Duplexes & Villas' },
          { label: 'Timeline', value: '45 – 90 Days' },
          { label: 'Delivery', value: '3D + Full Turnkey' }
        ],
        highlights: ['Living & Dining', 'Master Suites', 'Custom Woodwork', 'Mood Lighting'],
        features: [
          'Full space planning & furniture zoning',
          'Bespoke wall paneling & false ceilings',
          'Living, dining & family lounge styling',
          'Curated lighting, fabrics & finishes'
        ],
        gallery: [
          img('photo-1600210492486-724fe5c67fb0', 1200),
          img('photo-1618221195710-dd6b41faaea6', 1000),
          img('photo-1600566753190-17f0baa2a6c3', 1000)
        ]
      },
      {
        slug: 'commercial-office-interior',
        title: 'Commercial & Office Interior',
        tagline: 'High-performance workplaces built around your brand.',
        image: img('photo-1497366216548-37526070297c', 1400),
        desc: 'Modern offices designed for productivity, acoustics, and executive presence.',
        specs: [
          { label: 'Best For', value: 'Corporate HQ & Tech Studios' },
          { label: 'Timeline', value: '30 – 75 Days' },
          { label: 'Delivery', value: 'MEP + Turnkey Fit-out' }
        ],
        highlights: ['Executive Suites', 'Open Workstations', 'Acoustic Pods', 'Reception Lounge'],
        features: [
          'Executive suites & boardroom acoustics',
          'Ergonomic workstation & agile layouts',
          'Brand-led reception & waiting lounges',
          'IT, server room & MEP integration'
        ],
        gallery: [
          img('photo-1497366216548-37526070297c', 1200),
          img('photo-1524758631624-e2822e304c36', 1000),
          img('photo-1486406146926-c627a92ad1ab', 1000)
        ]
      },
      {
        slug: 'restaurant-salon-retail-interior',
        title: 'Restaurant, Salon & Retail Interior',
        tagline: 'Instagram-worthy commercial spaces that attract footfall.',
        image: img('photo-1555396273-367ea4eb4db5', 1400),
        desc: 'Customer-centric hospitality and retail interiors designed for memorable experiences.',
        specs: [
          { label: 'Best For', value: 'Cafés, Boutiques & Salons' },
          { label: 'Timeline', value: '30 – 60 Days' },
          { label: 'Delivery', value: 'Concept to Launch' }
        ],
        highlights: ['Dining Ambiance', 'Display Fixtures', 'Salon Stations', 'Statement Lighting'],
        features: [
          'Atmospheric lighting & acoustic comfort',
          'Custom retail displays & POS counters',
          'Ergonomic salon stations & wash zones',
          'High-traffic commercial-grade finishes'
        ],
        gallery: [
          img('photo-1555396273-367ea4eb4db5', 1200),
          img('photo-1554118811-1e0d58224f24', 1000),
          img('photo-1559925393-8be0ec4767c8', 1000)
        ]
      },
      {
        slug: 'kitchen-bedroom-design',
        title: 'Kitchen & Bedroom Design',
        tagline: 'Sleek modular kitchens and serene bedroom sanctuaries.',
        image: img('photo-1556909114-f6e7ad7d3136', 1400),
        desc: 'Precision-engineered modular kitchens and custom walk-in wardrobe suites.',
        specs: [
          { label: 'Best For', value: 'Kitchens & Master Suites' },
          { label: 'Timeline', value: '20 – 40 Days' },
          { label: 'Delivery', value: 'Factory Modular Build' }
        ],
        highlights: ['Modular Kitchens', 'Walk-in Closets', 'Blum Hardware', 'Headboard Walls'],
        features: [
          'Waterproof HPL kitchens with soft-close fittings',
          'Floor-to-ceiling wardrobes & walk-in closets',
          'Upholstered headboards & warm cove lighting',
          'Floating vanities & compact study corners'
        ],
        gallery: [
          img('photo-1556909114-f6e7ad7d3136', 1200),
          img('photo-1540518614846-7eded433c457', 1000),
          img('photo-1505691938895-1758d7feb511', 1000)
        ]
      }
    ],
    gallery: [img('photo-1600210492486-724fe5c67fb0', 900), img('photo-1497366216548-37526070297c', 900), img('photo-1556909114-f6e7ad7d3136', 900)],
  },
  {
    slug: 'architecture',
    number: '02',
    title: 'Architecture',
    shortTitle: 'Architecture',
    tagline: 'Timeless building forms with smart climate-responsive planning.',
    icon: Building2,
    image: img('photo-1600596542815-ffad4c1539a9'),
    description: 'From concept masterplans to construction documents with bold character.',
    intro: 'We design buildings that maximize natural light, ventilation, and plot value — ready for approval and site execution.',
    options: [
      {
        slug: 'building-design-planning',
        title: 'Building Design & Planning',
        tagline: 'Code-compliant master planning for residential & commercial plots.',
        image: img('photo-1600585154340-be6161a56a0c', 1400),
        desc: 'Complete architectural concepts, site zoning, and FAR-optimized planning.',
        specs: [
          { label: 'Best For', value: 'New Plots & Developments' },
          { label: 'Compliance', value: 'RAJUK & BNBC Standards' },
          { label: 'Deliverable', value: 'Masterplan + 3D Massing' }
        ],
        highlights: ['Site Zoning', 'Sun & Wind Flow', 'RAJUK Compliance', 'Green Terraces'],
        features: [
          'Site orientation, sun-path & wind analysis',
          'Smart vertical core & circulation planning',
          'Full RAJUK & BNBC building code compliance',
          'Passive cooling & green terrace integration'
        ],
        gallery: [
          img('photo-1600585154340-be6161a56a0c', 1200),
          img('photo-1600596542815-ffad4c1539a9', 1000),
          img('photo-1512917774080-9991f1c4c750', 1000)
        ]
      },
      {
        slug: 'floor-plans-elevations',
        title: 'Floor Plans & Elevations',
        tagline: 'Zero-wastage layouts paired with balanced 4-side elevations.',
        image: img('photo-1487958449943-2429e8be8625', 1400),
        desc: 'Precision floor plans and multi-angle elevations maximizing every square foot.',
        specs: [
          { label: 'Best For', value: 'Multi-Storied & Duplexes' },
          { label: 'Format', value: 'CAD + Scaled PDF Sets' },
          { label: 'Focus', value: 'Zero Space Wastage' }
        ],
        highlights: ['2D CAD Layouts', '4-Side Elevations', 'Cross Sections', 'Ventilation'],
        features: [
          'Dimensioned floor layouts with furniture grids',
          'Detailed sectional views & slab clearances',
          'Proportional 4-side exterior elevations',
          'Window schedules for natural cross-ventilation'
        ],
        gallery: [
          img('photo-1487958449943-2429e8be8625', 1200),
          img('photo-1503387762-592deb58ef4e', 1000),
          img('photo-1600585154340-be6161a56a0c', 1000)
        ]
      },
      {
        slug: 'exterior-facade-design',
        title: 'Exterior & Facade Design',
        tagline: 'Iconic street presence with modern cladding, glass & lighting.',
        image: img('photo-1512917774080-9991f1c4c750', 1400),
        desc: 'Striking building exteriors blending louvers, architectural concrete, and warm night lighting.',
        specs: [
          { label: 'Best For', value: 'New & Existing Buildings' },
          { label: 'Materials', value: 'HPL, Louvers, Glass & Stone' },
          { label: 'Deliverable', value: 'Day/Night 3D + Cladding Details' }
        ],
        highlights: ['3D Day/Night Renders', 'Louver & Glass', 'Facade Lighting', 'Thermal Shading'],
        features: [
          'Contemporary architectural facade styling',
          'Weatherproof HPL, terracotta & stone cladding',
          'Warm architectural facade night-lighting',
          'Sun-shading louvers for thermal comfort'
        ],
        gallery: [
          img('photo-1512917774080-9991f1c4c750', 1200),
          img('photo-1600596542815-ffad4c1539a9', 1000),
          img('photo-1486406146926-c627a92ad1ab', 1000)
        ]
      },
      {
        slug: 'architectural-drawings',
        title: 'Architectural Drawings',
        tagline: 'Construction-ready blueprints for smooth site execution.',
        image: img('photo-1503387762-592deb58ef4e', 1400),
        desc: 'Complete working drawing packages with joinery, staircase, and finishing schedules.',
        specs: [
          { label: 'Best For', value: 'Contractors & Site Engineers' },
          { label: 'Accuracy', value: 'Millimeter-Grade CAD' },
          { label: 'Deliverable', value: 'Full Working Drawing Book' }
        ],
        highlights: ['Working Drawings', 'Stair & Railing', 'Door/Window Schedule', 'Finish Specs'],
        features: [
          'Complete construction working drawing set',
          'Staircase, parapet & railing fabrication details',
          'Door, window & sanitary fixture schedules',
          'Authority approval & site coordination sheets'
        ],
        gallery: [
          img('photo-1503387762-592deb58ef4e', 1200),
          img('photo-1487958449943-2429e8be8625', 1000),
          img('photo-1541888946425-d81bb19240f5', 1000)
        ]
      }
    ],
    gallery: [img('photo-1487958449943-2429e8be8625', 900), img('photo-1503387762-592deb58ef4e', 900), img('photo-1512917774080-9991f1c4c750', 900)],
  },
  {
    slug: 'engineering',
    number: '03',
    title: 'Engineering',
    shortTitle: 'Engineering',
    tagline: 'Safe, BNBC-compliant structures backed by rigorous analysis.',
    icon: HardHat,
    image: img('photo-1541888946425-d81bb19240f5'),
    description: 'Buildable, cost-efficient structural engineering led by Engr. Aslam Sheikh.',
    intro: 'Every structure we engineer is analyzed for seismic safety, material economy, and long-term durability.',
    options: [
      {
        slug: 'structural-design-consultancy',
        title: 'Structural Design & Consultancy',
        tagline: 'Safe RCC & steel structures engineered for longevity.',
        image: img('photo-1504307651254-35680f356dfd', 1400),
        desc: 'Complete structural consultancy for residential towers, villas, and industrial steel buildings.',
        specs: [
          { label: 'Led By', value: 'Engr. Aslam Sheikh' },
          { label: 'Code', value: 'BNBC & ACI Standards' },
          { label: 'Structure', value: 'RCC & Steel Frames' }
        ],
        highlights: ['Pile & Mat Foundations', 'RCC Frame Design', 'Steel Structures', 'Site Verification'],
        features: [
          'Shallow & deep pile foundation engineering',
          'Optimized column, beam & slab systems',
          'Basement retaining walls & water reservoirs',
          'On-site structural inspection & certification'
        ],
        gallery: [
          img('photo-1504307651254-35680f356dfd', 1200),
          img('photo-1541888946425-d81bb19240f5', 1000),
          img('photo-1581094794329-c8112a89af12', 1000)
        ]
      },
      {
        slug: 'structural-analysis',
        title: 'Structural Analysis',
        tagline: 'Seismic & wind load modeling with ETABS and STAAD.Pro.',
        image: img('photo-1581094794329-c8112a89af12', 1400),
        desc: 'Computer-simulated load testing for earthquake resistance and structural health.',
        specs: [
          { label: 'Software', value: 'ETABS, SAFE & STAAD.Pro' },
          { label: 'Analysis', value: 'Seismic & Wind Loads' },
          { label: 'Service', value: 'New & Retrofit Audits' }
        ],
        highlights: ['Earthquake Modeling', 'Wind Load Checks', 'Soil Report Review', 'Retrofit Audits'],
        features: [
          'Dynamic seismic & wind load simulations',
          'Structural health assessment & retrofitting',
          'Sub-soil investigation & bearing capacity review',
          'Deflection, drift & stress safety verification'
        ],
        gallery: [
          img('photo-1581094794329-c8112a89af12', 1200),
          img('photo-1503387762-592deb58ef4e', 1000),
          img('photo-1504307651254-35680f356dfd', 1000)
        ]
      },
      {
        slug: 'technical-drawings',
        title: 'Technical Drawings',
        tagline: 'Clear reinforcement detailing & Bar Bending Schedules (BBS).',
        image: img('photo-1503387762-592deb58ef4e', 1400),
        desc: 'Error-free structural detailing and steel schedules for accurate site casting.',
        specs: [
          { label: 'Includes', value: 'Full Rebar Detailing + BBS' },
          { label: 'Benefit', value: 'Reduces Steel Wastage' },
          { label: 'Format', value: 'Site-Ready Blueprints' }
        ],
        highlights: ['Rebar Detailing', 'Bar Bending Schedule', 'Footing Layouts', 'Slab Sections'],
        features: [
          'Ductile reinforcement detailing & lap lengths',
          'Itemized Bar Bending Schedules (BBS)',
          'Column grid & foundation layout plans',
          'Beam-column joint & slab casting sections'
        ],
        gallery: [
          img('photo-1503387762-592deb58ef4e', 1200),
          img('photo-1541888946425-d81bb19240f5', 1000),
          img('photo-1581094794329-c8112a89af12', 1000)
        ]
      }
    ],
    gallery: [img('photo-1503387762-592deb58ef4e', 900), img('photo-1581094794329-c8112a89af12', 900), img('photo-1504307651254-35680f356dfd', 900)],
  },
  {
    slug: 'renovation-remodeling',
    number: '04',
    title: 'Renovation & Remodeling',
    shortTitle: 'Renovation',
    tagline: 'Transform dated spaces into bright, modern interiors.',
    icon: Hammer,
    image: img('photo-1581858726788-75bc0f6a952d'),
    description: 'Breathe new life into existing homes and offices with clean, fast execution.',
    intro: 'We reimagine older apartments and commercial floors with structural care, modern finishes, and minimal disruption.',
    options: [
      {
        slug: 'residential-renovation',
        title: 'Residential Renovation',
        tagline: 'Complete modern makeovers for older flats and family homes.',
        image: img('photo-1586023492125-27b2c045efd7', 1400),
        desc: 'Open-plan conversions, new flooring, electrical rewiring, and luxury finishes.',
        specs: [
          { label: 'Best For', value: 'Older Flats & Houses' },
          { label: 'Timeline', value: '30 – 60 Days' },
          { label: 'Scope', value: 'Civil + MEP + Interior' }
        ],
        highlights: ['Open-Plan Layout', 'New Flooring', 'Concealed Rewiring', 'Fresh Finishes'],
        features: [
          'Safe wall modifications for open-plan living',
          'Large-format tile, marble & wooden flooring',
          'Modern false ceilings & damp-proof painting',
          'Complete electrical & plumbing renewal'
        ],
        gallery: [
          img('photo-1586023492125-27b2c045efd7', 1200),
          img('photo-1581858726788-75bc0f6a952d', 1000),
          img('photo-1600210492486-724fe5c67fb0', 1000)
        ]
      },
      {
        slug: 'commercial-renovation',
        title: 'Commercial Renovation',
        tagline: 'Fast-track office & retail upgrades with zero downtime.',
        image: img('photo-1524758631624-e2822e304c36', 1400),
        desc: 'Phased workplace and showroom refurbishments scheduled around your business hours.',
        specs: [
          { label: 'Best For', value: 'Active Offices & Stores' },
          { label: 'Schedule', value: 'Night / Phased Execution' },
          { label: 'Timeline', value: '15 – 45 Days' }
        ],
        highlights: ['Phased Work', 'Glass Partitions', 'HVAC & Lighting', 'Brand Refresh'],
        features: [
          'Phased execution to keep operations running',
          'Acoustic glass partitions & modern ceilings',
          'Energy-saving LED, HVAC & data cabling upgrades',
          'Complete reception & facade brand refresh'
        ],
        gallery: [
          img('photo-1524758631624-e2822e304c36', 1200),
          img('photo-1497366216548-37526070297c', 1000),
          img('photo-1554118811-1e0d58224f24', 1000)
        ]
      },
      {
        slug: 'kitchen-bathroom-remodeling',
        title: 'Kitchen & Bathroom Remodeling',
        tagline: 'Waterproof, hygienic, and hotel-grade wet area upgrades.',
        image: img('photo-1552321554-5fefe8c9ef14', 1400),
        desc: 'Complete kitchen and washroom overhauls with concealed plumbing and quartz counters.',
        specs: [
          { label: 'Best For', value: 'Kitchens & Washrooms' },
          { label: 'Protection', value: '100% Waterproof Membrane' },
          { label: 'Timeline', value: '14 – 25 Days' }
        ],
        highlights: ['Waterproofing', 'Quartz Counters', 'Concealed Plumbing', 'Glass Enclosures'],
        features: [
          'Multi-layer waterproof membrane treatment',
          'Concealed PPR/uPVC piping & wall-hung sanitary',
          'Quartz/granite counters & backlit mirrors',
          'Tempered shower enclosures & exhaust systems'
        ],
        gallery: [
          img('photo-1552321554-5fefe8c9ef14', 1200),
          img('photo-1556909114-f6e7ad7d3136', 1000),
          img('photo-1584622650111-993a426fbf0a', 1000)
        ]
      },
      {
        slug: 'space-optimization',
        title: 'Space Optimization',
        tagline: 'Turn compact flats and unused corners into smart storage.',
        image: img('photo-1616486338812-3dadae4b4ace', 1400),
        desc: 'Clever built-in cabinetry and multi-purpose layouts that make compact spaces feel twice as large.',
        specs: [
          { label: 'Best For', value: 'Compact Flats & Studios' },
          { label: 'Gain', value: '+35% Usable Storage' },
          { label: 'Timeline', value: '15 – 30 Days' }
        ],
        highlights: ['Hidden Storage', 'Foldable Desks', 'Mirror Depth', 'Under-Stair Units'],
        features: [
          'Storage-first layout reconfiguration',
          'Concealed floor-to-ceiling cabinetry',
          'Strategic mirrors & light-reflective palettes',
          'Multi-functional beds, bay windows & desks'
        ],
        gallery: [
          img('photo-1616486338812-3dadae4b4ace', 1200),
          img('photo-1493809842364-78817add7ffb', 1000),
          img('photo-1502672260266-1c1de2d9d000', 1000)
        ]
      }
    ],
    gallery: [img('photo-1556909114-f6e7ad7d3136', 900), img('photo-1552321554-5fefe8c9ef14', 900), img('photo-1586023492125-27b2c045efd7', 900)],
  },
  {
    slug: 'exhibition-booth-design',
    number: '05',
    title: 'Exhibition & Trade Show Booth Design',
    shortTitle: 'Exhibition & Booths',
    tagline: 'Show-stopping expo pavilions that draw crowds in seconds.',
    icon: Presentation,
    image: img('photo-1540575467063-178a50c2df87'),
    description: 'High-impact exhibition stalls engineered for rapid setup and unforgettable branding.',
    intro: 'Your booth has seconds to capture attention. We design, render, and fabricate stands that invite visitors in.',
    options: [
      {
        slug: 'exhibition-booth-design-service',
        title: 'Exhibition Booth Design',
        tagline: 'Crowd-pulling stall concepts with seamless visitor flow.',
        image: img('photo-1540575467063-178a50c2df87', 1400),
        desc: 'Strategic expo booth concepts balancing bold brand fascias, product displays, and lounge seating.',
        specs: [
          { label: 'Best For', value: 'ICCB, BICC & Trade Expos' },
          { label: 'Layouts', value: 'Island, Corner & Inline' },
          { label: 'Turnaround', value: '5 – 10 Days Design' }
        ],
        highlights: ['High Fascia Towers', 'Island & Corner', 'Product Podiums', 'VIP Lounge'],
        features: [
          'High-visibility overhead brand fascias',
          'Open-flow island, peninsula & corner layouts',
          'Illuminated product podiums & demo counters',
          'Private discussion lounge & reception desk'
        ],
        gallery: [
          img('photo-1540575467063-178a50c2df87', 1200),
          img('photo-1505373877841-8d25f7d46678', 1000),
          img('photo-1511578314322-379afb476865', 1000)
        ]
      },
      {
        slug: 'trade-show-stand-design',
        title: 'Trade Show Stand Design',
        tagline: 'Modular, reusable stands built for fast overnight installation.',
        image: img('photo-1505373877841-8d25f7d46678', 1400),
        desc: 'Lightweight aluminum and wooden modular stands with backlit graphics and LED screens.',
        specs: [
          { label: 'Setup Time', value: '12 – 24 Hours On-Site' },
          { label: 'System', value: 'Modular & Reusable' },
          { label: 'Includes', value: 'AV, Lighting & Graphics' }
        ],
        highlights: ['Fast Setup', 'Backlit Lightboxes', 'LED Video Walls', 'Modular Frame'],
        features: [
          'Precision modular wood & aluminum framing',
          'Seamless backlit fabric walls & lightboxes',
          'Integrated LED video walls & touch kiosks',
          'Complete expo spotlighting & power distribution'
        ],
        gallery: [
          img('photo-1505373877841-8d25f7d46678', 1200),
          img('photo-1540575467063-178a50c2df87', 1000),
          img('photo-1475721027785-f74eccf877e2', 1000)
        ]
      },
      {
        slug: 'custom-booth-design',
        title: 'Custom Booth Design',
        tagline: '100% bespoke flagship pavilions for market leaders.',
        image: img('photo-1511578314322-379afb476865', 1400),
        desc: 'Sculptural, multi-zone custom pavilions crafted with Duco paint, acrylic, and raised LED floors.',
        specs: [
          { label: 'Best For', value: 'Flagship Brand Pavilions' },
          { label: 'Finish', value: 'PU Lacquer, Acrylic & Steel' },
          { label: 'Service', value: 'Design + Turnkey Build' }
        ],
        highlights: ['Sculptural Forms', 'Raised LED Floor', 'VIP Boardroom', 'Duco Finish'],
        features: [
          'Bespoke curved & cantilevered structures',
          'Enclosed VIP meeting rooms & hospitality bar',
          'Raised platform flooring with edge LED strips',
          'Automotive-grade Duco & metallic finishes'
        ],
        gallery: [
          img('photo-1511578314322-379afb476865', 1200),
          img('photo-1540575467063-178a50c2df87', 1000),
          img('photo-1505373877841-8d25f7d46678', 1000)
        ]
      },
      {
        slug: '3d-booth-visualization',
        title: '3D Booth Visualization',
        tagline: 'Photorealistic 3D renders before a single board is cut.',
        image: img('photo-1475721027785-f74eccf877e2', 1400),
        desc: 'Multi-angle 4K renders with accurate brand graphics and lighting simulation.',
        specs: [
          { label: 'Resolution', value: '4K Photorealistic Views' },
          { label: 'Turnaround', value: '48 – 72 Hours' },
          { label: 'Includes', value: '360° & Multi-Angle Views' }
        ],
        highlights: ['4K Renders', 'Exact Brand Colors', 'Lighting Simulation', 'Fast Revisions'],
        features: [
          'Eye-level, bird’s-eye & close-up camera angles',
          'Exact Pantone brand color & logo placement',
          'Realistic spotlight & backlit glow simulation',
          'Fast iterative revisions for management sign-off'
        ],
        gallery: [
          img('photo-1475721027785-f74eccf877e2', 1200),
          img('photo-1511578314322-379afb476865', 1000),
          img('photo-1505373877841-8d25f7d46678', 1000)
        ]
      },
      {
        slug: 'booth-layout-technical-drawings',
        title: 'Booth Layout & Technical Drawings',
        tagline: 'Exact fabrication drawings & organizer approval sheets.',
        image: img('photo-1503387762-592deb58ef4e', 1400),
        desc: 'Dimensioned carpentry blueprints, graphic print sizes, and electrical load plans.',
        specs: [
          { label: 'For', value: 'Fabricators & Organizers' },
          { label: 'Includes', value: 'Cut-Lists + Graphic Sizes' },
          { label: 'Safety', value: 'Electrical Load Schedule' }
        ],
        highlights: ['Carpentry Blueprints', 'Print Dimensions', 'Power Layout', 'Rigging Specs'],
        features: [
          'Dimensioned floor plan & elevation blueprints',
          'Exact graphic print bleed & panel dimensions',
          'Electrical load & socket distribution chart',
          'Step-by-step on-site assembly manual'
        ],
        gallery: [
          img('photo-1503387762-592deb58ef4e', 1200),
          img('photo-1540575467063-178a50c2df87', 1000),
          img('photo-1475721027785-f74eccf877e2', 1000)
        ]
      }
    ],
    gallery: [img('photo-1505373877841-8d25f7d46678', 900), img('photo-1511578314322-379afb476865', 900), img('photo-1475721027785-f74eccf877e2', 900)],
  },
  {
    slug: 'project-management',
    number: '06',
    title: 'Project Management',
    shortTitle: 'Project Management',
    tagline: 'On-time, on-budget delivery with daily engineer supervision.',
    icon: ClipboardList,
    image: img('photo-1504307651254-35680f356dfd'),
    description: 'Transparent costing, strict quality control, and hands-on site management.',
    intro: 'We coordinate every contractor, material delivery, and quality check so you can relax while we build.',
    options: [
      {
        slug: 'site-supervision',
        title: 'Site Supervision',
        tagline: 'Dedicated engineers on-site ensuring drawing-accurate execution.',
        image: img('photo-1541888946425-d81bb19240f5', 1400),
        desc: 'Daily on-site quality checks, laser-level verifications, and weekly video progress updates.',
        specs: [
          { label: 'Supervision', value: 'Daily Civil/Interior Engineers' },
          { label: 'Reporting', value: 'Weekly Photo & Video Logs' },
          { label: 'Quality', value: 'Multi-Stage Snag Checks' }
        ],
        highlights: ['Daily Site Checks', 'Weekly Video Logs', 'Laser Leveling', 'Safety Compliance'],
        features: [
          'Daily engineer supervision & quality audits',
          'Strict adherence to approved 2D/3D drawings',
          'Site safety, cleanliness & neighbor compliance',
          'Weekly WhatsApp/Cloud photo & video reports'
        ],
        gallery: [
          img('photo-1541888946425-d81bb19240f5', 1200),
          img('photo-1504307651254-35680f356dfd', 1000),
          img('photo-1581094794329-c8112a89af12', 1000)
        ]
      },
      {
        slug: 'project-planning-coordination',
        title: 'Project Planning & Coordination',
        tagline: 'Milestone schedules that keep every trade in sync.',
        image: img('photo-1504307651254-35680f356dfd', 1400),
        desc: 'Gantt chart scheduling and smooth handoffs between civil, MEP, woodwork, and finishing teams.',
        specs: [
          { label: 'Method', value: 'Milestone Gantt Tracking' },
          { label: 'Trades', value: 'Civil, MEP, Wood & Paint' },
          { label: 'Goal', value: 'Zero Handover Delays' }
        ],
        highlights: ['Gantt Timelines', 'Trade Sync', 'Permit Clearances', 'On-Time Handover'],
        features: [
          'Clear weekly milestone & critical-path schedules',
          'Seamless sync across civil, MEP & carpentry teams',
          'Building society & developer NOC coordination',
          'Proactive bottleneck resolution to prevent delays'
        ],
        gallery: [
          img('photo-1504307651254-35680f356dfd', 1200),
          img('photo-1541888946425-d81bb19240f5', 1000),
          img('photo-1503387762-592deb58ef4e', 1000)
        ]
      },
      {
        slug: 'material-selection',
        title: 'Material Selection',
        tagline: 'Genuine, tested materials sourced at direct vendor rates.',
        image: img('photo-1600585154340-be6161a56a0c', 1400),
        desc: 'Curated material boards and quality inspection for timber, marine ply, marble, and hardware.',
        specs: [
          { label: 'Includes', value: 'Physical Sample Boards' },
          { label: 'Sourcing', value: 'Verified Brand Partners' },
          { label: 'Warranty', value: 'Manufacturer Backed' }
        ],
        highlights: ['Mood Boards', 'Seasoned Timber', 'Imported Hardware', 'Showroom Visits'],
        features: [
          'Physical sample boards brought to your home',
          'Direct manufacturer & importer price advantage',
          'Moisture & seasoning tests for all timber/ply',
          'Genuine Blum, Hettich & Grohe hardware sourcing'
        ],
        gallery: [
          img('photo-1600585154340-be6161a56a0c', 1200),
          img('photo-1618221195710-dd6b41faaea6', 1000),
          img('photo-1556909114-f6e7ad7d3136', 1000)
        ]
      },
      {
        slug: 'cost-estimation-budget-planning',
        title: 'Cost Estimation & Budget Planning',
        tagline: 'Itemized Bills of Quantities (BOQ) with zero hidden costs.',
        image: img('photo-1554995207-c18c203602cb', 1400),
        desc: 'Transparent line-by-line costing tailored to your target budget before work begins.',
        specs: [
          { label: 'Document', value: 'Itemized BOQ Spreadsheet' },
          { label: 'Pricing', value: '100% Transparent Rates' },
          { label: 'Options', value: 'Standard / Premium Tiers' }
        ],
        highlights: ['Itemized BOQ', 'Zero Hidden Costs', 'Value Engineering', 'Milestone Billing'],
        features: [
          'Room-by-room itemized material & labor BOQ',
          'Smart value-engineering to match your budget',
          'Clear progress-linked payment milestones',
          'Locked-in unit rates with zero surprise extras'
        ],
        gallery: [
          img('photo-1554995207-c18c203602cb', 1200),
          img('photo-1503387762-592deb58ef4e', 1000),
          img('photo-1600210492486-724fe5c67fb0', 1000)
        ]
      }
    ],
    gallery: [img('photo-1541888946425-d81bb19240f5', 900), img('photo-1600585154340-be6161a56a0c', 900), img('photo-1581858726788-75bc0f6a952d', 900)],
  },
  {
    slug: 'additional-services',
    number: '07',
    title: 'Additional Services',
    shortTitle: 'Specialized Services',
    tagline: 'Bespoke furniture, 3D visualization, turnkey & remote NRB design.',
    icon: Sparkles,
    image: img('photo-1616486338812-3dadae4b4ace'),
    description: 'Specialized design and execution services that complete your space.',
    intro: 'From handcrafted furniture pieces to full remote project delivery for NRB clients abroad.',
    options: [
      {
        slug: 'custom-furniture-design',
        title: 'Custom Furniture Design',
        tagline: 'Handcrafted teak, oak & upholstered furniture made to measure.',
        image: img('photo-1555041469-a586c61ea9bc', 1400),
        desc: 'Bespoke sofas, dining tables, beds, and consoles built in our workshop to fit your exact space.',
        specs: [
          { label: 'Materials', value: 'Seasoned Teak, Oak & Velvet' },
          { label: 'Finish', value: 'PU Lacquer & Duco Polish' },
          { label: 'Timeline', value: '15 – 30 Days Fabrication' }
        ],
        highlights: ['Bespoke Sofas', 'Solid Wood Dining', 'PU Lacquer Finish', 'Custom Sizing'],
        features: [
          'Made-to-measure sofas, beds, dining & consoles',
          '3D model approval prior to workshop production',
          'Kiln-seasoned Burmese/Chittagong teak & oak',
          'Stain-resistant fabrics & high-density cushioning'
        ],
        gallery: [
          img('photo-1555041469-a586c61ea9bc', 1200),
          img('photo-1616486338812-3dadae4b4ace', 1000),
          img('photo-1600210492486-724fe5c67fb0', 1000)
        ]
      },
      {
        slug: '2d-drawings-3d-visualization',
        title: '2D Drawings & 3D Visualization',
        tagline: 'Experience your space in photorealistic 4K before building.',
        image: img('photo-1513694203232-719a280e022f', 1400),
        desc: 'Studio-grade 3D rendering, virtual walkthroughs, and complete CAD drafting packages.',
        specs: [
          { label: 'Output', value: '4K Renders + AutoCAD DWG' },
          { label: 'Views', value: 'Day, Night & 360° Tours' },
          { label: 'Turnaround', value: '3 – 7 Days per Zone' }
        ],
        highlights: ['4K Interior Renders', '360° Walkthroughs', 'AutoCAD Drafting', 'Lighting Moods'],
        features: [
          'Photorealistic 4K interior & exterior renders',
          'Daylight & warm evening lighting simulations',
          'Complete 2D furniture, ceiling & electrical CAD',
          'Interactive 360° panorama links for mobile viewing'
        ],
        gallery: [
          img('photo-1513694203232-719a280e022f', 1200),
          img('photo-1618221195710-dd6b41faaea6', 1000),
          img('photo-1600566753190-17f0baa2a6c3', 1000)
        ]
      },
      {
        slug: 'lighting-ceiling-design',
        title: 'Lighting & Ceiling Design',
        tagline: 'Architectural false ceilings and warm layered illumination.',
        image: img('photo-1600566753190-17f0baa2a6c3', 1400),
        desc: 'Minimalist gypsum ceilings, magnetic track lights, and indirect cove lighting schemes.',
        specs: [
          { label: 'Systems', value: 'Gypsum, Baffle & Track LED' },
          { label: 'Color Temp', value: '2700K – 4000K Tunable' },
          { label: 'Control', value: 'Smart Dimmer Ready' }
        ],
        highlights: ['Magnetic Tracks', 'Warm Cove LED', 'Gypsum & Wood', 'Smart Dimmers'],
        features: [
          '3-layer lighting: ambient, task & accent glow',
          'Moisture-resistant gypsum & wooden baffle ceilings',
          'Glare-free COB spotlights & magnetic track rails',
          'Smart scene dimmers & chandelier reinforcement'
        ],
        gallery: [
          img('photo-1600566753190-17f0baa2a6c3', 1200),
          img('photo-1600210492486-724fe5c67fb0', 1000),
          img('photo-1618221195710-dd6b41faaea6', 1000)
        ]
      },
      {
        slug: 'electrical-plumbing-coordination',
        title: 'Electrical & Plumbing Coordination',
        tagline: 'Precision MEP layouts aligned to every piece of furniture.',
        image: img('photo-1504307651254-35680f356dfd', 1400),
        desc: 'Safe, concealed electrical, AC, and sanitary routing planned before walls and ceilings close.',
        specs: [
          { label: 'Includes', value: 'Electrical, HVAC & Sanitary' },
          { label: 'Safety', value: 'Load-Balanced DB Design' },
          { label: 'Precision', value: 'Furniture-Aligned Sockets' }
        ],
        highlights: ['Socket Mapping', 'DB Load Balance', 'AC Drain Routing', 'Concealed Piping'],
        features: [
          'Switch & socket heights matched to bed/desk layout',
          'Balanced 3-phase DB boards & surge protection',
          'Concealed hot/cold PPR lines & pressure pumps',
          'Hidden split/cassette AC copper & drain piping'
        ],
        gallery: [
          img('photo-1504307651254-35680f356dfd', 1200),
          img('photo-1552321554-5fefe8c9ef14', 1000),
          img('photo-1541888946425-d81bb19240f5', 1000)
        ]
      },
      {
        slug: 'turnkey-interior-solutions',
        title: 'Turnkey Interior Solutions',
        tagline: 'From bare concrete shell to move-in ready handover.',
        image: img('photo-1600596542815-ffad4c1539a9', 1400),
        desc: 'One team, one contract, zero stress — we handle design, materials, build, curtains, and deep cleaning.',
        specs: [
          { label: 'Model', value: 'Single-Window Turnkey' },
          { label: 'Handover', value: 'Deep-Cleaned & Styled' },
          { label: 'Warranty', value: '1-Year Service Support' }
        ],
        highlights: ['Single Point Contact', 'Factory Woodwork', 'Fixed Timeline', 'Move-In Ready'],
        features: [
          'Dedicated project manager from day one to key handover',
          'Complete material sourcing & factory cabinet build',
          'Fixed budget & guaranteed completion schedule',
          'Final styling, soft furnishings & deep cleaning'
        ],
        gallery: [
          img('photo-1600596542815-ffad4c1539a9', 1200),
          img('photo-1600210492486-724fe5c67fb0', 1000),
          img('photo-1618221195710-dd6b41faaea6', 1000)
        ]
      },
      {
        slug: 'remote-international-design-services',
        title: 'Remote & International Design Services',
        tagline: 'Design & build your Dhaka property from anywhere in the world.',
        image: img('photo-1486406146926-c627a92ad1ab', 1400),
        desc: 'Dedicated turnkey & online design service for NRBs in the UK, USA, Canada, Australia & Middle East.',
        specs: [
          { label: 'For', value: 'NRBs & Global Clients' },
          { label: 'Updates', value: 'Zoom + Live Cloud Tracker' },
          { label: 'Execution', value: 'Full Dhaka Key-in-Hand' }
        ],
        highlights: ['NRB Specialists', 'Zoom Consultations', 'Live Video Updates', 'Key-in-Hand Dhaka'],
        features: [
          'Flexible video consultations aligned to your timezone',
          'Digital 3D walkthroughs & online material approval',
          'Full turnkey execution in Dhaka while you are abroad',
          'Weekly drone/video walkthroughs & milestone billing'
        ],
        gallery: [
          img('photo-1486406146926-c627a92ad1ab', 1200),
          img('photo-1600210492486-724fe5c67fb0', 1000),
          img('photo-1600585154340-be6161a56a0c', 1000)
        ]
      }
    ],
    gallery: [img('photo-1555041469-a586c61ea9bc', 900), img('photo-1513694203232-719a280e022f', 900), img('photo-1600566753190-17f0baa2a6c3', 900)],
  },
];

// Helper to find by category slug OR by sub-option slug
export function findServiceOrOption(slug) {
  const category = servicesData.find((s) => s.slug === slug);
  if (category) {
    return { type: 'category', data: category, category };
  }

  for (const cat of servicesData) {
    const opt = cat.options.find((o) => o.slug === slug);
    if (opt) {
      return { type: 'option', data: opt, category: cat };
    }
  }

  return null;
}
