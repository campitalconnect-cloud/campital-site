import React from 'react';
import { Hero } from '../components/home/Hero';
import { TheGap } from '../components/home/TheGap';
import { FounderJourney } from '../components/home/FounderJourney';
import { HowItWorks } from '../components/home/HowItWorks';
import { AudienceCards } from '../components/home/AudienceCards';
import { WhyCampital } from '../components/home/WhyCampital';
import { NewsletterStrip } from '../components/home/NewsletterStrip';
import { ClosingCTA } from '../components/home/ClosingCTA';

export const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Hero */}
      <Hero />

      {/* 2. The Gap (NEW) */}
      <TheGap />

      {/* 3. Founder Journey (NEW) */}
      <FounderJourney />

      {/* 4. How It Works (Source, Evaluate, Fund) */}
      <HowItWorks />

      {/* 5. You Are teaser (Startup, Incubator, SME, Faculty) */}
      <AudienceCards />

      {/* 6. Why Campital (4 Principles) */}
      <WhyCampital />

      {/* 7. Newsletter — The Campital Brief (NEW) */}
      <NewsletterStrip />

      {/* 8. Closing CTA */}
      <ClosingCTA />
    </div>
  );
};

