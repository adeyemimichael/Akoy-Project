import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  location: string;
  division: string;
  rating: number;
  quote: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Adebayo Okonkwo",
    title: "Medical Consultant",
    location: "Houston, Texas — USA",
    division: "Diaspora Gateway",
    rating: 5,
    quote:
      "I had been burned twice by agents who disappeared with my money. AKOY 360 was different — every naira was in escrow, and I watched my duplex go from foundation to roofing via live drone feeds. I didn't step foot in Nigeria once. Absolutely remarkable.",
    initials: "AO",
  },
  {
    id: 2,
    name: "Mrs. Funmilayo Adeyemi",
    title: "Finance Director",
    location: "London, United Kingdom",
    division: "Properties",
    rating: 5,
    quote:
      "Finding a verified property in Lagos from London used to feel impossible. AKOY 360 Properties handled title verification, negotiation, and transfer documentation end-to-end. I signed everything remotely with full legal backing. World-class service.",
    initials: "FA",
  },
  {
    id: 3,
    name: "Engr. Chukwuemeka Eze",
    title: "CEO, Eze Industrial Group",
    location: "Lagos, Nigeria",
    division: "Construction",
    rating: 5,
    quote:
      "We contracted AKOY 360 Construction for our 12-floor commercial hub in Victoria Island. Their site supervision, quality audits, and milestone reporting were impeccable. Delivered on time and within budget. We've already signed them for our next project.",
    initials: "CE",
  },
  {
    id: 4,
    name: "Ms. Kemi Oduya",
    title: "Trade & Import Entrepreneur",
    location: "Toronto, Canada",
    division: "Logistics & Shipping",
    rating: 5,
    quote:
      "I ship goods from Canada to Nigeria monthly. Since partnering with AKOY 360 Logistics, my customs clearance stress is gone. Real-time GPS tracking, door-to-door delivery, zero lost cargo. They've completely transformed my supply chain.",
    initials: "KO",
  },
  {
    id: 5,
    name: "Alhaji Musa Tanko",
    title: "Government Procurement Officer",
    location: "Abuja, Nigeria",
    division: "Business Services",
    rating: 5,
    quote:
      "AKOY 360 Business Services helped us navigate a complex government tender and connected us to Tier-1 industrial vendors. Their regulatory advisory saved us months of paperwork. A trusted institutional partner for serious corporate work.",
    initials: "MT",
  },
  {
    id: 6,
    name: "Mr. Seun Bankole",
    title: "Tech Executive",
    location: "Dubai, UAE",
    division: "Travel & Tourism",
    rating: 5,
    quote:
      "I travel for business constantly across Africa, Europe, and the Gulf. AKOY 360 Travel manages all my corporate ticketing, visa advisory, and VIP protocols. Having a 24/7 concierge that actually picks up the phone is priceless.",
    initials: "SB",
  },
];

const ITEMS_PER_PAGE = 3;

export const TestimonialsSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(TESTIMONIALS.length / ITEMS_PER_PAGE);
  const visible = TESTIMONIALS.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section id="testimonials" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: '#F4F6F9' }}>
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,16,80,0.10), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,16,80,0.10), transparent)' }} />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
              style={{ background: 'rgba(3,33,155,0.06)', border: '1px solid rgba(3,33,155,0.14)', color: 'var(--brand-blue)' }}
            >
              <span>Client Testimonials</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-[1.1]"
              style={{ color: 'var(--brand-deep)' }}
            >
              Trusted by Clients{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, var(--gold-gradient-mid), var(--gold-gradient-end))' }}
              >
                Across the Globe.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed">
              From Lagos to London, Houston to Dubai — here's what our clients say about working with AKOY 360 LIMITED.
            </p>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Previous testimonials"
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: 'rgba(0,16,80,0.18)', color: 'var(--brand-deep)' }}
              onMouseEnter={e => {
                if (page !== 0) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-deep)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand-deep)';
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--brand-deep)' }}>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              aria-label="Next testimonials"
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: 'rgba(0,16,80,0.18)', color: 'var(--brand-deep)' }}
              onMouseEnter={e => {
                if (page !== totalPages - 1) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-deep)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand-deep)';
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((t) => (
            <div
              key={t.id}
              className="relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 bg-white border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: 'rgba(0,16,80,0.08)', boxShadow: '0 2px 20px rgba(0,16,80,0.06)' }}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-6 right-6 w-8 h-8 opacity-10"
                style={{ color: 'var(--brand-deep)' }}
              />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                    style={{ color: 'var(--brand-gold)' }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="my-5 h-px" style={{ background: 'rgba(0,16,80,0.07)' }} />

              {/* Author row */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--brand-deep)' }}>
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{t.title}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--brand-gold)' }}>
                    {t.location}
                  </p>
                </div>
                {/* Division badge */}
                <span
                  className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                  style={{ background: 'rgba(0,16,80,0.06)', color: 'var(--brand-blue)', border: '1px solid rgba(0,16,80,0.10)' }}
                >
                  {t.division}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === page ? '24px' : '8px',
                height: '8px',
                background: i === page ? 'var(--brand-gold)' : 'rgba(0,16,80,0.18)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
