import React, { useState, useRef, useEffect } from "react";
import { Search, Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { DIVISIONS_DATA } from "../data/divisions";

interface SearchResult {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  matchedTag: string;
}

function searchDivisions(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const div of DIVISIONS_DATA) {
    const matchedTag =
      div.searchTags.find(t => t.includes(q)) ||
      div.name.toLowerCase().includes(q) && div.name ||
      div.tagline.toLowerCase().includes(q) && div.tagline ||
      div.description.toLowerCase().includes(q) && div.description.slice(0, 40) ||
      div.bulletPoints.find(b => b.toLowerCase().includes(q));

    if (matchedTag) {
      results.push({
        id: div.id,
        name: div.name,
        shortName: div.shortName,
        tagline: div.tagline,
        matchedTag: typeof matchedTag === "string" ? matchedTag : "",
      });
    }
  }

  return results;
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("MAIN");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "MAIN", href: "/#hero" },
    { name: "DIVISIONS", href: "/#divisions" },
    { name: "TRAVELS", href: "/#diaspora" },
    { name: "CONSTRUCTIONS", href: "/#constructions" },
    { name: "ABOUT", href: "/#about" },
    { name: "CONSULT", href: "/#contact" },
  ];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchOpen]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setResults(searchDivisions(val));
  };

  const handleResultClick = (id: string) => {
    setSearchOpen(false);
    navigate(`/divisions/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setSearchOpen(false);
    if (e.key === "Enter" && results.length > 0) {
      handleResultClick(results[0].id);
    }
  };

  return (
    <header className="relative w-full z-40">
      <div className="relative flex items-center justify-between px-4 sm:px-8 py-3 w-full">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/#hero" className="flex items-center group">
            <Logo size="md" />
          </a>
        </div>

        {/* Center nav island (desktop) */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 top-0">
          <div className="relative">
            <div
              className="relative text-white px-7 py-2.5 rounded-b-[24px] shadow-lg flex items-center gap-7 border-b border-x"
              style={{ background: 'var(--brand-blue)', borderColor: 'rgba(253,191,2,0.18)' }}
            >
              <div className="absolute -left-[18px] top-0 w-[18px] h-[18px] pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 100%, transparent 18px, var(--brand-blue) 18px)' }} />
              <div className="absolute -right-[18px] top-0 w-[18px] h-[18px] pointer-events-none"
                style={{ background: 'radial-gradient(circle at 100% 100%, transparent 18px, var(--brand-blue) 18px)' }} />
              {navLinks.map((link) => {
                const isActive = activeTab === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveTab(link.name)}
                    className="relative text-[11px] font-bold tracking-[0.18em] transition-all duration-200 py-1 text-slate-300 hover:text-white"
                    style={isActive ? { color: 'var(--brand-gold)' } : undefined}
                  >
                    {link.name}
                    {isActive && (
                      <span
                        style={{ background: 'var(--brand-gold)', boxShadow: '0 0 8px var(--brand-gold)' }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-[2px] rounded-full"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center transition-colors duration-200 shadow-sm hover:bg-brand-gold hover:text-brand-blue"
          >
            <Search className="w-4 h-4" />
          </button>

          <a
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300/80 text-[12px] font-semibold transition-all duration-200"
            style={{ color: 'var(--brand-blue)' }}
          >
            <span>Contact</span>
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </div>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-200 transition-colors lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Search Panel ─────────────────────────────────────────── */}
      {searchOpen && (
        <div className="absolute top-full left-4 right-4 sm:left-12 sm:right-12 mt-2 z-50">
          <div className="bg-white/97 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                placeholder="Search: duplex, bungalow, cargo, visa, escrow, construction..."
                className="flex-1 text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 shrink-0"
              >
                Close
              </button>
            </div>

            {/* Results */}
            {query.trim() && (
              <div>
                {results.length === 0 ? (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm text-slate-500">No divisions match <strong>"{query}"</strong></p>
                    <p className="text-xs text-slate-400 mt-1">Try: property, construction, travel, logistics, diaspora</p>
                  </div>
                ) : (
                  <div className="py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-4 py-1.5">
                      {results.length} division{results.length > 1 ? "s" : ""} found
                    </p>
                    {results.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleResultClick(r.id)}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                          style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
                        >
                          {r.shortName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color: 'var(--brand-deep)' }}>{r.name}</p>
                          <p className="text-xs text-slate-400 truncate">{r.tagline}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 shrink-0" style={{ color: 'var(--brand-gold)' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Empty state hint */}
            {!query.trim() && (
              <div className="px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Quick Access</p>
                <div className="flex flex-wrap gap-2">
                  {["duplex", "bungalow", "cargo", "construction", "visa", "diaspora", "escrow", "airbnb"].map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setQuery(tag);
                        setResults(searchDivisions(tag));
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors capitalize"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden mx-4 mt-2 p-5 text-white rounded-3xl shadow-2xl space-y-4"
          style={{ background: 'var(--brand-blue)', border: '1px solid rgba(253,191,2,0.18)' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--brand-gold)' }}>
              Navigation &amp; Divisions
            </span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full bg-white/10 text-slate-300">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => { setActiveTab(link.name); setMobileMenuOpen(false); }}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm font-semibold text-slate-200"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--brand-gold)' }} />
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10">
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(to right, var(--gold-gradient-start), var(--gold-gradient-mid))', color: 'var(--brand-deep)' }}
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
