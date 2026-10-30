import React from "react";
import { Quote } from "lucide-react";
import ceo1 from "../assets/ceo.jpeg";
import ceo2 from "../assets/ceo2.jpeg";
import ceo3 from "../assets/ceo3.jpeg";


export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(0,16,80,0.06)', border: '1px solid rgba(0,16,80,0.14)', color: 'var(--brand-deep)' }}
          >
            <span>Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight" style={{ color: 'var(--brand-deep)' }}>
            Meet the{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, var(--brand-gold), var(--gold-gradient-end))' }}
            >
              Visionary
            </span>
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            The leadership driving AKOY 360's mission to connect opportunities and deliver solutions across continents.
          </p>
        </div>

        {/* CEO Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: CEO Photo */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-100 shadow-xl">
                <img
                  src={ceo1}
                  alt="AKOY 360 CEO"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, rgba(0,16,80,0.85), transparent)' }} />
                {/* Name plate */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold font-display">Engr. Gabriel Sunday Adeyemo</h3>
                  <p className="text-sm" style={{ color: 'var(--brand-gold)' }}>Founder &amp; Chief Executive Officer</p>
                </div>
              </div>
              {/* Decorative gold accent */}
              <div
                className="absolute -bottom-3 -right-3 w-24 h-24 rounded-3xl -z-10"
                style={{ background: 'var(--brand-gold)', opacity: 0.15 }}
              />
            </div>
          </div>

          {/* Right: Bio + Quote */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <Quote className="w-10 h-10 mb-4" style={{ color: 'var(--brand-gold)', opacity: 0.4 }} />
              <blockquote className="text-lg sm:text-2xl font-display font-bold leading-relaxed" style={{ color: 'var(--brand-deep)' }}>
                "We exist to bridge the gap between ambition and execution — whether you're building a home from abroad,
                moving cargo across continents, or seeking a trusted partner in Nigeria.
                <span style={{ color: 'var(--brand-gold)' }}> AKOY 360 is your institutional guarantee.</span>"
              </blockquote>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
               Engr. Gabriel Sunday Adeyemo founded AKOY 360 LIMITED with a singular vision: to create an institution that
                Nigerians at home and abroad could trust completely. With over a 16 years of experience in property
                development, construction, and cross-border business services, he has built AKOY 360 into a
                six-division conglomerate serving thousands of clients across Nigeria, the UK, USA, Canada, and beyond.
              </p>
              <p>
                Under his leadership, AKOY 360 has maintained a zero-fraud record in diaspora project management,
                delivered hundreds of turnkey construction projects on time, and established liaison desks in
                London, Houston, and Toronto — making AKOY 360 a trusted name for Nigerians worldwide.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-2xl font-extrabold font-display" style={{ color: 'var(--brand-deep)' }}>16+</p>
                <p className="text-xs text-slate-400 mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-display" style={{ color: 'var(--brand-deep)' }}>6</p>
                <p className="text-xs text-slate-400 mt-0.5">Business Divisions</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-display" style={{ color: 'var(--brand-deep)' }}>50 -100</p>
                <p className="text-xs text-slate-400 mt-0.5">Clients Served</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Gallery */}
        <div className="mt-16">
          <h3 className="text-sm font-bold uppercase tracking-wider text-center mb-6" style={{ color: 'var(--brand-deep)' }}>
            Moments in Leadership
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[ceo2, ceo3,].map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 group">
                <img
                  src={img}
                  alt={`Leadership ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
