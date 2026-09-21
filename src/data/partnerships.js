/**
 * Partnerships Page Structured Data
 */

export const PARTNERSHIPS_HERO = {
  eyebrow: 'Ecosystem Alliances',
  headline: 'Build the bridge between innovation and capital.',
  supportingCopy: 'Campital brings the sourcing and evaluation engine. Partners bring what makes it work at scale: capital to deploy, an institution’s deal flow, or an ecosystem worth plugging into.',
  cta: {
    label: 'Become a Partner',
    targetId: 'inquiry'
  }
};

export const PARTNER_CATEGORIES = [
  {
    id: 'capital',
    name: 'Capital Partners',
    typeValue: 'Capital',
    tagline: 'Direct Pipeline Access',
    description: 'Investors and capital providers who fund the startups and SMEs that come through Campital’s pipeline.',
    benefits: [
      'Pre-vetted, investment-ready deal flow',
      'Proprietary campus innovation access',
      'Rigorous evaluation data & scoring',
      'Compliant introduction frameworks'
    ],
    icon: 'TrendingUp'
  },
  {
    id: 'institutional',
    name: 'Institutional Partners',
    typeValue: 'Institutional',
    tagline: 'University & Innovation Hubs',
    description: 'Universities, campus incubators, and innovation centres that supply deal flow and campus infrastructure.',
    benefits: [
      'Equity path beyond finite grant cycles',
      'Turnkey hackathons and demo days',
      'Accredited capital provider integration',
      'Measurable founder commercialization'
    ],
    icon: 'Landmark'
  },
  {
    id: 'corporate',
    name: 'Corporate-Ecosystem Partners',
    typeValue: 'Corporate-Ecosystem',
    tagline: 'Strategic Ecosystem Alliances',
    description: 'Corporates and organizations offering mentorship, market access, or ecosystem support to portfolio companies.',
    benefits: [
      'Early access to emerging technologies',
      'High-impact founder mentorship & pilots',
      'Ecosystem branding and sponsorship',
      'Strategic corporate innovation scouting'
    ],
    icon: 'Network'
  }
];

export const PARTNER_PROCESS_STEPS = [
  { step: '01', title: 'Inquiry', description: 'Submit the partnership interest form with your organization details.' },
  { step: '02', title: 'Intro Call', description: 'Introductory alignment call to review mutual goals and partnership models.' },
  { step: '03', title: 'Scope & Fit Discussion', description: 'Deep dive into cohort requirements, deal-flow mechanics, or investment focus.' },
  { step: '04', title: 'Agreement', description: 'Formalize terms, collaboration scope, and compliance standards.' },
  { step: '05', title: 'Onboarding', description: 'Integrate into Campital discovery cycles and kickoff joint activities.' }
];

export const CASE_STUDY_CONFIG = {
  // Flag indicating if public case studies have been approved
  hasApprovedCaseStudy: false,
  placeholderTitle: 'Cohort Case Studies & Partner Spotlights',
  placeholderNotice: 'Verified case studies highlighting our university partnerships and founder funding milestones will be published as cohorts complete their compliant capital introduction cycles.'
};
