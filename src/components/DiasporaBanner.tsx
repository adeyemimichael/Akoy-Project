import React from "react";
import { ShieldCheck, Video, FileCheck, ArrowUpRight, Lock, MapPin } from "lucide-react";

export const DiasporaBanner: React.FC = () => {
  const diasporaFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5" style={{ color: 'var(--brand-gold)' }} />,
      title: "Zero Remote Fraud",
      desc: "Contractual milestones with verified legal escrow—no disappearing funds or unaccounted expenses.",
    },
    {
      icon: <Video className="w-5 h-5" style={{ color: 'var(--brand-gold)' }} />,
      title: "Live Milestone Telemetry",
      desc: "High-definition weekly drone & camera feeds directly to your portal for ongoing construction and property builds.",
    },
    {
      icon: <FileCheck className="w-5 h-5" style={{ color: 'var(--brand-gold)' }} />,
      title: "Verified Land & Title Perfection",
      desc: "Registry vetting with Lagos State Lands Bureau and Federal registries before a single naira is committed.",
    },
    {
      icon: <Lock className="w-5 h-5" style={{ color: 'var(--brand-gold)' }} />,
      title: "Corporate Fiduciary Duty",
      desc: "You deal directly with an institutional registered company (AKOY 360 LIMITED), not third-party middlemen.",
    },
  ];

  return (
    <section id="diaspora" className="py-20 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--brand-blue) 0%, #0a2080 50%, var(--brand-deep) 100%)',
      }}>
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative text-white overflow-hidden">
          {/* Subtle watermark logo pattern */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 opacity-5 pointer-events-none" style={{ color: 'var(--brand-gold)' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: 'rgba(253,191,2,0.20)', border: '1px solid rgba(253,191,2,0.40)', color: 'var(--brand-gold)' }}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>The Global Diaspora Bridge</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.1] text-white">
                Living Abroad? Build &amp; Invest in Nigeria with{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--gold-gradient-mid), var(--gold-gradient-start))' }}
                >
                  Absolute Peace of Mind.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Over 3,200 Nigerian professionals and families in the United Kingdom, United States, Canada, Europe, and the Middle East rely on AKOY 360 LIMITED as their trusted institutional counterpart in Nigeria.
              </p>

              {/* 2x2 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {diasporaFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 transition-colors"
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(253,191,2,0.40)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = ''; }}
                  >
                    <div className="mb-2.5">{feat.icon}</div>
                    <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{feat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  style={{
                    background: 'linear-gradient(to right, var(--gold-gradient-mid), var(--gold-gradient-start))',
                    color: 'var(--brand-deep)'
                  }}
                >
                  <span>Book Diaspora Advisory Session</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Dedicated Desks: London · Houston · Toronto · Lagos</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Card / Visual Portal */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                      style={{ background: 'rgba(253,191,2,0.20)', border: '1px solid var(--brand-gold)', color: 'var(--brand-gold)' }}
                    >
                      360
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Live Project Tracker</div>
                      <div className="text-[11px] text-slate-400">Diaspora Portal Demo</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                    Milestone 4/6 Active
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl border border-white/10" style={{ background: 'rgba(0,16,80,0.7)' }}>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Roofing &amp; Structural Concrete</span>
                      <span className="font-bold" style={{ color: 'var(--brand-gold)' }}>85% Completed</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full w-[85%]" style={{ background: 'var(--brand-gold)' }} />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
                      <span>Verified by Lead Structural Engr.</span>
                      <span className="text-slate-300">Updated 2 hours ago</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl border border-white/10" style={{ background: 'rgba(0,16,80,0.7)' }}>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Escrow Account</div>
                      <div className="text-base font-extrabold text-white mt-0.5">Secure Escrow</div>
                      <div className="text-[10px] text-emerald-400 mt-1">Bank Guaranteed</div>
                    </div>
                  <div className="p-3.5 rounded-2xl border border-white/10" style={{ background: 'rgba(0,16,80,0.7)' }}>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Drone Telemetry</div>
                      <div className="text-base font-extrabold text-white mt-0.5">4K Video Ready</div>
                      <div className="text-[10px] mt-1" style={{ color: 'var(--brand-gold)' }}>View Telemetry Feed</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="#contact"
                    className="text-xs font-bold hover:underline"
                    style={{ color: 'var(--brand-gold)' }}
                  >
                    Request a Personalized Diaspora Client Portal →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
