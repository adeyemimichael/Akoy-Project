import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { WorkGallery } from "../components/WorkGallery";
import { DivisionsGrid } from "../components/DivisionsGrid";
import { DiasporaBanner } from "../components/DiasporaBanner";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { AboutSection } from "../components/AboutSection";
import { LeadershipSection } from "../components/LeadershipSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: '#FAFBFD' }}>
      <div className="max-w-auto mx-auto bg-white overflow-hidden transition-all">
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

          {/* Client Testimonials */}
          <TestimonialsSection />

          {/* About AKOY 360 & Corporate Heritage */}
          <AboutSection />

          {/* Leadership / Meet the CEO */}
          <LeadershipSection />

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
