/**
 * About Us Page Structured Data
 */

export const ABOUT_MISSION_DATA = {
  eyebrow: 'Our Purpose',
  headline: 'Closing the loop between campus innovation and real capital.',
  lead: 'Incubators find founders. Investors have capital. Neither had a way to reach the other.',
  sectorAgnosticThesis: "We're sector-agnostic by design. Great companies come out of every lab, hostel room and workshop. We don't bet on industries — we build the pipeline that finds the ones ready for capital.",
  paragraphs: [
    'Campus incubators had student, alumni, and faculty founders, but no compliant route to real equity funding, only grants, which are finite and cyclical.',
    'Capital providers had real money and accredited investors ready to deploy it, but no reliable way to find fundworthy companies at scale.',
    'And event platforms were good at generating attention, but a trophy doesn’t pay for anyone’s runway.',
    'Campital exists to close that loop: bring capital to campuses, and build the pipeline that gets it there.'
  ]
};

export const ABOUT_APPROACH_DATA = {
  eyebrow: 'Our Approach',
  headline: 'Two distinct pipelines, one rigorous outcome.',
  description: 'We run two sourcing pipelines—one through partner campus incubators, drawing on their existing pool of founders; the other sourcing SMEs directly, with no incubator involved.',
  subDescription: 'On top of both, we run a discovery and evaluation layer: hackathons, demo days, and pitch competitions that produce a shortlist of genuinely investment-ready companies. That shortlist moves into a structured, compliant capital route—so a demo day ends in a term sheet, not just a trophy.',
  pipelines: [
    {
      title: 'Campus Incubators Pipeline',
      description: 'Plugs into university innovation centers, capturing student, alumni, and faculty-led ventures.',
      sourceTag: 'Ecosystem Sourced'
    },
    {
      title: 'Direct SME Pipeline',
      description: 'Independent small & medium enterprises with validated business models and growth potential.',
      sourceTag: 'Direct Sourced'
    }
  ],
  funnelLayer: {
    title: 'Discovery & Evaluation Layer',
    description: 'Hackathons, demo days, and pitch competitions produce a shortlist of genuinely investment-ready companies.',
    activities: ['Hackathons', 'Demo Days', 'Pitch Competitions', 'Readiness Scoring']
  },
  funnel: {
    title: 'Discovery & Evaluation Layer',
    description: 'Hackathons, demo days, and pitch competitions produce a shortlist of genuinely investment-ready companies.',
    activities: ['Hackathons', 'Demo Days', 'Pitch Competitions', 'Readiness Scoring']
  },
  outcomeLayer: {
    title: 'Compliant Capital Route',
    description: 'Structured introductions to accredited investors, seed funds, and angel syndicates ending in term sheets.',
    outcome: 'Structured introductions to accredited investors, seed funds, and angel syndicates ending in term sheets.'
  },
  destination: {
    title: 'Compliant Capital Route',
    description: 'Structured introductions to accredited investors, seed funds, and angel syndicates ending in term sheets.'
  }
};

export const ABOUT_STORY_DATA = {
  eyebrow: 'Founding Story',
  headline: 'Born from a simple, inescapable observation.',
  content: [
    'Campital—campus capital—grew out of a simple observation: a campus incubator, a compliant capital route, and an events engine each had something the others needed, and something they couldn’t do alone.',
    'Bringing those pieces together into one connected pipeline is what became Campital.'
  ]
};

export const ABOUT_TEAM_DATA = {
  eyebrow: 'Leadership',
  headline: 'Founding Team',
  description: 'Built by operators passionate about bridging academic entrepreneurship and professional venture capital.',
  members: [
    {
      name: 'Saran Kumar',
      role: 'Founder & CEO',
      image: '/images/saran_kumar.jpg',
      bio: 'Focused on ecosystem architecture, campus incubator partnerships, and venture pipeline acceleration.',
      initials: 'SK',
      linkedin: 'https://www.linkedin.com/in/0xsaran/',
      focusAreas: ['Ecosystem Architecture', 'Campus Incubators', 'Pipeline Strategy']
    },
    {
      name: 'Sandeep Gupta',
      role: 'Co-Founder',
      image: '/images/sandeep_gupta.jpg',
      bio: 'Focused on capital network syndication, compliant investment routing, and founder readiness evaluation.',
      initials: 'SG',
      linkedin: 'https://www.linkedin.com/in/sandgupta/',
      focusAreas: ['Capital Syndication', 'Compliant Routes', 'Investor Relations']
    }
  ]
};


export const ABOUT_VALUES_DATA = [
  {
    title: 'Outcomes over optics.',
    description: 'We measure ourselves by term sheets closed, not trophies handed out.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Continuous, not one-off.',
    description: "We don't disappear after demo day.",
    icon: 'RefreshCw'
  },
  {
    title: 'Compliant by design.',
    description: 'Every route to capital respects the regulatory line—no shortcuts.',
    icon: 'Shield'
  },
  {
    title: 'Campus-first, not campus-only.',
    description: 'Built for student founders, open to SMEs.',
    icon: 'Globe'
  },
  {
    title: 'Merit over sector.',
    description: 'Every company gets the same evaluation, whatever it builds.',
    icon: 'Target'
  }
];

export const ABOUT_CTA = {
  headline: 'Find your place in the Campital pipeline.',
  subheadline: 'Whether you are building on campus, operating an SME, running an incubator, or commercializing research.',
  buttonText: 'See where you fit → You Are',
  path: '/you-are'
};

