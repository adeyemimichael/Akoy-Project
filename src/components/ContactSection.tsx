import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Send, Phone, Mail, MapPin, CheckCircle, Clock } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Nigeria",
    division: "properties",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `Thank you ${formData.fullName}! Your inquiry for AKOY 360 ${formData.division.toUpperCase()} has been received. Our executive desk will reach out within 24 hours.`,
        {
          duration: 6000,
          style: {
            background: "var(--brand-blue)",
            color: "#FFFFFF",
            border: "1px solid var(--brand-gold)",
          },
        }
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "Nigeria",
        division: "properties",
        message: "",
      });
    }, 800);
  };

  const inputClass = "w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl text-white text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-brand-gold"
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)' };

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Direct Inquiries and Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
                style={{ background: 'rgba(0,16,80,0.06)', border: '1px solid rgba(0,16,80,0.14)', color: 'var(--brand-deep)' }}
              >
                <span>Direct Executive Desk</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight" style={{ color: 'var(--brand-deep)' }}>
                Let's Build Your{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--brand-gold), var(--gold-gradient-end))' }}
                >
                  Next Solution.
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you need property acquisitions, construction, cross-border air/sea freight, luxury travel arrangements, or diaspora project oversight, our specialized division directors are ready to assist.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Corporate Headquarters</h4>
                <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--brand-deep)' }}>
                     Lagos, Nigeria
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Liaison Desks in (UK) &amp;</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Telephone &amp; WhatsApp Hotline</h4>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--brand-deep)' }}>+234 (0) 800 360 AKOY </p>
                  <p className="text-xs text-slate-500 mt-0.5">Mon - Sat, 8:00 AM - 6:00 PM (WAT)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Electronic Inquiries</h4>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--brand-deep)' }}>contact@akoy360.co.uk</p>
                  <p className="text-xs text-slate-500 mt-0.5">Guaranteed response within 24 business hours</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>NDA &amp; Confidentiality</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4" style={{ color: 'var(--brand-gold)' }} />
                <span>24h Turnaround</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Consultation Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 sm:p-10 rounded-3xl text-white relative"
              style={{ background: 'var(--brand-deep)', border: '1px solid rgba(253,191,2,0.18)', boxShadow: '0 20px 40px rgba(0,16,80,0.12)' }}
            >
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Schedule a Consultation
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Select your division of interest to route directly to our sector specialists.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Division Selector Radio/Tabs */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Select Target Division:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "properties", label: "Properties" },
                      { id: "construction", label: "Construction" },
                      { id: "travel", label: "Travel & Tours" },
                      { id: "logistics", label: "Logistics / Freight" },
                      { id: "business", label: "Business Services" },
                      { id: "diaspora", label: "Diaspora Gateway" },
                    ].map((div) => (
                      <button
                        key={div.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, division: div.id })}
                        className="py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all"
                        style={
                          formData.division === div.id
                            ? { background: 'var(--brand-gold)', color: 'var(--brand-deep)', borderColor: 'var(--brand-gold)', fontWeight: 700, boxShadow: '0 4px 12px rgba(253,191,2,0.3)' }
                            : { background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', borderColor: 'rgba(255,255,255,0.10)' }
                        }
                      >
                        {div.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Michael Adeyemi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number (with country code) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 / +44 / +1 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Current Location / Country
                    </label>
                    <input
                      type="text"
                      placeholder="Nigeria, UK, USA, Canada..."
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Scope of Requirement / Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your property goal, building project, cargo requirements, or corporate needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(to right, var(--gold-gradient-start), var(--gold-gradient-mid), var(--gold-gradient-end))',
                      color: 'var(--brand-deep)'
                    }}
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Confidential Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
