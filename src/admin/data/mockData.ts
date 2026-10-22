import type {
  Inquiry,
  Testimonial,
  Subscriber,
  SiteSetting,
  Division,
} from "../../types/supabaseType";
import { DIVISIONS_DATA } from "../../data/divisions";

// ── Inquiries ─────────────────────────────────────────────────────────────────
export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: "inq-001",
    full_name: "Dr. Adebayo Okonkwo",
    email: "adebayo.okonkwo@gmail.com",
    phone: "+1 713 555 0182",
    country: "USA",
    division: "diaspora",
    message:
      "I would like to invest in a 4-bedroom duplex in Lekki Phase 1. I currently reside in Houston, Texas and need full escrow and title verification services. Please advise on the process and timeline.",
    status: "unread",
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inq-002",
    full_name: "Mrs. Funmilayo Adeyemi",
    email: "funmi.adeyemi@outlook.com",
    phone: "+44 7700 900456",
    country: "United Kingdom",
    division: "properties",
    message:
      "I am looking to acquire a commercial property in Victoria Island. My budget is between ₦250M and ₦400M. I need help with title verification and legal documentation.",
    status: "read",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inq-003",
    full_name: "Engr. Chukwuemeka Eze",
    email: "c.eze@ezeindustrial.com",
    phone: "+234 803 456 7890",
    country: "Nigeria",
    division: "construction",
    message:
      "We need a turnkey contractor for our 12-floor commercial building in Victoria Island. Project starts Q1 next year. Please send your portfolio and timeline estimates.",
    status: "responded",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inq-004",
    full_name: "Ms. Kemi Oduya",
    email: "kemi.oduya@tradeco.ca",
    phone: "+1 647 555 0234",
    country: "Canada",
    division: "logistics",
    message:
      "I ship goods monthly from Toronto to Lagos. Currently dealing with customs delays. Looking for a reliable freight partner with door-to-door delivery and real-time tracking.",
    status: "unread",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inq-005",
    full_name: "Alhaji Musa Tanko",
    email: "m.tanko@govprocure.ng",
    phone: "+234 809 123 4567",
    country: "Nigeria",
    division: "business-services",
    message:
      "Our ministry is looking for a procurement partner for heavy industrial equipment. We have a government tender open. Please send your company profile and certifications.",
    status: "read",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inq-006",
    full_name: "Mr. Seun Bankole",
    email: "seun.bankole@techventures.ae",
    phone: "+971 50 555 0321",
    country: "UAE",
    division: "travel",
    message:
      "I need a corporate travel desk to manage my team's flights across Africa, Europe and the Gulf. Approximately 40 trips per month. Need 24/7 support and VIP protocol.",
    status: "unread",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inq-007",
    full_name: "Barrister Tolu Fashola",
    email: "t.fashola@fashola-law.com",
    phone: "+234 806 789 0123",
    country: "Nigeria",
    division: "properties",
    message:
      "Seeking to acquire 3 residential plots in Ibeju-Lekki for client investment. Need complete title searches and C of O documentation assistance.",
    status: "responded",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inq-008",
    full_name: "Mrs. Ngozi Obi",
    email: "ngozi.obi@diasporalink.co.uk",
    phone: "+44 7911 123456",
    country: "United Kingdom",
    division: "diaspora",
    message:
      "I want to build a family home in Enugu state. I live in London and cannot supervise. Need live telemetry, escrow protection and a trusted ground team. How do we get started?",
    status: "unread",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-001",
    name: "Dr. Adebayo Okonkwo",
    title: "Medical Consultant",
    location: "Houston, Texas — USA",
    division: "diaspora",
    rating: 5,
    quote:
      "I had been burned twice by agents who disappeared with my money. AKOY 360 was different — every naira was in escrow, and I watched my duplex go from foundation to roofing via live drone feeds. I didn't step foot in Nigeria once. Absolutely remarkable.",
    initials: "AO",
    published: true,
    sort_order: 1,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "test-002",
    name: "Mrs. Funmilayo Adeyemi",
    title: "Finance Director",
    location: "London, United Kingdom",
    division: "properties",
    rating: 5,
    quote:
      "Finding a verified property in Lagos from London used to feel impossible. AKOY 360 Properties handled title verification, negotiation, and transfer documentation end-to-end. I signed everything remotely with full legal backing. World-class service.",
    initials: "FA",
    published: true,
    sort_order: 2,
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "test-003",
    name: "Engr. Chukwuemeka Eze",
    title: "CEO, Eze Industrial Group",
    location: "Lagos, Nigeria",
    division: "construction",
    rating: 5,
    quote:
      "We contracted AKOY 360 Construction for our 12-floor commercial hub in Victoria Island. Their site supervision, quality audits, and milestone reporting were impeccable. Delivered on time and within budget.",
    initials: "CE",
    published: true,
    sort_order: 3,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "test-004",
    name: "Ms. Kemi Oduya",
    title: "Trade & Import Entrepreneur",
    location: "Toronto, Canada",
    division: "logistics",
    rating: 5,
    quote:
      "I ship goods from Canada to Nigeria monthly. Since partnering with AKOY 360 Logistics, my customs clearance stress is gone. Real-time GPS tracking, door-to-door delivery, zero lost cargo.",
    initials: "KO",
    published: true,
    sort_order: 4,
    created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "test-005",
    name: "Alhaji Musa Tanko",
    title: "Government Procurement Officer",
    location: "Abuja, Nigeria",
    division: "business-services",
    rating: 5,
    quote:
      "AKOY 360 Business Services helped us navigate a complex government tender and connected us to Tier-1 industrial vendors. Their regulatory advisory saved us months of paperwork.",
    initials: "MT",
    published: false,
    sort_order: 5,
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "test-006",
    name: "Mr. Seun Bankole",
    title: "Tech Executive",
    location: "Dubai, UAE",
    division: "travel",
    rating: 5,
    quote:
      "I travel for business constantly across Africa, Europe, and the Gulf. AKOY 360 Travel manages all my corporate ticketing, visa advisory, and VIP protocols. Having a 24/7 concierge that actually picks up the phone is priceless.",
    initials: "SB",
    published: true,
    sort_order: 6,
    created_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ── Subscribers ───────────────────────────────────────────────────────────────
export const MOCK_SUBSCRIBERS: Subscriber[] = [
  {
    id: "sub-001",
    email: "adebayo.okonkwo@gmail.com",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-002",
    email: "funmi.adeyemi@outlook.com",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-003",
    email: "kemi.oduya@tradeco.ca",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-004",
    email: "seun.bankole@techventures.ae",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-005",
    email: "ngozi.obi@diasporalink.co.uk",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-006",
    email: "t.fashola@fashola-law.com",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-007",
    email: "m.tanko@govprocure.ng",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-008",
    email: "c.eze@ezeindustrial.com",
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-009",
    email: "investor@akoypartners.com",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-010",
    email: "bola.martins@realtyllc.ng",
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-011",
    email: "chioma.nwosu@londonpro.co.uk",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-012",
    email: "emeka.uche@uchemotors.ng",
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ── Site Settings ─────────────────────────────────────────────────────────────
export const MOCK_SETTINGS: SiteSetting[] = [
  {
    id: "set-001",
    key: "phone_primary",
    label: "Primary Phone",
    value: "+234 (0) 800 360 AKOY",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-002",
    key: "phone_whatsapp",
    label: "WhatsApp Number",
    value: "2348123456789",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-003",
    key: "email_general",
    label: "General Email",
    value: "contact@akoy360.com",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-004",
    key: "email_diaspora",
    label: "Diaspora Email",
    value: "diaspora@akoy360.com",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-005",
    key: "address_hq",
    label: "HQ Address",
    value: "Victoria Island / Ikoyi Commercial Corridor, Lagos, Nigeria",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-006",
    key: "address_london",
    label: "London Desk Address",
    value: "London, United Kingdom",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-007",
    key: "address_houston",
    label: "Houston Desk Address",
    value: "Houston, Texas, USA",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-008",
    key: "social_twitter",
    label: "Twitter / X URL",
    value: "https://twitter.com/akoy360",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-009",
    key: "social_instagram",
    label: "Instagram URL",
    value: "https://instagram.com/akoy360",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-010",
    key: "social_linkedin",
    label: "LinkedIn URL",
    value: "https://linkedin.com/company/akoy360",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-011",
    key: "whatsapp_message",
    label: "Default WhatsApp Message",
    value: "Hello AKOY 360, I would like to learn more about your services.",
    updated_at: new Date().toISOString(),
  },
  {
    id: "set-012",
    key: "office_hours",
    label: "Office Hours",
    value: "Mon - Sat, 8:00 AM - 6:00 PM (WAT)",
    updated_at: new Date().toISOString(),
  },
];

// ── Divisions (derived from static data) ─────────────────────────────────────
export const MOCK_DIVISIONS: Division[] = DIVISIONS_DATA.map((d) => ({
  id: d.id,
  name: d.name,
  short_name: d.shortName,
  tagline: d.tagline,
  headline: d.headline,
  description: d.description,
  bullet_points: d.bulletPoints,
  image: d.image,
  gallery_images: d.galleryImages,
  stat_value: d.stats.value,
  stat_label: d.stats.label,
  metric_primary: d.metrics.primary,
  metric_secondary: d.metrics.secondary,
  icon_name: d.iconName,
  updated_at: new Date().toISOString(),
}));
