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
    <div className="min-h-screen py-6 px-4 lg:px-8" style={{ background: '#FAFBFD' }}>
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all">
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
