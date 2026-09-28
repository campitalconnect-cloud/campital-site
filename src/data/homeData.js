/**
 * Home Page Structured Data (v2)
 */

export const HERO_DATA = {
  headline: 'Campus + Capital = Campital',
  subheadline: 'Funding. Partners. Momentum. For startups born on campus — and SMEs ready to grow.',
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
    description: 'We source startups from campus incubators, and SMEs directly.',
    detail: 'Dual-pipeline sourcing identifies promising teams directly on university campuses and through independent SME discovery.',
    icon: 'Compass'
  },
  {
    step: '02',
    title: 'Evaluate',
    description: 'Hackathons, demo days and pitch competitions narrow the field to companies that are actually investment-ready.',
    detail: 'A rigorous discovery layer tests execution, founder momentum, and product viability before introductions.',
    icon: 'Layers'
  },
  {
    step: '03',
    title: 'Fund',
    description: 'Vetted companies move into a compliant route to real capital — not another grant.',
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
    ctaText: 'Get Funded',
    personaKey: 'startup',
    icon: 'Rocket'
  },
  {
    id: 'incubator',
    badge: 'University Ecosystems',
    title: 'Campus Incubator',
    tagline: "Give your portfolio a path that doesn't end at grants.",
    description: 'Plugs your university innovation center into a structured evaluation engine and compliant equity investor network.',
    ctaText: 'Partner Your Incubator',
    personaKey: 'incubator',
    icon: 'Building2'
  },
  {
    id: 'sme',
    badge: 'Direct Sourcing',
    title: 'SME',
    tagline: 'Running an SME? Apply directly, no incubator needed.',
    description: 'High-growth small and medium enterprises seeking growth capital through a bespoke, independent evaluation process.',
    ctaText: 'Apply for SME Funding',
    personaKey: 'sme',
    icon: 'Briefcase'
  },
  {
    id: 'faculty',
    badge: 'Coming soon',
    isComingSoon: true,
    title: 'Faculty & Researchers',
    tagline: "Research with startup potential? We're building a route for it.",
    description: 'A dedicated pipeline taking campus research from the lab to a fundable startup with compliant investor capital.',
    ctaText: 'Register Interest',
    personaKey: 'faculty',
    icon: 'GraduationCap'
  }
];

export const WHY_CAMPITAL_PILLARS = [
  {
    id: 'real-capital',
    num: '01',
    title: 'Real capital, not another grant.',
    description: 'Vetted companies move into a compliant investment route, not a recurring grant cycle.',
    highlight: 'Sustainable equity runway vs temporary subsidies',
    icon: 'ShieldCheck'
  },
  {
    id: 'evaluation-outcome',
    num: '02',
    title: 'Evaluation with an outcome.',
    description: 'Hackathons and demo days that aim for a term sheet, not just a trophy.',
    highlight: 'Tangible capital introductions post-event',
    icon: 'Target'
  },
  {
    id: 'every-sector',
    num: '03',
    title: 'Every sector, one standard.',
    description: "We don't pick industries. We pick companies that are ready.",
    highlight: 'Sector-agnostic evaluation across all disciplines',
    icon: 'Sparkles'
  },
  {
    id: 'two-ways-in',
    num: '04',
    title: 'Two ways in, one destination.',
    description: 'Campus incubator pipeline or direct SME sourcing — same funding route either way.',
    highlight: 'Merit-based access to capital providers',
    icon: 'GitMerge'
  }
];

export const STATS_BAR_CONFIG = {
  // Built component, kept switched off at launch per spec
  showStats: false,
  metrics: [
    { label: 'Startups Evaluated', value: '—' },
    { label: 'Partner Campuses', value: '—' },
    { label: 'Startups Funded', value: '—' },
    { label: 'Capital Raised by Portfolio', value: '—' }
  ]
};

export const CLOSING_CTA = {
  eyebrow: 'Join the Pipeline',
  headline: 'Ready when you are.',
  subheadline: 'Funding. Partners. Momentum. For startups born on campus — and SMEs ready to grow.',
  primaryCta: {
    label: 'Get Funded',
    path: '/you-are?persona=startup'
  },
  secondaryCta: {
    label: 'Become a Partner',
    path: '/partnerships#inquiry'
  }
};

