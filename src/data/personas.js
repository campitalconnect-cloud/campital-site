/**
 * Personas Structured Data for /you-are page (v2 Specification)
 */

export const PERSONAS_DATA = {
  startup: {
    key: 'startup',
    label: 'Startup',
    badge: 'For Founders',
    image: '/images/hero_network.jpg',
    imageAlt: 'Campus Student Founders and Innovators at Work',
    imageTag: 'Venture Origination',
    headline: 'Built something on campus? Get evaluated, get funded.',
    subheadline: 'Transition your campus-born venture into an investment-ready company with a direct path to real equity capital.',
    whoItsFor: 'Early-stage startups—student, alumni, or faculty-founded, whether sourced through a partner incubator or otherwise campus-connected—ready to raise real capital.',
    whatWeOffer: 'A path from demo day to term sheet. You’re evaluated through our discovery funnel (hackathons, demo days, pitch competitions), then the shortlist moves into a compliant capital route to accredited investors.',
    stageLine: 'Stage: Prototype to early revenue • Target Cheque: ₹2–5 Cr Seed',
    routeLink: '/how-we-fund#startup-seed',
    eligibilityNotice: {
      isFinalized: false,
      title: 'Eligibility Criteria & Open Screening',
      message: 'Seeking early-stage, campus-affiliated ventures with working prototypes, dedicated teams, or early validation across all sectors.'
    },
    process: [
      { step: '01', title: 'Apply or Get Sourced', description: 'Apply directly through our intake screening or get nominated by a partner incubator.' },
      { step: '02', title: 'Evaluation (Pitch / Demo)', description: 'Participate in structured metric scoring, hackathons, or demo day sessions.' },
      { step: '03', title: 'Shortlist Selection', description: 'Top teams receive comprehensive evaluation feedback and deal memo preparation.' },
      { step: '04', title: 'Capital Introduction', description: 'Compliant presentations to accredited angel syndicates and institutional seed funds.' },
      { step: '05', title: 'Term Sheet & Close', description: 'Execute standardized founder-friendly investment agreements and secure runway.' }
    ],
    faqs: [
      {
        question: 'Is Campital sector-agnostic?',
        answer: 'Yes, completely. We evaluate merit, defensibility, and traction across deep-tech, AI, SaaS, climate, healthcare, hardware, robotics, consumer, and industrial tech.'
      },
      {
        question: 'Do I need to be part of an incubator to apply?',
        answer: 'No—many campus founders come through partner incubators, but direct applications from independent student and alumni teams are actively evaluated.'
      },
      {
        question: 'What stage and cheque size does Campital fund?',
        answer: 'Primarily seed-stage ventures with working prototypes to early revenue, targeting ₹2Cr to ₹5Cr institutional equity rounds.'
      },
      {
        question: 'Does Campital charge founders an upfront fee?',
        answer: 'Never. We never charge founders application fees, screening charges, or pay-to-pitch fees.'
      }
    ],
    cta: {
      label: 'Apply for Funding',
      action: 'open_inquiry_modal',
      inquiryType: 'startup'
    }
  },

  incubator: {
    key: 'incubator',
    label: 'Campus Incubator',
    badge: 'For University Incubators',
    image: '/images/campus_incubator.jpg',
    imageAlt: 'University Incubator Cohort and Innovation Ecosystem',
    imageTag: 'Cohort Deal-Flow',
    headline: 'Give your portfolio a path that doesn’t end at grants.',
    subheadline: 'Connect your university innovation center to a structured discovery funnel and an accredited investor network.',
    whoItsFor: 'University and campus incubators or innovation centres looking to give their portfolio founders a path beyond grant funding.',
    whatWeOffer: 'A partnership that plugs your existing deal flow into a structured discovery and evaluation funnel, and a compliant route to real investment capital for founders you already support.',
    stageLine: 'Stage: Pre-Seed to Seed Cohorts • Target Cheque: ₹2–5 Cr per team',
    routeLink: '/how-we-fund#incubator-portfolio',
    eligibilityNotice: {
      isFinalized: false,
      title: 'Partnership Framework',
      message: 'University-backed incubators, innovation cells, and research hubs can initiate a scoping inquiry to co-host hackathons and demo days.'
    },
    process: [
      { step: '01', title: 'Partner Inquiry', description: 'Submit an introductory partnership inquiry to initiate dialogue.' },
      { step: '02', title: 'Scoping Conversation', description: 'Introductory call to align on portfolio stage, focus areas, and discovery goals.' },
      { step: '03', title: 'Formal Agreement', description: 'Establish partnership terms and co-branded discovery timelines.' },
      { step: '04', title: 'Deal-Flow Integration', description: 'Seamlessly onboard your incubator cohort into the Campital pipeline.' },
      { step: '05', title: 'Joint Discovery Events', description: 'Host co-branded hackathons, demo days, and term-sheet pitch showcases.' }
    ],
    faqs: [
      {
        question: 'Does this replace our university grant programs?',
        answer: 'No—it is a complementary bridge. Once your founders exhaust non-dilutive grants, Campital provides the institutional equity conduit.'
      },
      {
        question: 'What sectors can our incubator cohort represent?',
        answer: 'All sectors. We support university incubators spanning engineering, bio-innovation, computing, clean-tech, and social enterprise.'
      },
      {
        question: 'What does our incubator gain from partnering?',
        answer: 'High investor visibility for your campus brand, higher follow-on funding conversion rates for your incubatees, and zero event organization overhead.'
      }
    ],
    cta: {
      label: 'Partner Your Incubator',
      action: 'open_inquiry_modal',
      inquiryType: 'incubator'
    }
  },

  sme: {
    key: 'sme',
    label: 'SME',
    badge: 'For Growing Enterprises',
    image: '/images/capital_bridge.jpg',
    imageAlt: 'Independent SME Growth Enterprise and Capital Bridge',
    imageTag: 'Growth Capital Conduit',
    headline: 'Running an SME? Apply directly—no incubator needed.',
    subheadline: 'Independent small and medium enterprises seeking growth capital through a bespoke evaluation process.',
    whoItsFor: 'Small and medium enterprises seeking growth capital, sourced independently—no incubator or campus affiliation required.',
    whatWeOffer: 'Direct evaluation and a route into Campital’s capital network. Funding structures are worked out case by case based on unit economics and cash flow.',
    stageLine: 'Stage: Established Revenue • Target Cheque: ₹5–10 Cr Growth',
    routeLink: '/how-we-fund#sme-growth',
    eligibilityNotice: {
      isFinalized: false,
      title: 'SME Direct Track Eligibility',
      message: 'Independent operating enterprises with demonstrated operational traction, positive unit economics, and expansion roadmaps.'
    },
    process: [
      { step: '01', title: 'Apply Directly', description: 'Submit your operational and financial growth requirements.' },
      { step: '02', title: 'Financial Evaluation', description: 'In-depth review of unit economics, working capital, and market expansion plan.' },
      { step: '03', title: 'Funding Structuring', description: 'Collaborative formulation of appropriate equity or structured growth capital.' },
      { step: '04', title: 'Capital Syndicate Introduction', description: 'Curated introductions to accredited growth investors and syndicates.' }
    ],
    faqs: [
      {
        question: 'How is this different from commercial bank debt?',
        answer: 'Campital connects you to institutional growth capital and equity syndicates, providing long-term strategic runway without burdensome collateral restrictions.'
      },
      {
        question: 'Do I need campus affiliation?',
        answer: 'No—the SME track is completely independent with zero campus or incubator requirements.'
      },
      {
        question: 'Are certain SME sectors preferred?',
        answer: 'We are sector-agnostic. We evaluate manufacturing, B2B services, supply-chain, retail brands, healthcare, and enterprise tech.'
      }
    ],
    cta: {
      label: 'Apply for SME Funding',
      action: 'open_inquiry_modal',
      inquiryType: 'sme'
    }
  },

  faculty: {
    key: 'faculty',
    label: 'Faculty & Researchers',
    badge: 'Coming soon',
    isComingSoon: true,
    image: '/images/campus_incubator.jpg',
    imageAlt: 'University Lab Research Commercialization and Academic Spin-offs',
    imageTag: 'Lab-to-Market',
    headline: 'Turn lab research into investable companies.',
    subheadline: 'We help academic founders structure spin-offs, assign IP cleanly, and access commercialization capital.',
    whoItsFor: 'Professors, PhD scholars, postdoctoral researchers, and university lab directors building deep-tech IP with commercial potential.',
    whatWeOffer: 'Specialized lab-to-market advisory, clean IP governance frameworks, founder-faculty equity splits, and dedicated deep-tech seed capital.',
    stageLine: 'Stage: Lab Validation to Commercial Pilot • Target Cheque: ₹2–5 Cr',
    routeLink: '/how-we-fund',
    eligibilityNotice: {
      isFinalized: false,
      title: 'Program in Pre-Launch Scoping',
      message: 'Faculty commercialization track is currently in closed design with partner institutions. Register interest below for early pilot cohort access.'
    },
    process: [
      { step: '01', title: 'Research Registration', description: 'Register your lab research area, IP status, and commercialization hypothesis.' },
      { step: '02', title: 'IP & Spin-Off Structuring', description: 'Guidance on institutional technology transfer, patent rights, and cap table design.' },
      { step: '03', title: 'Commercial Validation', description: 'Match with industry mentors and co-founders to validate customer demand.' },
      { step: '04', title: 'Deep-Tech Seed Route', description: 'Direct syndicate presentation to specialized deep-tech and institutional investors.' }
    ],
    faqs: [
      {
        question: 'How does Campital handle university IP rights?',
        answer: 'We assist faculty in navigating institutional Technology Transfer Offices (TTOs) to establish clear, compliant licensing or spin-off ownership.'
      },
      {
        question: 'Can I remain a full-time professor while launching?',
        answer: 'Yes. We help design executive co-founder structures where faculty maintain advisory/CTO roles while full-time operators drive commercial execution.'
      },
      {
        question: 'When will this track officially open?',
        answer: 'Early pilot cohorts will launch in 2026. Register your interest to be included in preliminary scoping workshops.'
      }
    ],
    cta: {
      label: 'Register Research Interest',
      action: 'open_inquiry_modal',
      inquiryType: 'faculty'
    }
  }
};

