/**
 * Personas Structured Data for /you-are page
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
    eligibilityNotice: {
      isFinalized: false,
      title: 'Eligibility Criteria Announcement',
      message: 'Eligibility criteria will be announced soon. Generally seeking early-stage, campus-affiliated ventures with dedicated founders.'
    },
    process: [
      { step: '01', title: 'Apply or Get Sourced', description: 'Apply directly or get nominated through a partner campus incubator.' },
      { step: '02', title: 'Evaluation (Pitch / Demo)', description: 'Participate in structured evaluation, hackathons, and pitch demo sessions.' },
      { step: '03', title: 'Shortlist', description: 'Selected high-potential teams receive investment-readiness scoring and term review.' },
      { step: '04', title: 'Capital Introduction', description: 'Compliant introductions to matching accredited investors and angel networks.' },
      { step: '05', title: 'Close', description: 'Execute agreements and close equity investment runway.' }
    ],
    faqs: [
      {
        question: 'Do I need to be part of an incubator to apply?',
        answer: 'No—most campus-based applicants come through a partner incubator, but you can also apply directly.'
      },
      {
        question: 'What stage does Campital fund?',
        answer: 'Primarily seed-stage.'
      },
      {
        question: 'Is there a fee?',
        answer: 'Yes—fee terms are laid out before you commit to anything.'
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
    eligibilityNotice: {
      isFinalized: false,
      title: 'Partnership Eligibility',
      message: 'Institutional partnership framework will be announced soon. University-backed incubators and innovation centers can initiate a scoping inquiry.'
    },
    process: [
      { step: '01', title: 'Partner Inquiry', description: 'Submit an introductory partnership inquiry to initiate dialogue.' },
      { step: '02', title: 'Scoping Conversation', description: 'Introductory call to align on portfolio stage, focus areas, and discovery goals.' },
      { step: '03', title: 'Formal Agreement', description: 'Establish partnership terms and co-branded discovery timelines.' },
      { step: '04', title: 'Deal-Flow Integration', description: 'Seamlessly onboard your incubator cohort into the Campital pipeline.' },
      { step: '05', title: 'Joint Discovery Events (Ongoing)', description: 'Host hackathons, demo days, and term-sheet pitch showcases.' }
    ],
    faqs: [
      {
        question: 'Does this replace our grant programs?',
        answer: 'No—it’s a complementary path for founders who are ready for equity funding, not a substitute for grants.'
      },
      {
        question: 'What does our incubator get out of it?',
        answer: 'Partnership benefits and commercial arrangements are discussed during the scoping conversation.'
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
    whatWeOffer: 'Direct evaluation and a route into Campital’s capital network. Funding structures are worked out case by case rather than following one fixed template.',
    eligibilityNotice: {
      isFinalized: false,
      title: 'SME Direct Track Eligibility',
      message: 'SME evaluation criteria will be announced soon. Independent operating enterprises with validated business models are eligible to apply.'
    },
    process: [
      { step: '01', title: 'Apply Directly', description: 'Submit your organization details and growth funding requirements.' },
      { step: '02', title: 'Evaluation', description: 'Direct evaluation of financial traction, market potential, and capital readiness.' },
      { step: '03', title: 'Funding-Structure Discussion', description: 'Collaborative formulation of appropriate investment structuring.' },
      { step: '04', title: 'Capital Introduction', description: 'Curated introductions to tailored capital providers and growth investors.' }
    ],
    faqs: [
      {
        question: 'How is this different from a bank loan?',
        answer: 'Campital connects you to investment capital, not debt financing.'
      },
      {
        question: 'Do I need to be campus-affiliated?',
        answer: 'No—this track has no incubator or campus involvement at any stage.'
      }
    ],
    cta: {
      label: 'Apply for SME Funding',
      action: 'open_inquiry_modal',
      inquiryType: 'sme'
    }
  }
};
