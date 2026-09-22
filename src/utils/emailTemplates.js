import { CAMPITAL_CONTACT_EMAIL, INQUIRY_TYPES } from '../config/emailConfig';

/**
 * Generate email subject line based on inquiry type and form fields
 */
export const buildEmailSubject = (typeKey, { name, organization, partnerType }) => {
  const normalizedKey = (typeKey || 'general').toUpperCase();
  const config = INQUIRY_TYPES[normalizedKey] || INQUIRY_TYPES.GENERAL;

  if (typeKey === 'partner' || typeKey === 'partnerships') {
    if (partnerType === 'Capital') return `[Campital Capital Partnership] — ${organization || name || 'Capital Provider'}`;
    if (partnerType === 'Institutional') return `[Campital Institutional Partnership] — ${organization || name || 'University Incubator'}`;
    if (partnerType === 'Corporate-Ecosystem') return `[Campital Corporate-Ecosystem Partnership] — ${organization || name || 'Corporate Partner'}`;
    return `[Campital Partnership Inquiry] — ${organization || name || 'Partner Organization'}`;
  }

  return config.subjectTemplate(name, organization);
};

export const buildEmailBody = (inquiryTypeLabel, formData) => {
  const {
    name,
    email,
    organization,
    partnerType,
    message,
    oneSentencePitch,
    stage,
    campusAffiliation,
    foundersBackground,
    problemAndCustomer,
    traction,
    targetRaiseAndUse,
    priorFunding,
    productStatus,
    whyNow,
  } = formData;

  const currentDate = new Date().toISOString().split('T')[0];
  const isStartup = inquiryTypeLabel?.toLowerCase().includes('startup') || formData.inquiryType === 'startup';

  const lines = [
    '========================================',
    'CAMPITAL PLATFORM INQUIRY',
    '========================================',
    '',
    `Inquiry Type:  ${inquiryTypeLabel || 'General Inquiry'}`,
    partnerType ? `Partner Track: ${partnerType}` : null,
    `Name:          ${name || 'N/A'}`,
    `Organization:  ${organization || 'N/A'}`,
    `Contact Email: ${email || 'N/A'}`,
    `Date:          ${currentDate}`,
    '',
    '----------------------------------------',
    'MESSAGE / CORE OVERVIEW:',
    '----------------------------------------',
    message || 'N/A',
  ];

  if (
    isStartup ||
    oneSentencePitch ||
    stage ||
    campusAffiliation ||
    foundersBackground ||
    problemAndCustomer ||
    traction ||
    targetRaiseAndUse ||
    priorFunding ||
    productStatus ||
    whyNow
  ) {
    lines.push(
      '',
      '========================================',
      'STARTUP SCREENING & EVALUATION DETAILS:',
      '========================================',
      '',
      '1. One-Sentence Pitch:',
      `   ${oneSentencePitch || 'N/A'}`,
      '',
      '2. Venture Stage:',
      `   ${stage || 'N/A'}`,
      '',
      '3. Campus Incubator / University Affiliation:',
      `   ${campusAffiliation || 'N/A'}`,
      '',
      '4. Founding Team & Background/Roles:',
      `   ${foundersBackground || 'N/A'}`,
      '',
      '5. Problem Solving & Target Customer:',
      `   ${problemAndCustomer || 'N/A'}`,
      '',
      '6. Real Traction (Users, Revenue, Pilots, LOIs, Waitlist):',
      `   ${traction || 'N/A'}`,
      '',
      '7. Target Fundraise & Allocation (What it will fund):',
      `   ${targetRaiseAndUse || 'N/A'}`,
      '',
      '8. Prior Funding History (Grants, Angels, Prior Round):',
      `   ${priorFunding || 'N/A'}`,
      '',
      '9. Product Status (Working Product vs Concept/Deck):',
      `   ${productStatus || 'N/A'}`,
      '',
      '10. Why Now (Inflection Point / Market Catalyst):',
      `   ${whyNow || 'N/A'}`
    );
  }

  lines.push(
    '',
    '========================================',
    'Prepared via Campital (Static Web Portal)',
    '========================================'
  );

  return lines.filter((line) => line !== null).join('\n');
};

/**
 * Build the complete mailto: URL with safe URL encoding
 */
export const generateMailtoUrl = ({ recipient = CAMPITAL_CONTACT_EMAIL, subject, body }) => {
  const encodedSubject = encodeURIComponent(subject || 'Campital Inquiry');
  const encodedBody = encodeURIComponent(body || '');
  return `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Build copyable plain-text summary (Recipient + Subject + Body)
 */
export const buildClipboardSummary = ({ recipient = CAMPITAL_CONTACT_EMAIL, subject, body }) => {
  return `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
};

