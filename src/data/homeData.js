/**
 * Home Page Structured Data
 */

export const HERO_DATA = {
  headline: 'Campus + Capital = Campital',
  subheadline: 'Funding. Partners. Momentum. For startups born on campus.',
  primaryCta: {
    label: 'Get Funded',
    path: '/you-are?persona=startup'
  },
  secondaryCta: {
    label: 'Become a Partner',
    path: '/partnerships#inquiry'
  }
};

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Source',
    description: 'We source startups from campus incubators, and SMEs.',
    detail: 'Dual-pipeline sourcing identifies promising teams directly on university campuses and through independent SME discovery.',
    icon: 'Compass'
  },
  {
    step: '02',
    title: 'Evaluate',
    description: 'Hackathons, demo days, and pitch competitions narrow the field to companies that are actually investment-ready.',
    detail: 'A rigorous discovery layer tests execution, founder momentum, and product viability before introductions.',
    icon: 'Layers'
  },
  {
    step: '03',
    title: 'Fund',
    description: 'Vetted startups move into a compliant route to real capital—not another grant.',
    detail: 'Shortlisted companies enter a structured capital pathway to accredited investors, angel networks, and venture funds.',
    icon: 'TrendingUp'
  }
];

export const AUDIENCE_CARDS = [
  {
    id: 'startup',
    badge: 'Campus Founders',
    title: 'Startup',
    tagline: 'Built something on campus? Get evaluated, get funded.',
    description: 'Student, alumni, or faculty-led ventures ready to transition from campus projects to scalable, funded enterprises.',
    ctaLabel: 'Get Funded',
    personaKey: 'startup',
    icon: 'Rocket'
  },
  {
    id: 'incubator',
    badge: 'University Ecosystems',
    title: 'Campus Incubator',
    tagline: "Give your portfolio a path that doesn't end at grants.",
    description: 'Plugs your university innovation center into a structured evaluation engine and compliant equity investor network.',
    ctaLabel: 'Partner Your Incubator',
    personaKey: 'incubator',
    icon: 'Building2'
  },
  {
    id: 'sme',
    badge: 'Direct Sourcing',
    title: 'SME',
    tagline: 'Running an SME? Apply directly—no incubator needed.',
    description: 'High-growth small and medium enterprises seeking growth capital through a bespoke, independent evaluation process.',
    ctaLabel: 'Apply for SME Funding',
    personaKey: 'sme',
    icon: 'Briefcase'
  }
];

export const WHY_CAMPITAL_PILLARS = [
  {
    id: 'real-capital',
    title: 'Real capital, not another grant.',
    description: 'We route vetted startups into a compliant investment route, not a recurring grant cycle.',
    highlight: 'Sustainable equity runway vs temporary subsidies',
    icon: 'ShieldCheck'
  },
  {
    id: 'evaluation-outcome',
    title: 'An evaluation funnel with an outcome.',
    description: 'Hackathons and demo days that end in a term sheet, not just a trophy.',
    highlight: 'Tangible capital introductions post-event',
    icon: 'Target'
  },
  {
    id: 'two-ways-in',
    title: 'Two ways in, one destination.',
    description: 'Campus incubator pipeline or direct SME sourcing—same funding route either way.',
    highlight: 'Merit-based access to capital providers',
    icon: 'GitMerge'
  }
];

export const TRACTION_METRICS = {
  // Flag indicating if verified traction is available for public display
  isVerified: false,
  placeholderNotice: 'Verified operational metrics will be published following the inaugural cohort cycle.',
  metrics: [
    { label: 'Startups Funded', value: null, placeholderText: 'Cohort in Progress' },
    { label: 'Incubators Partnered', value: null, placeholderText: 'Active Onboarding' },
    { label: 'Capital Deployed', value: null, placeholderText: 'Pipeline Active' }
  ]
};

export const PARTNER_LOGOS_CONFIG = {
  // Strict rule: No fake logos. Only show when authorized list is provided.
  showSection: true,
  isPubliclyPopulated: false,
  placeholderTitle: 'Institutional & Capital Network',
  placeholderDescription: 'Our active university incubator partnerships and capital partner network are confirmed under mutual agreement.',
  logos: []
};

export const CLOSING_CTA = {
  eyebrow: 'Join the Pipeline',
  headline: 'Campus + Capital = Campital',
  subheadline: 'Funding. Partners. Momentum. For startups born on campus.',
  primaryCta: {
    label: 'Get Funded',
    path: '/you-are?persona=startup'
  },
  secondaryCta: {
    label: 'Become a Partner',
    path: '/partnerships#inquiry'
  }
};
