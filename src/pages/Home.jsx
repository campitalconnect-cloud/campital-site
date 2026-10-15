import React from 'react';
import { Hero } from '../components/home/Hero';
import { ProofStrip } from '../components/home/ProofStrip';
import { TheGap } from '../components/home/TheGap';
import { HowItWorks } from '../components/home/HowItWorks';
import { AudienceCards } from '../components/home/AudienceCards';
import { FounderJourney } from '../components/home/FounderJourney';
import { WhyCampital } from '../components/home/WhyCampital';
import { ScoringAndFAQ } from '../components/home/ScoringAndFAQ';
import { ClosingCTA } from '../components/home/ClosingCTA';

export const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Hero: One plain sentence, amount, one Apply button, cinematic gradient */}
      <Hero />

      {/* 2. Proof strip: Premier university hubs and 3 real numbers */}
      <ProofStrip />

      {/* 3. The Campus Capital Gap: Panoramic Infographic & Problem Analysis */}
      <TheGap />

      {/* 4. How It Works: Panoramic Showcase & 3 Steps with 21-Day Timing */}
      <HowItWorks />

      {/* 5. Who It Is For: 4-Track Panoramic Visual & Differentiated Pathway Actions */}
      <AudienceCards />

      {/* 6. Your Path: Panoramic Mountain Trail Visual & Stage Progression */}
      <FounderJourney />

      {/* 7. Why Campital: Four Core Principles & Showcase Visual */}
      <WhyCampital />

      {/* 8. Scoring criteria with 4 visual parameter photos and FAQ */}
      <ScoringAndFAQ />

      {/* 9. Closing CTA: Luminous gradient with one clear final button */}
      <ClosingCTA />
    </div>
  );
};

export default Home;
