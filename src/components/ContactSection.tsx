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
            background: "#142B8C",
            color: "#FFFFFF",
            border: "1px solid #E9C541",
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

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries and Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142B8C]/5 border border-[#142B8C]/15 text-[#142B8C] text-xs font-bold tracking-widest uppercase mb-3">
                <span>Direct Executive Desk</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#142B8C]">
                Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9C541] to-[#C89D12]">Next Solution.</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you need property acquisitions, turnkey construction, cross-border air/sea freight, luxury travel arrangements, or diaspora project oversight, our specialized division directors are ready to assist.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-[#142B8C] text-[#E9C541] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Corporate Headquarters</h4>
                  <p className="text-sm font-semibold text-[#142B8C] mt-0.5">
                    Victoria Island / Ikoyi Commercial Corridor, Lagos, Nigeria
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Liaison Desks in London (UK) & Houston, Texas (USA)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-[#142B8C] text-[#E9C541] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Telephone & WhatsApp Hotline</h4>
                  <p className="text-sm font-semibold text-[#142B8C] mt-0.5">+234 (0) 800 360 AKOY / +234 812 345 6789</p>
                  <p className="text-xs text-slate-500 mt-0.5">Mon - Sat, 8:00 AM - 6:00 PM (WAT)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-[#142B8C] text-[#E9C541] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Electronic Inquiries</h4>
                  <p className="text-sm font-semibold text-[#142B8C] mt-0.5">contact@akoy360.com / diaspora@akoy360.com</p>
                  <p className="text-xs text-slate-500 mt-0.5">Guaranteed response within 24 business hours</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>NDA & Confidentiality</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#E9C541]" />
                <span>24h Turnaround</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Consultation Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#142B8C] text-white border border-[#E9C541]/30 shadow-2xl relative">
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
                        className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                          formData.division === div.id
                            ? "bg-[#E9C541] text-[#09184F] border-[#E9C541] font-bold shadow-md"
                            : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                        }`}
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#E9C541] text-white text-sm outline-none transition-colors placeholder:text-slate-500"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#E9C541] text-white text-sm outline-none transition-colors placeholder:text-slate-500"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#E9C541] text-white text-sm outline-none transition-colors placeholder:text-slate-500"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#E9C541] text-white text-sm outline-none transition-colors placeholder:text-slate-500"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#E9C541] text-white text-sm outline-none transition-colors placeholder:text-slate-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E9C541] via-[#F1D05E] to-[#C89D12] text-[#09184F] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:shadow-[#E9C541]/30 transition-all disabled:opacity-50"
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
