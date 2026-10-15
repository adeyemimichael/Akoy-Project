import React from "react";
import { CheckCircle2, TrendingUp, Shield, Award } from "lucide-react";

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: "Corporate Governance",
      desc: "Institutional controls and transparent legal documentation underpinning every transaction.",
      icon: <Shield className="w-5 h-5 text-[#E9C541]" />,
    },
    {
      title: "Multi-Disciplinary Scale",
      desc: "Cross-functional synergy allowing real estate, logistics, procurement, and travel to operate as a frictionless ecosystem.",
      icon: <TrendingUp className="w-5 h-5 text-[#E9C541]" />,
    },
    {
      title: "Prestige & Execution",
      desc: "Uncompromising standards in materials, logistics velocity, and bespoke VIP customer service.",
      icon: <Award className="w-5 h-5 text-[#E9C541]" />,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F4F6F9] relative overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 h-[480px] sm:h-[540px]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="AKOY 360 Corporate HQ"
                className="w-full h-full object-cover"
              />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,43,140,0.9), transparent)' }} />

              {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white" style={{ color: 'var(--brand-blue)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E9C541]">
                      The 360° Advantage
                    </span>
                  <h3 className="text-lg font-bold font-display mt-0.5" style={{ color: 'var(--brand-blue)' }}>
                      Unified Conglomerate Model
                    </h3>
                  </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs" style={{ background: 'var(--brand-blue)', color: 'var(--brand-gold)' }}>
                    360°
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Eliminating fragmented vendors. We act as your sole, accountable partner across high-value commerce.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: 'rgba(20,43,140,0.05)', border: '1px solid rgba(20,43,140,0.15)', color: 'var(--brand-blue)' }}>
              <span>Corporate Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-[1.15]" style={{ color: 'var(--brand-blue)' }}>
              Connecting Opportunities.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9C541] to-[#C89D12]">
                Delivering Solutions.
              </span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              <strong>AKOY 360 LIMITED</strong> was established with a clear mandate: to redefine enterprise standards across Nigeria and global markets by delivering an integrated suite of verified, premium commercial services.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Rather than confining our capability to a single vertical, our umbrella architecture seamlessly coordinates prime real estate developments, turnkey engineering, air and sea freight logistics, executive travel, strategic procurement, and diaspora wealth preservation.
            </p>

            {/* Value Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {pillars.map((p, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                    {p.icon}
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: 'var(--brand-blue)' }}>{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E9C541]" />
                <span>Incorporated & Regulated in Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E9C541]" />
                <span>Global Banking & Escrow Partnerships</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E9C541]" />
                <span>Multi-Sector Industry Specialists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
