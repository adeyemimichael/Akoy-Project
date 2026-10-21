import React from "react";
import { Logo } from "./Logo";
import { ArrowUp, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { TwitterIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons";
import { DIVISIONS_DATA } from "../data/divisions";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden" style={{ background: 'var(--brand-deep)' }}>
      {/* Decorative top border line in brand gold */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(to right, transparent, var(--brand-gold), transparent)' }} />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              AKOY 360 LIMITED is a premier integrated multi-division company operating across real estate, construction, executive travel, maritime &amp; air logistics, corporate procurement, and diaspora project governance.
            </p>

            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--brand-gold)' }}>
                Connecting Opportunities. Delivering Solutions.
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center transition-colors"
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--brand-gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-deep)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.color = ''; }}
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center transition-colors"
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--brand-gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-deep)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.color = ''; }}
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center transition-colors"
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--brand-gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-deep)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.color = ''; }}
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/2348123456789"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Operating Divisions Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>
              Specialized Divisions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {DIVISIONS_DATA.map((div) => (
                <li key={div.id}>
                  <a
                    href={`/divisions/${div.id}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-gold)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = ''; }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: 'var(--brand-gold)' }} />
                    <span>{div.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Corporate */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>
              Corporate
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="/#hero" className="hover:text-white transition-colors">
                  Overview &amp; Vision
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">
                  Corporate Governance
                </a>
              </li>
              <li>
                <a href="/#diaspora" className="hover:text-white transition-colors">
                  Diaspora Trust Desk
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">
                  Executive Consultation
                </a>
              </li>
              <li>
                <a href="/#terms" className="hover:text-white transition-colors">
                  Terms &amp; Regulatory Disclosures
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Desk Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>
              Head Office &amp; Desks
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--brand-gold)' }} />
                <span>Lagos, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--brand-gold)' }} />
                <span>+234 (0) 800 360 AKOY / +234 812 345 6789</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--brand-gold)' }} />
                <span>support@akoy360.co.uk</span>
              </div>
            </div>

            {/* Newsletter Pill */}
            <div className="pt-2">
              <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Subscribe for Market &amp; Project Briefs:</div>
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  style={{ background: 'var(--brand-gold)', color: 'var(--brand-deep)' }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">AKOY 360 LIMITED</strong>. RC Registered in Nigeria. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>One Vision. 360° Possibilities.</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center transition-colors"
              aria-label="Back to top"
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand-deep)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ''; (e.currentTarget as HTMLButtonElement).style.color = ''; }}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
