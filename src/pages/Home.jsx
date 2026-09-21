import React from 'react';
import { Hero } from '../components/home/Hero';
import { CampusShowcase } from '../components/home/CampusShowcase';
import { HowItWorks } from '../components/home/HowItWorks';
import { AudienceCards } from '../components/home/AudienceCards';
import { WhyCampital } from '../components/home/WhyCampital';
import { Traction } from '../components/home/Traction';
import { PartnerLogos } from '../components/home/PartnerLogos';
import { ClosingCTA } from '../components/home/ClosingCTA';

export const Home = () => {
  return (
    <div className="home-page">
      {/* A. Hero */}
      <Hero />

      {/* B. The Campus-to-Capital Showcase */}
      <CampusShowcase />

      {/* C. How It Works (21-Day Funnel) */}
      <HowItWorks />

      {/* D. You Are — Three Audience Cards */}
      <AudienceCards />

      {/* E. Why Campital */}
      <WhyCampital />

      {/* E. Traction Statistics */}
      <Traction />

      {/* F. Partner Logos */}
      <PartnerLogos />

      {/* G. Closing CTA */}
      <ClosingCTA />
    </div>
  );
};
