import React from "react";
import { Star, Quote } from "lucide-react";

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
    name: "Pastor Kunle Kayode",
    title: "Client",
    location: "Ireland",
    division: "Diaspora & Construction",
    rating: 5,
    quote:
      "In 2023, while living in Ireland, I chose AKOY 360 Limited to build my mother's house in Odo-Eri, Kogi State. Their professionalism, reliability and commitment gave me peace of mind throughout the project. Pleased with their service, I entrusted them with my ongoing family holiday home project in Osogbo, Osun State. I highly recommend AKOY 360 Limited to Nigerians abroad looking for dependable property development, project supervision and property management services.",
    initials: "KK",
  },
  {
    id: 2,
    name: "Mr. Ogundale Olaide",
    title: "Client",
    location: "Alberta, Canada 🇨🇦",
    division: "Construction",
    rating: 5,
    quote:
      "From Alberta, Canada, I entrusted AKOY 360 Limited with my 5-bedroom all-ensuite duplex in Osogbo, Osun State. From foundation to completion (2024–2025), they delivered to my specifications. I highly recommend AKOY 360 Limited to Nigerians in the diaspora seeking trusted property development professionals back home.",
    initials: "OO",
  },
  {
    id: 3,
    name: "Mr. Bernard",
    title: "Property Investor",
    location: "Seven Oaks, London 🇬🇧",
    division: "Construction & Airbnb",
    rating: 5,
    quote:
      "After being dissatisfied with the work of my previous engineer on my rental and Airbnb project at OPIC, near Channels Television, Isheri, Ogun State, I was referred to AKOY 360 Limited to take over project supervision. Their professionalism, attention to detail, and commitment have given me renewed confidence in my investment. I recommend AKOY 360 Limited to property owners in Nigeria and the diaspora seeking reliable project supervision and property development services.",
    initials: "MB",
  },
];

const ITEMS_PER_PAGE = 3;

export const TestimonialsSection: React.FC = () => {
  const visible = TESTIMONIALS;

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

      </div>
    </section>
  );
};
