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

/**
 * Generate formatted plain-text email body
 */
export const buildEmailBody = (inquiryTypeLabel, { name, email, organization, partnerType, message }) => {
  const currentDate = new Date().toISOString().split('T')[0];

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
    'MESSAGE / DETAILS:',
    '----------------------------------------',
    message || '',
    '',
    '========================================',
    'Prepared via Campital (Static Web Portal)',
    '========================================'
  ].filter(Boolean);

  return lines.join('\n');
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
