import React from "react";
import {
  ArrowLeft, ArrowUpRight, Mail, Phone,
  PencilRuler, HardHat, ClipboardCheck, Paintbrush2,
  Sofa, Home, Video, CheckCircle2,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { DIVISIONS_DATA } from "../data/divisions";

const WHATSAPP_NUMBER = "2348123456789";

// ─── Construction-specific full service package ───────────────────────────────

const CONSTRUCTION_STAGES = [
  {
    step: "01",
    icon: <PencilRuler className="w-6 h-6" />,
    title: "Architecture & Design",
    description:
      "We begin with a full consultation to understand your vision, lifestyle, and budget. Our in-house architects produce detailed floor plans, 3D renderings, and working drawings — all subject to your approval before a single block is laid.",
    items: [
      "Concept design & feasibility study",
      "3D architectural modeling & visualization",
      "Structural and MEP drawings",
      "Building permit and regulatory approvals",
    ],
  },
  {
    step: "02",
    icon: <HardHat className="w-6 h-6" />,
    title: "Structural Engineering & Civil Works",
    description:
      "Our certified structural engineers handle everything from subsoil investigation to foundation design, reinforced concrete works, block-laying, roofing, and all civil infrastructure on-site.",
    items: [
      "Subsoil investigation & foundation design",
      "Reinforced concrete & block-laying works",
      "Roofing — flat, pitched, or trussed",
      "Drainage, plumbing & civil infrastructure",
    ],
  },
  {
    step: "03",
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: "Project Management & Supervision",
    description:
      "A dedicated project manager oversees your site daily. Diaspora clients receive live video updates, milestone reports, and escrow-based payment releases tied to verified completion stages.",
    items: [
      "Dedicated site project manager",
      "Weekly video progress reports",
      "Milestone-linked escrow payment releases",
      "Quality audits at every critical stage",
    ],
  },
  {
    step: "04",
    icon: <Paintbrush2 className="w-6 h-6" />,
    title: "Interior Finishing",
    description:
      "From tiling and plastering to electrical fittings, plumbing fixtures, and premium paint finishes — we deliver the interior to your exact specification, whether you prefer a contemporary, modern, or traditional aesthetic.",
    items: [
      "Floor & wall tiling (all grades available)",
      "Electrical fittings, switches & lighting",
      "Plumbing fixtures & bathroom installations",
      "Premium interior painting & wall textures",
    ],
  },
  {
    step: "05",
    icon: <Sofa className="w-6 h-6" />,
    title: "Furnishing & Fitting",
    description:
      "For clients who want a truly turnkey delivery, we source and install all furniture, appliances, and soft furnishings — from kitchen cabinets to living room sets — handing you a move-in-ready home.",
    items: [
      "Custom kitchen cabinets & wardrobes",
      "Living, dining & bedroom furniture",
      "Appliances procurement & installation",
      "Curtains, soft furnishings & décor",
    ],
  },
  {
    step: "06",
    icon: <Home className="w-6 h-6" />,
    title: "Airbnb Setup & Rental Management",
    description:
      "For investment properties, we go further. We set up your property for short-term rental on Airbnb and other platforms — professional photography, listing creation, guest management, maintenance, and monthly income remittance.",
    items: [
      "Professional property photography",
      "Airbnb & short-let listing creation & SEO",
      "Guest check-in, cleaning & maintenance",
      "Monthly income reporting & remittance",
    ],
    highlight: true,
  },
];

// ─── Construction Testimonial ──────────────────────────────────────────────────

const CONSTRUCTION_TESTIMONIALS = [
  {
    quote:
      "From Alberta, Canada, I entrusted AKOY 360 Limited with my 5-bedroom all-ensuite duplex in Osogbo, Osun State. From foundation to completion (2024–2025), they delivered to my specifications. I highly recommend AKOY 360 Limited to Nigerians in the diaspora seeking trusted property development professionals back home.",
    name: "Mr. Ogundale Olaide",
    flag: "🇨🇦",
    location: "Alberta, Canada",
    project: "5-Bedroom All-Ensuite Duplex, Osogbo",
  },
  {
    quote:
      "After being dissatisfied with the work of my previous engineer on my rental and Airbnb project at OPIC, near Channels Television, Isheri, Ogun State, I was referred to AKOY 360 Limited to take over project supervision. Their professionalism, attention to detail, and commitment have given me renewed confidence in my investment.",
    name: "Mr. Bernard",
    flag: "🇬🇧",
    location: "Seven Oaks, London",
    project: "Rental & Airbnb Project, OPIC, Isheri",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const DivisionPage: React.FC = () => {
  const { divisionId } = useParams();
  const division = DIVISIONS_DATA.find((item) => item.id === divisionId);

  if (!division) return <Navigate to="/" replace />;

  const isConstruction = divisionId === "construction";

  const whatsappMessage = encodeURIComponent(
    `Hello AKOY 360, I would like to know more about ${division.name}.`,
  );

  return (
    <div className="min-h-screen" style={{ background: '#FAFBFD' }}>
      <div className="mx-auto max-w-[1400px] overflow-hidden bg-white">
        <Navbar />
        <main>
          <section className="mx-auto max-w-[1480px] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8">
            <Link
              to="/#divisions"
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--brand-blue)' }}
            >
              <ArrowLeft className="h-4 w-4" /> All divisions
            </Link>

            {/* Hero image */}
            <div className="h-[300px] overflow-hidden rounded-2xl bg-slate-100 sm:h-[420px] sm:rounded-3xl lg:h-[500px]">
              <img
                src={division.image}
                alt={division.shortName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Title block */}
            <div className="border-b border-slate-200 py-7 sm:py-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] sm:text-sm" style={{ color: 'var(--brand-gold)' }}>
                {division.tagline}
              </p>
              <h1 className="mt-2 max-w-4xl font-display text-3xl font-extrabold leading-tight sm:text-5xl" style={{ color: 'var(--brand-deep)' }}>
                {division.headline}
              </h1>
            </div>

            {/* Description + metrics */}
            <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <div>
                <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
                  {division.description}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="border-l-2 pl-4" style={{ borderColor: 'var(--brand-gold)' }}>
                    <p className="font-display text-2xl font-extrabold sm:text-3xl" style={{ color: 'var(--brand-deep)' }}>
                      {division.stats.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">{division.stats.label}</p>
                  </div>
                  <div className="border-l-2 pl-4" style={{ borderColor: 'var(--brand-gold)' }}>
                    <p className="font-display text-lg font-bold sm:text-xl" style={{ color: 'var(--brand-deep)' }}>
                      {division.metrics.primary}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">{division.metrics.secondary}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl" style={{ color: 'var(--brand-deep)' }}>
                  Services
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {division.bulletPoints.map((item) => (
                    <li key={item} className="border-t border-slate-200 py-3 text-sm leading-relaxed text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Construction-only: Full Service Package ──────────────── */}
            {isConstruction && (
              <>
                {/* Section header */}
                <div className="border-t border-slate-200 pt-12 sm:pt-16 mb-10">
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ background: 'rgba(0,16,80,0.06)', border: '1px solid rgba(0,16,80,0.14)', color: 'var(--brand-deep)' }}
                  >
                    The Complete Package
                  </div>
                  <h2 className="font-display text-2xl font-extrabold sm:text-4xl" style={{ color: 'var(--brand-deep)' }}>
                    We Handle Every Stage —{" "}
                    <span
                      className="text-transparent bg-clip-text"
                      style={{ backgroundImage: 'linear-gradient(to right, var(--brand-gold), var(--gold-gradient-end))' }}
                    >
                      From Blueprint to Airbnb.
                    </span>
                  </h2>
                  <p className="mt-3 text-slate-500 max-w-2xl text-sm sm:text-base">
                    Whether you're building from scratch, renovating, or setting up a rental investment — AKOY 360 Construction manages every phase so you don't have to.
                  </p>
                </div>

                {/* Stage cards */}
                <div className="space-y-5">
                  {CONSTRUCTION_STAGES.map((stage, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl border overflow-hidden ${stage.highlight ? "" : "border-slate-100"}`}
                      style={stage.highlight
                        ? { border: '1px solid rgba(253,191,2,0.35)', background: 'rgba(253,191,2,0.03)' }
                        : undefined}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] gap-0">
                        {/* Step number + icon */}
                        <div
                          className="flex sm:flex-col items-center sm:items-start gap-3 px-5 py-5 sm:px-6 sm:py-6 sm:min-w-[120px]"
                          style={{ background: stage.highlight ? 'var(--brand-gold)' : 'var(--brand-deep)' }}
                        >
                          <span
                            className="text-3xl font-extrabold font-display leading-none"
                            style={{ color: stage.highlight ? 'var(--brand-deep)' : 'rgba(255,255,255,0.25)' }}
                          >
                            {stage.step}
                          </span>
                          <div style={{ color: stage.highlight ? 'var(--brand-deep)' : 'var(--brand-gold)' }}>
                            {stage.icon}
                          </div>
                          <p
                            className="text-xs font-bold uppercase tracking-wider sm:mt-2"
                            style={{ color: stage.highlight ? 'var(--brand-deep)' : 'rgba(255,255,255,0.6)' }}
                          >
                            {stage.highlight ? "Optional Add-on" : `Stage ${stage.step}`}
                          </p>
                        </div>

                        {/* Title + description */}
                        <div className="px-5 py-5 sm:px-6 sm:py-6 border-b sm:border-b-0 sm:border-r border-slate-100">
                          <h3 className="font-display text-lg font-bold" style={{ color: 'var(--brand-deep)' }}>
                            {stage.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        {/* Bullet items */}
                        <div className="px-5 py-5 sm:px-6 sm:py-6">
                          <ul className="space-y-2">
                            {stage.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle2
                                  className="w-4 h-4 shrink-0 mt-0.5"
                                  style={{ color: stage.highlight ? 'var(--brand-gold)' : 'var(--brand-blue)' }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Diaspora live tracking callout */}
                <div
                  className="mt-10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:items-center"
                  style={{ background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-deep))', border: '1px solid rgba(253,191,2,0.2)' }}
                >
                  <Video className="w-10 h-10 shrink-0" style={{ color: 'var(--brand-gold)' }} />
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg font-display">Building from Abroad?</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      Diaspora clients receive weekly live video feeds from site, milestone-linked escrow payments, and a dedicated project manager reachable on WhatsApp — so you stay in control from anywhere in the world.
                    </p>
                  </div>
                  <a
                    href="/#contact"
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
                    style={{ background: 'var(--brand-gold)', color: 'var(--brand-deep)' }}
                  >
                    Start Your Project <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Construction testimonials */}
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-extrabold mb-6" style={{ color: 'var(--brand-deep)' }}>
                    What Our Clients Say
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {CONSTRUCTION_TESTIMONIALS.map((t, idx) => (
                      <div key={idx} className="rounded-2xl p-6 border border-slate-100 bg-slate-50">
                        <p className="text-sm text-slate-600 leading-relaxed italic">"{t.quote}"</p>
                        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                            style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
                          >
                            {t.flag}
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: 'var(--brand-deep)' }}>{t.name}</p>
                            <p className="text-xs text-slate-400">{t.location}</p>
                            <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--brand-gold)' }}>{t.project}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Gallery */}
            <section aria-labelledby="gallery-title" className="border-t border-slate-200 pt-8 mt-10 sm:pt-10">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--brand-gold)' }}>
                  {division.shortName}
                </p>
                <h2 id="gallery-title" className="mt-1 font-display text-2xl font-extrabold sm:text-3xl" style={{ color: 'var(--brand-deep)' }}>
                  Work gallery
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {division.galleryImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${division.shortName} gallery image ${index + 1}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </section>

            {/* CTA strip */}
            <section
              className="mt-10 flex flex-col gap-5 rounded-2xl p-5 text-white sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              style={{ background: 'var(--brand-deep)' }}
            >
              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">Start a conversation</h2>
                <p className="mt-1 text-sm text-slate-300">Contact our {division.shortName} team.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#1fb85a]"
                >
                  WhatsApp <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="tel:+2348123456789" aria-label="Call AKOY 360"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
                  <Phone className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:contact@akoy360.com?subject=${encodeURIComponent(division.shortName + " inquiry")}`}
                  aria-label="Email AKOY 360"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DivisionPage;
