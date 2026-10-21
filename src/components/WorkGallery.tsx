import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DIVISIONS_DATA } from "../data/divisions";

export const WorkGallery: React.FC = () => (
  <section id="work" className="bg-white py-14 sm:py-20">
    <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--brand-gold)' }}>
            Across our divisions
          </p>
          <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--brand-blue)' }}>
            See our work
          </h2>
        </div>
        <a
          href="#divisions"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold transition-colors hover:text-brand-gold"
          style={{ color: 'var(--brand-blue)' }}
        >
          All divisions <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {DIVISIONS_DATA.map((division) => (
          <Link
            key={division.id}
            to={`/divisions/${division.id}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ background: 'var(--brand-deep)' }}
        >
            <img
              src={division.galleryImages[0]}
              alt={`${division.shortName} work`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white sm:p-5">
              <span className="text-sm font-bold sm:text-lg drop-shadow-md">{division.shortName}</span>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 drop-shadow-md" style={{ color: 'var(--brand-gold)' }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);