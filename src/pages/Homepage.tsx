import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { WorkGallery } from "../components/WorkGallery";
import { DivisionsGrid } from "../components/DivisionsGrid";
import { DiasporaBanner } from "../components/DiasporaBanner";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EAEFF5] py-2 sm:py-4 px-2 sm:px-4 lg:px-6">
      {/* Outer Framed Stage (Replicating the reference image's framed canvas effect) */}
      <div className="max-w-[1600px] mx-auto bg-white rounded-[32px] sm:rounded-[44px] shadow-2xl overflow-hidden border border-slate-200/90 transition-all">
        {/* Navigation Bar with suspended notched center tab */}
        <Navbar />

        {/* Hero Section */}
        <main>
          <Hero />

          <WorkGallery />

          {/* All 6 Specialized Business Divisions */}
          <DivisionsGrid />

          {/* Nigerian Diaspora Bridge & Escrow Governance */}
          <DiasporaBanner />

          {/* About AKOY 360 & Corporate Heritage */}
          <AboutSection />

          {/* Executive Consultation & Contact Desk */}
          <ContactSection />
        </main>

        {/* Corporate Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
