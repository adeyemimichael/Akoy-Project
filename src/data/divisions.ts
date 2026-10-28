import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.jpeg";
import img6 from "../assets/6.jpeg";
import img7 from "../assets/7.jpeg";
import img8 from "../assets/8.jpeg";
import img9 from "../assets/9.jpeg";
import img10 from "../assets/10.jpeg";
import img11 from "../assets/11.jpeg";
import img12 from "../assets/12.jpeg";
import img13 from "../assets/13.jpeg";
import img14 from "../assets/14.jpeg";
import img15 from "../assets/15.jpeg";
import img16 from "../assets/16.jpeg";
import img17 from "../assets/17.jpeg";
import img18 from "../assets/18.jpeg";
import img19 from "../assets/19.jpeg";
import img20 from "../assets/20.jpeg";
import img21 from "../assets/21.jpeg";
import img22 from "../assets/22.jpeg";
import img23 from "../assets/23.jpeg";
import img24 from "../assets/24.jpeg";
import img25 from "../assets/25.jpeg";
import img26 from "../assets/26.jpeg";
import img28 from "../assets/28.jpeg";
import img29 from "../assets/29.jpeg";
import img30 from "../assets/30.jpeg";
import img31 from "../assets/31.jpeg";
import img37 from "../assets/37.jpeg";
import vid1 from "../assets/vid1.mp4";
import vid2 from "../assets/vid2.mp4";
import vid3 from "../assets/vid3.mp4";
import vid4 from "../assets/vid4.mp4";
import vid5 from "../assets/vid5.mp4";
import vid6 from "../assets/vid6.mp4";
import vid7 from "../assets/vid7.mp4";

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
  videos: string[];
  stats: {
    label: string;
    value: string;
  };
  metrics: {
    primary: string;
    secondary: string;
  };
  iconName: string;
  /** Search keywords used by the navbar search */
  searchTags: string[];
}

export const DIVISIONS_DATA: DivisionItem[] = [
  {
    id: "properties",
    name: "AKOY 360 Properties",
    shortName: "Properties",
    tagline: "Prime Real Estate & Developments",
    headline: "Premium Residential & Commercial Property Assets",
    description:
      "Delivering landmark residential developments, commercial hubs, high-yield acquisitions, and full-cycle property management tailored for discerning local and global investors. Includes Airbnb-ready investment properties with end-to-end rental management.",
    bulletPoints: [
      "Luxury Residential & Waterfront Developments",
      "Commercial Property Acquisition & Leasing",
      "Diaspora Property Search & Title Verification",
      "Airbnb-Ready Investment Properties & Rental Management",
    ],
    image: img1,
    galleryImages: [img2, img3, img4, img5, img6, img7],
    videos: [vid5, vid6],
    stats: {
      value: "₦45B+",
      label: "Portfolio Managed",
    },
    metrics: {
      primary: "180+ Luxury Units",
      secondary: "100% Verified Titles",
    },
    iconName: "Building2",
    searchTags: [
      "property", "real estate", "house", "home", "land", "duplex", "bungalow",
      "apartment", "flat", "villa", "mansion", "commercial", "office", "retail",
      "title verification", "acquisition", "leasing", "airbnb", "rental",
      "investment", "waterfront", "residential",
    ],
  },
  {
    id: "construction",
    name: "AKOY 360 Construction",
    shortName: "Construction",
    tagline: "Engineering & Turnkey Projects",
    headline: "From Architecture to Handover — We Build It All",
    description:
      "We provide the complete construction package: architecture and design, structural engineering, civil works, project management, interior finishing, furnishing, and optional Airbnb setup. Every step handled in-house with world-class engineering standards and live milestone tracking for diaspora clients.",
    bulletPoints: [
      "Architecture, Design & 3D Modeling",
      "Structural Engineering & Civil Works",
      "Site Supervision & Quality Assurance Audits",
      "Interior Finishing, Furnishing & Airbnb Setup",
      "Diaspora Remote Build Tracking with Live Telemetry",
    ],
    image: img8,
    galleryImages: [img9, img10, img11, img12, img13, img14, img15, img16],
    videos: [vid1, vid2, vid3, vid4],
    stats: {
      value: "99.4%",
      label: "On-Time Completion",
    },
    metrics: {
      primary: "45+ Active Sites",
      secondary: "ISO Certified Standards",
    },
    iconName: "HardHat",
    searchTags: [
      "construction", "building", "build", "architecture", "design", "engineering",
      "duplex", "bungalow", "house", "foundation", "roofing", "framing", "concrete",
      "civil works", "interior", "finishing", "furnishing", "turnkey", "contractor",
      "site supervision", "project management", "renovation", "remodel",
    ],
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
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
    ],
    videos: [],
    stats: {
      value: "140+",
      label: "Global Destinations",
    },
    metrics: {
      primary: "24/7 Concierge",
      secondary: "99.8% Client Satisfaction",
    },
    iconName: "Plane",
    searchTags: [
      "travel", "flight", "ticket", "visa", "tour", "tourism", "vacation",
      "holiday", "charter", "private jet", "yacht", "corporate travel",
      "concierge", "expedition", "homecoming", "diaspora travel",
    ],
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
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
    ],
    videos: [],
    stats: {
      value: "250K+",
      label: "Tons Delivered",
    },
    metrics: {
      primary: "48-72h Express Air",
      secondary: "Real-Time GPS Tracking",
    },
    iconName: "Ship",
    searchTags: [
      "logistics", "cargo", "freight", "shipping", "delivery", "courier",
      "customs", "port", "air cargo", "sea freight", "supply chain",
      "cold chain", "cross-border", "door to door", "warehouse", "storage",
    ],
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    ],
    videos: [],
    stats: {
      value: "₦12B+",
      label: "Procurement Facilitated",
    },
    metrics: {
      primary: "120+ Corporate Clients",
      secondary: "Tier-1 Vendor Network",
    },
    iconName: "Briefcase",
    searchTags: [
      "business", "procurement", "consulting", "advisory", "compliance",
      "tender", "government", "contract", "vendor", "supply chain",
      "corporate", "equipment", "startup", "regulatory", "agency",
    ],
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
    image: img17,
    galleryImages: [img18, img19, img20, img21, img22, img23],
    videos: [vid7],
    stats: {
      value: "3,200+",
      label: "Diaspora Families Served",
    },
    metrics: {
      primary: "Zero Remote Fraud",
      secondary: "UK, US, Canada & EU Desks",
    },
    iconName: "Globe2",
    searchTags: [
      "diaspora", "abroad", "remote", "escrow", "trust", "fiduciary",
      "family care", "relocation", "returnee", "investment abroad",
      "nigeria from abroad", "overseas", "expatriate", "nri",
      "video monitoring", "telemetry", "land acquisition",
    ],
  },
];
