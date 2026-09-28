/**
 * Global Navigation & CTA Configuration (v2)
 * Centralized links, primary/secondary action destinations
 */

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'You Are', path: '/you-are' },
  { label: 'How We Fund', path: '/how-we-fund' },
  { label: 'Programs & Events', path: '/programs-events' },
  { label: 'Partnerships', path: '/partnerships' },
  { label: 'Insights', path: '/insights' },
];


export const FOOTER_LINKS = {
  platform: [
    { label: 'How We Fund', path: '/how-we-fund' },
    { label: 'Programs & Events', path: '/programs-events' },
    { label: 'Insights & Research', path: '/insights' },
    { label: 'Founder Journey', path: '/#founder-journey' },
  ],
  pathways: [
    { label: 'Startups (₹2–5 Cr)', path: '/you-are?persona=startup' },
    { label: 'Campus Incubators', path: '/you-are?persona=incubator' },
    { label: 'SME Growth (₹5–10 Cr)', path: '/you-are?persona=sme' },
    { label: 'Faculty & Lab IP', path: '/you-are?persona=faculty' },
  ],
  company: [
    { label: 'About Us', path: '/about-us' },
    { label: 'Founding Team', path: '/about-us#team' },
    { label: 'Partnerships', path: '/partnerships' },
    { label: 'Sponsor a Track', path: '/partnerships#inquiry' },
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
    path: '/you-are?persona=startup',
  },
  REGISTER_FACULTY: {
    label: 'Register Interest',
    path: '/you-are?persona=faculty',
  },
};

