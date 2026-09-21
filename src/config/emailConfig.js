/**
 * Zero-Backend Email System Configuration
 * Configure the recipient email and default templates.
 */

// Central recipient address - replace with approved public email when ready
export const CAMPITAL_CONTACT_EMAIL = 'REPLACE_WITH_APPROVED_PUBLIC_EMAIL';

export const IS_PLACEHOLDER_EMAIL = CAMPITAL_CONTACT_EMAIL === 'REPLACE_WITH_APPROVED_PUBLIC_EMAIL';

export const INQUIRY_TYPES = {
  STARTUP: {
    id: 'startup',
    label: 'Startup Funding Application',
    subjectTemplate: (name, org) => `[Campital Funding Inquiry] — ${name || 'Applicant'}${org ? ` (${org})` : ''}`,
    defaultDescription: 'Early-stage campus-connected startup applying for evaluation and seed capital introduction.',
  },
  SME: {
    id: 'sme',
    label: 'SME Direct Funding Application',
    subjectTemplate: (name, org) => `[Campital SME Funding Inquiry] — ${org || name || 'SME Organization'}`,
    defaultDescription: 'Independent SME applying for direct evaluation and tailored growth capital introduction.',
  },
  INCUBATOR: {
    id: 'incubator',
    label: 'Campus Incubator Partnership',
    subjectTemplate: (name, org) => `[Campital Incubator Partnership] — ${org || name || 'Campus Incubator'}`,
    defaultDescription: 'University incubator or innovation centre exploring deal-flow integration and joint discovery.',
  },
  CAPITAL: {
    id: 'capital',
    label: 'Capital Partner Inquiry',
    subjectTemplate: (name, org) => `[Campital Capital Partnership] — ${org || name || 'Capital Provider'}`,
    defaultDescription: 'Accredited investor or fund exploring vetted pipeline deal-flow.',
  },
  CORPORATE: {
    id: 'corporate',
    label: 'Corporate / Ecosystem Partnership',
    subjectTemplate: (name, org) => `[Campital Corporate-Ecosystem Partnership] — ${org || name || 'Corporate Partner'}`,
    defaultDescription: 'Corporate or innovation partner offering mentorship, market access, or ecosystem support.',
  },
  GENERAL: {
    id: 'general',
    label: 'General Inquiry',
    subjectTemplate: (name) => `[Campital Inquiry] — ${name || 'General Inquiry'}`,
    defaultDescription: 'General inquiry or feedback about Campital.',
  }
};
