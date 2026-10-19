import React, { useState } from "react";
import { Search, User, Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  onSelectDivision?: (divisionId: string) => void;
  activeDivision?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("MAIN");

  const navLinks = [
    { name: "MAIN", href: "/#hero" },
    { name: "DIVISIONS", href: "/#divisions" },
    { name: "TRAVELS", href: "/#diaspora" },
      { name: "CONSTRUCTIONS", href: "/#constructions" },
    { name: "ABOUT", href: "/#about" },
    { name: "CONSULT", href: "/#contact" },
  ];

  return (
    <header className="relative w-full z-40">
      <div className="relative flex items-center justify-between px-4 sm:px-8 py-3 w-full">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <a href="/#hero" className="flex items-center group">
            <Logo size="md" />
          </a>
        </div>

        {/* Center: Iconic Suspended Notched Island Tab (matching reference image) */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 top-0">
          <div className="relative">
            {/* The Notched Hanging Island (minimal, brand-colored) */}
            <div
              className="relative text-white px-7 py-2.5 rounded-b-[24px] shadow-lg flex items-center gap-7 border-b border-x"
              style={{ background: 'var(--brand-blue)', borderColor: 'rgba(233,197,65,0.18)' }}
            >
              {/* Left ear smooth curve connector */}
              <div
                className="absolute -left-[18px] top-0 w-[18px] h-[18px] pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 0% 100%, transparent 18px, var(--brand-blue) 18px)',
                }}
              />
              {/* Right ear smooth curve connector */}
              <div
                className="absolute -right-[18px] top-0 w-[18px] h-[18px] pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 100% 100%, transparent 18px, var(--brand-blue) 18px)',
                }}
              />

              {navLinks.map((link) => {
                const isActive = activeTab === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveTab(link.name)}
                    className={`relative text-[11px] font-bold tracking-[0.18em] transition-all duration-200 py-1 text-slate-300 hover:text-white`}
                    style={isActive ? { color: 'var(--brand-gold)' } : undefined}
                  >
                    {link.name}
                    {isActive && (
                      <span style={{ background: 'var(--brand-gold)', boxShadow: '0 0 8px var(--brand-gold)' }} className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-[2px] rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Action Suite (Search, Portal, Contact pill, Mobile toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Icon Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#E9C541] hover:text-[#142B8C] transition-colors duration-200 shadow-sm"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Client Portal / User Icon */}
          <a
            href="#portal"
            aria-label="Client Portal"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#E9C541] hover:text-[#142B8C] transition-colors duration-200 shadow-sm"
          >
            <User className="w-4 h-4" />
          </a>

          {/* Contact Pill CTA Button (As seen in reference image) */}
          <a
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300/80 text-[12px] font-semibold text-[#142B8C] transition-all duration-200 group"
          >
            <span>Contact</span>
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#E9C541] group-hover:text-[#142B8C] transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Hamburger Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-200 transition-colors lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-red-600" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Search Input Bar Dropdown */}
      {searchOpen && (
        <div className="absolute top-full left-4 right-4 sm:left-12 sm:right-12 mt-2 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl z-50 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search divisions (e.g. Properties, Diaspora Escrow, Cargo Freight, Travel)..."
            className="w-full text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600"
          >
            Close
          </button>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-2 p-5 text-white rounded-3xl shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300" style={{ background: 'var(--brand-blue)', border: '1px solid rgba(233,197,65,0.18)' }}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-widest text-[#E9C541] font-bold">
              Navigation & Divisions
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full bg-white/10 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.name);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm font-semibold text-slate-200"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#E9C541]" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E9C541] to-[#F1D05E] text-[#09184F] text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Headquarters</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
