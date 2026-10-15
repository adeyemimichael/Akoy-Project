import React from "react";
import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { DIVISIONS_DATA } from "../data/divisions";

const WHATSAPP_NUMBER = "2348123456789";

const DivisionPage: React.FC = () => {
  const { divisionId } = useParams();
  const division = DIVISIONS_DATA.find((item) => item.id === divisionId);

  if (!division) return <Navigate to="/" replace />;

  const whatsappMessage = encodeURIComponent(
    `Hello AKOY 360, I would like to know more about ${division.name}.`,
  );

  return (
    <div className="min-h-screen px-4 py-6 lg:px-8" style={{ background: '#FAFBFD' }}>
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl border border-gray-100 bg-white">
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

            <div className="relative h-[360px] overflow-hidden rounded-2xl sm:h-[480px] sm:rounded-3xl lg:h-[580px]" style={{ background: 'var(--brand-deep)' }}>
              <img
                src={division.image}
                alt={division.shortName}
                className="h-full w-full object-cover"
              />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(9,24,79,0.9), rgba(9,24,79,0.1), transparent)' }} />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFE276] sm:text-sm">
                  {division.tagline}
                </p>
                <h1 className="mt-2 max-w-4xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">
                  {division.headline}
                </h1>
              </div>
            </div>

            <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <div>
                <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
                  {division.description}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="border-l-2 border-[#E9C541] pl-4">
                    <p className="font-display text-2xl font-extrabold sm:text-3xl" style={{ color: 'var(--brand-blue)' }}>
                      {division.stats.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      {division.stats.label}
                    </p>
                  </div>
                  <div className="border-l-2 border-[#E9C541] pl-4">
                    <p className="font-display text-lg font-bold sm:text-xl" style={{ color: 'var(--brand-blue)' }}>
                      {division.metrics.primary}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      {division.metrics.secondary}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl" style={{ color: 'var(--brand-blue)' }}>
                  Services
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {division.bulletPoints.map((item) => (
                    <li
                      key={item}
                      className="border-t border-slate-200 py-3 text-sm leading-relaxed text-slate-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section aria-labelledby="division-gallery-title" className="border-t border-slate-200 pt-8 sm:pt-10">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A98210]">
                    {division.shortName}
                  </p>
                  <h2 id="division-gallery-title" className="mt-1 font-display text-2xl font-extrabold sm:text-3xl" style={{ color: 'var(--brand-blue)' }}>
                    Work gallery
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {division.galleryImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${division.shortName} gallery image ${index + 1}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </section>

            <section className="mt-10 flex flex-col gap-5 rounded-2xl p-5 text-white sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:p-8" style={{ background: 'var(--brand-blue)' }}>
              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Start a conversation
                </h2>
                <p className="mt-1 text-sm text-blue-100">
                  Contact our {division.shortName} team.
                </p>
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
                <a
                  href="tel:+2348123456789"
                  aria-label="Call AKOY 360"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:contact@akoy360.com?subject=${encodeURIComponent(division.shortName + " inquiry")}`}
                  aria-label="Email AKOY 360"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
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