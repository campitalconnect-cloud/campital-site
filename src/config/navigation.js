/**
 * Global Navigation & CTA Configuration
 * Centralized links, primary/secondary action destinations
 */

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'You Are', path: '/you-are' },
  { label: 'Partnerships', path: '/partnerships' },
];

export const FOOTER_LINKS = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'You Are', path: '/you-are' },
    { label: 'Partnerships', path: '/partnerships' },
  ],
  personas: [
    { label: 'For Startups', path: '/you-are?persona=startup' },
    { label: 'For Campus Incubators', path: '/you-are?persona=incubator' },
    { label: 'For SMEs', path: '/you-are?persona=sme' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms-of-service' },
  ],
};

export const CTA_ACTIONS = {
  GET_FUNDED: {
    label: 'Get Funded',
    path: '/you-are?persona=startup',
  },
  BECOME_PARTNER: {
    label: 'Become a Partner',
    path: '/partnerships#inquiry',
  },
  PARTNER_INCUBATOR: {
    label: 'Partner Your Incubator',
    path: '/you-are?persona=incubator',
  },
  APPLY_SME: {
    label: 'Apply for SME Funding',
    path: '/you-are?persona=sme',
  },
  APPLY_STARTUP: {
    label: 'Apply for Funding',
    inquiryType: 'startup',
  },
};
