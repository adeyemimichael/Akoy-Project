export interface DivisionItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  headline: string;
  description: string;
  bulletPoints: string[];
  image: string;
  galleryImages: string[];
  stats: {
    label: string;
    value: string;
  };
  metrics: {
    primary: string;
    secondary: string;
  };
  iconName: string;
}

export const DIVISIONS_DATA: DivisionItem[] = [
  {
    id: "properties",
    name: "AKOY 360 Properties",
    shortName: "Properties",
    tagline: "Prime Real Estate & Developments",
    headline: "Premium Residential & Commercial Property Assets",
    description:
      "Delivering landmark residential developments, commercial hubs, high-yield acquisitions, and full-cycle property management tailored for discerning local and global investors.",
    bulletPoints: [
      "Luxury Residential & Waterfront Developments",
      "Commercial Property Acquisition & Leasing",
      "Diaspora Property Search & Title Verification",
      "Asset Valuation & High-Return Portfolio Management",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    ],
    stats: {
      value: "₦45B+",
      label: "Portfolio Managed",
    },
    metrics: {
      primary: "180+ Luxury Units",
      secondary: "100% Verified Titles",
    },
    iconName: "Building2",
  },
  {
    id: "construction",
    name: "AKOY 360 Construction",
    shortName: "Construction",
    tagline: "Engineering & Turnkey Projects",
    headline: "Precision Engineering & Turnkey Infrastructure Delivery",
    description:
      "From ground-breaking architectural concepts to civil engineering and interior finishes, we execute structural projects with world-class engineering standards and timely milestones.",
    bulletPoints: [
      "Turnkey Commercial & Residential Construction",
      "Structural Engineering & Architectural Modeling",
      "Site Supervision & Quality Assurance Audits",
      "Diaspora Remote Build Tracking with Live Telemetry",
    ],
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=85",
    ],
    stats: {
      value: "99.4%",
      label: "On-Time Completion",
    },
    metrics: {
      primary: "45+ Active Sites",
      secondary: "ISO Certified Standards",
    },
    iconName: "HardHat",
  },
  {
    id: "travel",
    name: "AKOY 360 Travel",
    shortName: "Travel & Tourism",
    tagline: "Corporate & Leisure Mobility",
    headline: "Bespoke Corporate Flight Services & Global Tourism Concierge",
    description:
      "Curating seamless travel itineraries, corporate ticketing, private charters, visa advisory, and bespoke diaspora homecoming experiences with VIP protocol.",
    bulletPoints: [
      "Executive Flight Ticketing & Corporate Travel Desk",
      "Private Aircraft & Luxury Yacht Charter Coordination",
      "Global Visa Consultation & Fast-Track Protocol",
      "Curated Diaspora Cultural & Investment Expeditions",
    ],
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
    ],
    stats: {
      value: "140+",
      label: "Global Destinations",
    },
    metrics: {
      primary: "24/7 Concierge",
      secondary: "99.8% Client Satisfaction",
    },
    iconName: "Plane",
  },
  {
    id: "logistics",
    name: "AKOY 360 Logistics",
    shortName: "Logistics & Shipping",
    tagline: "Cargo, Freight & Supply Chain",
    headline: "Multi-Modal Freight, Maritime Cargo & Door-to-Door Delivery",
    description:
      "Connecting continents with reliable air cargo, sea freight, customs clearance, and last-mile logistics networks engineered for high efficiency and secure custody.",
    bulletPoints: [
      "International Air Cargo & Sea Freight Consolidation",
      "Door-to-Door Courier & Cross-Border Delivery",
      "Customs Clearance, Port Handling & Compliance",
      "Cold Chain & High-Value Secure Escort Solutions",
    ],
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
    ],
    stats: {
      value: "250K+",
      label: "Tons Delivered",
    },
    metrics: {
      primary: "48-72h Express Air",
      secondary: "Real-Time GPS Tracking",
    },
    iconName: "Ship",
  },
  {
    id: "business-services",
    name: "AKOY 360 Business Services",
    shortName: "Business & Procurement",
    tagline: "Procurement, Agency & Consulting",
    headline: "Institutional Procurement & Strategic Management Consulting",
    description:
      "Empowering enterprises, government agencies, and growing startups with global vendor procurement, contract representation, regulatory advisory, and operational optimization.",
    bulletPoints: [
      "Industrial & Corporate Equipment Procurement",
      "Contract Agency & Government Tender Support",
      "Business Structuring, Compliance & Advisory",
      "Supply Chain Optimization & Vendor Vetting",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    ],
    stats: {
      value: "₦12B+",
      label: "Procurement Facilitated",
    },
    metrics: {
      primary: "120+ Corporate Clients",
      secondary: "Tier-1 Vendor Network",
    },
    iconName: "Briefcase",
  },
  {
    id: "diaspora",
    name: "AKOY 360 Diaspora Services",
    shortName: "Diaspora Gateway",
    tagline: "Trusted Nigerian-Global Bridge",
    headline: "The Verified Link Between Nigerians Abroad and Opportunities at Home",
    description:
      "Eliminating the anxiety of remote execution. We serve as your trusted on-ground fiduciary for land acquisition, building oversight, vehicle shipping, family support, and verified ventures.",
    bulletPoints: [
      "Direct Milestone Escrow & Transparent Camera Telemetry",
      "Family & Elder Care Concierge Protocols",
      "Direct Government & Banking Document Processing",
      "Returnee Relocation & Re-integration Management",
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
    ],
    stats: {
      value: "3,200+",
      label: "Diaspora Families Served",
    },
    metrics: {
      primary: "Zero Remote Fraud",
      secondary: "UK, US, Canada & EU Desks",
    },
    iconName: "Globe2",
  },
];
