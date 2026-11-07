import React from "react";
import { Star, Quote, ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTestimonials, useReveal } from "../hooks";

const TestimonialsPage: React.FC = () => {
  const { testimonials, loading } = useTestimonials({ publishedOnly: true });
  const sectionRef = useReveal<HTMLElement>();

  return (
    <div className="min-h-screen" style={{ background: '#FAFBFD' }}>
      <div className="max-w-auto mx-auto bg-white overflow-hidden transition-all">
        <Navbar />

        <main>
          {/* Hero Banner */}
          <section
            className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
            style={{ background: 'var(--brand-deep)' }}
          >
            {/* Subtle decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(to right, transparent, var(--brand-gold), transparent)' }} />
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-[0.04]" style={{ background: 'var(--brand-gold)' }} />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: 'var(--brand-blue)' }} />

            <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>

              <div className="max-w-3xl">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                  style={{ background: 'rgba(253,191,2,0.15)', border: '1px solid rgba(253,191,2,0.35)', color: 'var(--brand-gold)' }}
                >
                  <span>Client Testimonials</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
                  Real Stories from{" "}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(to right, var(--gold-gradient-mid), var(--gold-gradient-start))' }}
                  >
                    Real Clients.
                  </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  From Lagos to London, Houston to Dublin — Nigerians at home and across the diaspora trust AKOY 360 LIMITED to deliver on their most important property and construction projects. Here's what they have to say.
                </p>

                {/* Stats bar */}
                <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-10 text-sm">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-display" style={{ color: 'var(--brand-gold)' }}>3,200+</span>
                    <p className="text-xs text-slate-400 mt-0.5">Families Served</p>
                  </div>
                  <div className="w-px h-10 bg-white/10 hidden sm:block" />
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-display" style={{ color: 'var(--brand-gold)' }}>5.0</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" style={{ color: 'var(--brand-gold)' }} />
                      ))}
                      <span className="text-xs text-slate-400 ml-1">Average Rating</span>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10 hidden sm:block" />
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-display" style={{ color: 'var(--brand-gold)' }}>Zero</span>
                    <p className="text-xs text-slate-400 mt-0.5">Remote Fraud Cases</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Grid */}
          <section ref={sectionRef} className="py-16 sm:py-24" style={{ background: '#F4F6F9' }}>
            <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-3xl bg-white border animate-pulse h-80"
                      style={{ borderColor: 'rgba(0,16,80,0.08)' }}
                    />
                  ))}
                </div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-20">
                  <Quote className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                  <p className="text-lg font-semibold text-slate-500">No testimonials yet.</p>
                  <p className="text-sm text-slate-400 mt-1">Check back soon — our clients are amazing.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {testimonials.map((t, idx) => (
                    <div
                      key={t.id}
                      className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 bg-white border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl reveal ${idx < 3 ? `stagger-${idx + 1}` : ''}`}
                      style={{ borderColor: 'rgba(0,16,80,0.08)', boxShadow: '0 2px 20px rgba(0,16,80,0.06)' }}
                    >
                      {/* Quote watermark */}
                      <Quote
                        className="absolute top-6 right-6 w-10 h-10 opacity-[0.06]"
                        style={{ color: 'var(--brand-deep)' }}
                      />

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-5">
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
                      <div className="my-6 h-px" style={{ background: 'rgba(0,16,80,0.07)' }} />

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                          style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
                        >
                          {t.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold truncate" style={{ color: 'var(--brand-deep)' }}>
                            {t.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{t.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" style={{ color: 'var(--brand-gold)' }} />
                            <p className="text-xs truncate" style={{ color: 'var(--brand-gold)' }}>
                              {t.location}
                            </p>
                          </div>
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
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2
                className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight"
                style={{ color: 'var(--brand-deep)' }}
              >
                Ready to Start Your{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--brand-gold), var(--gold-gradient-end))' }}
                >
                  Own Success Story?
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
                Join thousands of satisfied clients. Whether you're building from abroad, investing in property, or need trusted on-ground execution — we're ready.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/#contact"
                  className="px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(to right, var(--gold-gradient-mid), var(--gold-gradient-start))',
                    color: 'var(--brand-deep)',
                  }}
                >
                  Book a Free Consultation
                </Link>
                <Link
                  to="/#divisions"
                  className="px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider border-2 transition-all hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--brand-deep)', color: 'var(--brand-deep)' }}
                >
                  Explore Our Divisions
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default TestimonialsPage;
