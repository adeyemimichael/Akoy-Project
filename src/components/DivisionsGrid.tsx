import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DIVISIONS_DATA } from "../data/divisions";

export const DivisionsGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredDivisions =
    activeTab === "all"
      ? DIVISIONS_DATA
      : DIVISIONS_DATA.filter((d) => d.id === activeTab);

  return (
    <section id="divisions" className="py-16 sm:py-24 text-white relative overflow-hidden" style={{ background: 'var(--brand-deep)' }}>
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96" style={{ background: 'rgba(233,197,65,0.05)' }} />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,16,80,0.10)' }} />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3" style={{ background: 'rgba(253,191,2,0.15)', border: '1px solid rgba(253,191,2,0.30)', color: 'var(--brand-gold)' }}>
              <span>Umbrella Brand Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              One Company. <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, var(--brand-gold), var(--gold-gradient-start))' }}>Endless Possibilities.</span>
            </h2>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "all"
                  ? "shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
              style={activeTab === "all" ? { background: 'var(--brand-gold)', color: 'var(--brand-deep)', boxShadow: '0 4px 12px rgba(253,191,2,0.20)' } : undefined}
            >
              All 6 Sectors
            </button>
            {DIVISIONS_DATA.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === d.id
                    ? "shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
                style={activeTab === d.id ? { background: 'var(--brand-gold)', color: 'var(--brand-deep)', boxShadow: '0 4px 12px rgba(253,191,2,0.20)' } : undefined}
              >
                {d.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Divisions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {filteredDivisions.map((division) => (
            <Link
              key={division.id}
              to={`/divisions/${division.id}`}
              aria-label={`Explore ${division.name}`}
              className="group relative rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5" style={{ background: '#001050' }}
            >
              {/* Image & Overlay Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={division.image}
                  alt={division.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {division.shortName}
                  </span>
                </div>

                {/* Stat Pill Bottom-Right of Image */}
                <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full text-xs font-black tracking-tight shadow-lg" style={{ background: 'var(--brand-gold)', color: 'var(--brand-deep)' }}>
                  {division.stats.value} {division.stats.label}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white transition-colors" style={{}} onMouseEnter={undefined}>
                    {division.name}
                  </h3>
                  <p className="text-xs font-semibold tracking-wide uppercase mt-1" style={{ color: 'var(--brand-gold)' }}>
                    {division.tagline}
                  </p>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed line-clamp-3">
                    {division.description}
                  </p>

                  {/* Bullet Highlights */}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-white">
                  <span>Explore division</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--brand-gold)' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
