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

  const trustStats = [
    { value: "3,200+",   label: "Families Served" },
    { value: "Zero",    label: "Remote Fraud Cases" },
    { value: "100%",    label: "Bank-Guaranteed Escrow" },
    { value: "4",       label: "Global Desks" },
  ];

  return (
    <section id="diaspora" className="py-20 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--brand-blue) 0%, #0a2080 50%, var(--brand-deep) 100%)',
      }}>
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative text-white overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-96 h-96 opacity-5 pointer-events-none" style={{ color: 'var(--brand-gold)' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: 'rgba(253,191,2,0.20)', border: '1px solid rgba(253,191,2,0.40)', color: 'var(--brand-gold)' }}>
                <MapPin className="w-3.5 h-3.5" />
                <span>The Global Diaspora Bridge</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.1] text-white">
                Living Abroad? Build &amp; Invest in Nigeria with{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--gold-gradient-mid), var(--gold-gradient-start))' }}>
                  Absolute Peace of Mind.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Over 3,200 Nigerian professionals and families in the United Kingdom, United States, Canada, Europe, and the Middle East rely on AKOY 360 LIMITED as their trusted institutional counterpart in Nigeria.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {diasporaFeatures.map((feat, i) => (
                  <div key={i}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 transition-colors hover:border-brand-gold/40">
                    <div className="mb-2.5">{feat.icon}</div>
                    <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{feat.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a href="#contact"
                  className="px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  style={{ background: 'linear-gradient(to right, var(--gold-gradient-mid), var(--gold-gradient-start))', color: 'var(--brand-deep)' }}>
                  <span>Book Diaspora Advisory Session</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Dedicated Desks: London · Houston · Toronto · Lagos</span>
                </div>
              </div>
            </div>

            {/* Right: Static Trust Stats Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 shadow-2xl">
                <div className="text-center mb-6 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-black text-sm mb-2"
                    style={{ background: 'rgba(253,191,2,0.20)', border: '1px solid var(--brand-gold)', color: 'var(--brand-gold)' }}>
                    360
                  </div>
                  <h3 className="text-sm font-bold text-white">Trusted by Diaspora Worldwide</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">UK · US · Canada · EU · Middle East</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {trustStats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl text-center" style={{ background: 'rgba(0,16,80,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-2xl font-extrabold" style={{ color: 'var(--brand-gold)' }}>{stat.value}</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-5 text-center">
                  <a href="#contact" className="text-xs font-bold hover:underline" style={{ color: 'var(--brand-gold)' }}>
                    Request a Personalized Diaspora Consultation →
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
