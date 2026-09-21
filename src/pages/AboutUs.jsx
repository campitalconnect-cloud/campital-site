import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { MissionSection } from '../components/about/MissionSection';
import { ApproachSection } from '../components/about/ApproachSection';
import { FoundingStory } from '../components/about/FoundingStory';
import { TeamSection } from '../components/about/TeamSection';
import { ValuesSection } from '../components/about/ValuesSection';
import { ClosingCTA } from '../components/home/ClosingCTA';
import { ABOUT_CTA } from '../data/aboutData';

export const AboutUs = () => {
  return (
    <div className="about-page">
      <PageHeader
        bannerText="Meet the People Powering the Movement"
        eyebrow="Campital"
        title="The Backbone & Vision"
        subtitle="We build the compliant sourcing and evaluation pipeline that connects university-born ventures and high-growth SMEs from demo day directly to institutional term sheets."
      />

      {/* A. Mission & Problem */}
      <MissionSection />

      {/* B. Our Approach */}
      <ApproachSection />

      {/* C. Founding Story */}
      <FoundingStory />

      {/* D. Team */}
      <TeamSection />

      {/* E. Values */}
      <ValuesSection />

      {/* F. Closing CTA */}
      <ClosingCTA
        eyebrow="Join the Pipeline"
        headline={ABOUT_CTA.headline}
        subheadline={ABOUT_CTA.subheadline}
        primaryCta={{
          label: ABOUT_CTA.buttonText,
          path: ABOUT_CTA.path,
        }}
        secondaryCta={{
          label: 'Become a Partner',
          path: '/partnerships#inquiry',
        }}
      />
    </div>
  );
};
