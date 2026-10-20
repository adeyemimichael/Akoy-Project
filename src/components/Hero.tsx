import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { DIVISIONS_DATA, type DivisionItem } from "../data/divisions";

interface HeroProps {
  onDivisionSelect?: (division: DivisionItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ onDivisionSelect }) => {
  const [selectedDivisionIndex, setSelectedDivisionIndex] = useState(0);
  const activeDivision = DIVISIONS_DATA[selectedDivisionIndex];

  const handleSelectDivision = (index: number) => {
    setSelectedDivisionIndex(index);
    if (onDivisionSelect) {
      onDivisionSelect(DIVISIONS_DATA[index]);
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden px-4 pb-10 pt-3 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex items-end justify-between gap-4 pb-4 sm:pb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs" style={{ color: 'var(--brand-blue)' }}>
              AKOY 360 LIMITED
            </p>
            <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-4xl" style={{ color: 'var(--brand-blue)' }}>
              One vision. <span style={{ color: 'var(--brand-gold)' }}>360° possibilities.</span>
            </h1>
          </div>
          <a href="#divisions" aria-label="Explore business divisions" className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors sm:h-12 sm:w-12" style={{ background: 'var(--brand-blue)' }}>
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div className="relative">
          <div className="group relative h-[360px] w-full overflow-hidden rounded-2xl shadow-xl sm:h-[480px] sm:rounded-3xl lg:h-[600px]" style={{ background: 'var(--brand-deep)' }}>
            <img
              key={activeDivision.id}
              src={activeDivision.image}
              alt={activeDivision.name}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,16,80,0.75), rgba(0,16,80,0.10), transparent)' }} />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div className="min-w-0 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] sm:text-sm" style={{ color: 'var(--brand-gold)' }}>
                  {activeDivision.shortName}
                </p>
                <h2 className="mt-1 max-w-2xl font-display text-xl font-bold leading-tight sm:text-3xl">
                  {activeDivision.tagline}
                </h2>
              </div>
              <a
                href={`/divisions/${activeDivision.id}`}
                aria-label={`Explore ${activeDivision.name}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full transition-transform hover:scale-105 sm:h-12 sm:w-12"
                style={{ background: 'var(--brand-gold)', color: 'var(--brand-deep)' }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Thumbnail grid: 2-col on mobile → 3-col on sm → 6-col on md+ */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-3 md:grid-cols-6 sm:gap-3">
          {DIVISIONS_DATA.map((division, idx) => {
            const isCurrent = selectedDivisionIndex === idx;
            return (
              <button
                key={division.id}
                onClick={() => handleSelectDivision(idx)}
                aria-label={`Show ${division.name}`}
                aria-pressed={isCurrent}
                className={`group relative aspect-[4/3] overflow-hidden rounded-lg border transition-all duration-200 sm:aspect-[16/9] ${
                  isCurrent
                    ? "ring-2"
                    : "border-white hover:border-white/70"
                }`}
                style={isCurrent ? { borderColor: 'var(--brand-gold)', boxShadow: '0 0 0 2px rgba(253,191,2,0.4)' } : undefined}
              >
                <img src={division.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 truncate px-2 pb-1.5 pt-4 text-left text-[10px] font-semibold text-white sm:px-3 sm:pb-2 sm:text-xs" style={{ background: 'linear-gradient(to top, rgba(0,16,80,0.90), transparent)' }}>
                  {division.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
