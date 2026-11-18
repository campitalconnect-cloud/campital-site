import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { db } from '../db.js';

let resendClient = null;
let transporter = null;

if (process.env.RESEND_API_KEY) {
  try {
    resendClient = new Resend(process.env.RESEND_API_KEY);
    console.log('⚡ Resend Email SDK connected.');
  } catch (err) {
    console.warn('⚠️ Resend SDK initialization failed:', err.message);
  }
}

// Initialize Nodemailer if SMTP credentials are provided
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('📧 SMTP Email Transporter connected.');
  } catch (err) {
    console.warn('⚠️ SMTP Transporter initialization failed:', err.message);
  }
} else if (!resendClient) {
  console.log('ℹ️ No active SMTP or Resend credentials in server/.env. Automated emails will be safely logged to DB & console (Mock mode).');
}

/**
 * Base email layout with modern Campital styling
 */
function wrapEmailHtml({ title, preheader, bodyHtml, ctaText, ctaUrl }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070D1E; color: #1e293b; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
    .header { background: linear-gradient(135deg, #070D1E 0%, #1264FF 100%); padding: 32px 28px; text-align: left; }
    .brand { color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin: 0; }
    .tagline { color: #93c5fd; font-size: 13px; margin-top: 4px; font-weight: 500; }
    .content { padding: 32px 28px; line-height: 1.65; font-size: 15px; color: #334155; }
    .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; }
    .meta-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .meta-row:last-child { border-bottom: none; }
    .meta-label { color: #64748b; font-weight: 600; }
    .meta-value { color: #0f172a; font-weight: 700; text-align: right; }
    .btn { display: inline-block; background: #0052FF; color: #ffffff !important; padding: 12px 26px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 20px; }
    .footer { background: #f1f5f9; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="brand">Campital</h1>
      <div class="tagline">Campus + Capital = Institutional Venture Network</div>
    </div>
    <div class="content">
      ${bodyHtml}
      ${ctaText && ctaUrl ? `<div style="text-align: center;"><a href="${ctaUrl}" class="btn">${ctaText}</a></div>` : ''}
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px 0;">Campital Evaluation & Capital Introduction Platform</p>
      <p style="margin: 0;">Bhive, Ground Floor, JBR Tech Park, Whitefield, Bengaluru 560066</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Universal sender function with DB logging
 */
async function sendEmail({ to, subject, html, templateName, leadId = null }) {
  const fromAddress = process.env.EMAIL_FROM || 'Campital Deal Desk <team@campital.in>';
  let status = 'SENT';
  let externalId = null;
  let errorMsg = null;

  if (resendClient) {
    try {
      const { data, error } = await resendClient.emails.send({
        from: fromAddress,
        to: [to],
        reply_to: 'team@campital.in',
        subject,
        html,
      });

      if (error) {
        throw new Error(error.message || JSON.stringify(error));
      }

      externalId = data?.id;
      console.log(`✉️ [Resend] Dispatched to ${to} (${subject}) - ID: ${externalId}`);
    } catch (err) {
      status = 'FAILED';
      errorMsg = err.message;
      console.warn(`❌ [Resend] Dispatch warning to ${to}:`, err.message);
    }
  } else if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to,
        replyTo: 'team@campital.in',
        subject,
        html,
      });
      externalId = info.messageId;
      console.log(`✉️ Email dispatched to ${to} (${subject}) - ID: ${externalId}`);
    } catch (err) {
      status = 'FAILED';
      errorMsg = err.message;
      console.error(`❌ Email dispatch failed to ${to}:`, err.message);
    }
  } else {
    // Mock dispatch mode
    console.log(`[MOCK EMAIL DISPATCH] To: ${to} | Subject: "${subject}" | Template: ${templateName}`);
    status = 'LOGGED_MOCK';
  }

  // Record in Database
  try {
    await db.emailLogs.create({
      leadId,
      recipient: to,
      templateName,
      subject,
      status,
      externalId,
      error: errorMsg,
    });
  } catch (logErr) {
    console.warn('Email log write warning:', logErr.message);
  }

  return { status, externalId };
}

export const emailService = {
  /**
   * 1. Send Applicant Acknowledgment Email
   */
  async sendApplicantAcknowledgment(lead) {
    const isStartup = lead.personaType === 'STARTUP';
    const title = isStartup ? 'Application Received - Campital Deal Desk' : 'Partnership Scoping Received - Campital';

    const bodyHtml = `
      <div style="margin-bottom: 24px;">
        <span style="display: inline-block; background-color: #EFF6FF; color: #0052FF; border: 1px solid #BFDBFE; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 9999px;">
          Official Submission Confirmation
        </span>
      </div>

      <h2 style="color: #0f172a; margin: 0 0 12px 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">
        Dear ${lead.fullName},
      </h2>
      <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.6;">
        Thank you for submitting <strong>${lead.organizationName}</strong> to the Campital Institutional Venture Network. Your application has been logged into our centralized screening database.
      </p>

      <div class="meta-box" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
          Submission Dossier Summary
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Reference ID:</span>
          <span class="meta-value" style="color: #0052FF; font-weight: 800;">#CAMP-${lead.leadNumber || 'NEW'}</span>
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Venture / Entity:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.organizationName}</span>
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Evaluation Track:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.personaType}</span>
        </div>
        ${lead.targetCheque ? `
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Target Cheque:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.targetCheque}</span>
        </div>` : ''}
        ${lead.campusAffiliation ? `
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 7px 0; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Campus Affiliation:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.campusAffiliation}</span>
        </div>` : ''}
      </div>

      <h3 style="color: #0f172a; font-size: 16px; margin: 24px 0 12px 0; font-weight: 700;">What happens next?</h3>
      <ol style="padding-left: 20px; color: #475569; margin: 0 0 20px 0; line-height: 1.7; font-size: 14px;">
        <li><strong>Quantitative & Metrics Screening:</strong> Our deal discovery team reviews problem defensibility, product stage, and IP origination against our rubric.</li>
        <li><strong>Deal Committee Evaluation:</strong> High-scoring applications are reviewed for syndication or an invite to an upcoming Campital Demo Day.</li>
        <li><strong>Direct Status Update:</strong> Expect a direct follow-up from our team at <a href="mailto:team@campital.in" style="color: #0052FF; text-decoration: none; font-weight: 600;">team@campital.in</a> within <strong>5 to 7 business days</strong>.</li>
      </ol>

      <p style="margin: 0; color: #64748B; font-size: 13px; line-height: 1.6; border-top: 1px solid #E2E8F0; padding-top: 16px;">
        Need to share an updated deck, financial model, or milestone traction? Simply reply directly to this email and reference <strong>#CAMP-${lead.leadNumber || 'NEW'}</strong>.
      </p>
    `;

    const html = wrapEmailHtml({
      title,
      bodyHtml,
    });

    return sendEmail({
      to: lead.email,
      subject: `[Campital] Application Received: ${lead.organizationName} (#CAMP-${lead.leadNumber || 'NEW'})`,
      html,
      templateName: 'APPLICANT_ACKNOWLEDGMENT',
      leadId: lead.id,
    });
  },

  /**
   * 2. Send Deal Team Internal Alert
   */
  async sendDealTeamAlert(lead) {
    const baseUrl = (process.env.CLIENT_ORIGIN && !process.env.CLIENT_ORIGIN.includes('localhost'))
      ? process.env.CLIENT_ORIGIN
      : 'https://www.campital.in';
    const adminUrl = `${baseUrl}/portal-desk-92`;
    const to = process.env.CENTRAL_TEAM_EMAIL || 'team@campital.in';

    const bodyHtml = `
      <div style="margin-bottom: 16px;">
        <span style="display: inline-block; background-color: #FEF3C7; color: #92400E; border: 1px solid #FDE68A; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 9999px;">
          Confidential • New Inbound Dossier
        </span>
      </div>

      <h2 style="color: #0f172a; margin: 0 0 8px 0; font-size: 22px; font-weight: 900; letter-spacing: -0.02em;">
        ${lead.organizationName}
      </h2>
      <p style="margin: 0 0 20px 0; color: #64748B; font-size: 14px;">
        Submitted by <strong>${lead.fullName}</strong> (${lead.email}${lead.phone ? ' • ' + lead.phone : ''})
      </p>
      
      <div class="meta-box" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
          Deal Intake Metrics
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Reference ID:</span>
          <span class="meta-value" style="color: #0052FF; font-weight: 800;">#CAMP-${lead.leadNumber || 'NEW'}</span>
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Origination Track:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.personaType}</span>
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Campus / Lab Affiliation:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.campusAffiliation || 'Direct Inbound'}</span>
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Venture Stage:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.ventureStage || 'Early Stage'}</span>
        </div>
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Target Cheque:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.targetCheque || 'Open'}</span>
        </div>
        ${lead.priorFunding ? `
        <div class="meta-row" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px;">
          <span class="meta-label" style="color: #64748B; font-weight: 600;">Prior Funding:</span>
          <span class="meta-value" style="color: #0F172A; font-weight: 700;">${lead.priorFunding}</span>
        </div>` : ''}
      </div>

      ${lead.pitchHeadline ? `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 4px;">Executive Pitch</div>
        <p style="margin: 0; color: #0F172A; font-size: 15px; font-weight: 600; font-style: italic;">"${lead.pitchHeadline}"</p>
      </div>` : ''}

      ${lead.problemCustomer ? `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 4px;">Target Problem & Customer</div>
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">${lead.problemCustomer}</p>
      </div>` : ''}

      ${lead.tractionMetrics ? `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 4px;">Traction & Key Metrics</div>
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">${lead.tractionMetrics}</p>
      </div>` : ''}

      ${lead.founderBackground ? `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 4px;">Founder Pedigree & Background</div>
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">${lead.founderBackground}</p>
      </div>` : ''}

      ${lead.pitchDeckUrl ? `
      <div style="margin: 20px 0; padding: 14px 18px; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px;">
        <strong style="color: #1E40AF; font-size: 13px;">📎 Pitch Deck Attached:</strong>
        <a href="${lead.pitchDeckUrl}" target="_blank" style="margin-left: 8px; color: #0052FF; font-weight: 700; text-decoration: underline; font-size: 13px;">
          Download / Inspect Deck Document ↗
        </a>
      </div>` : ''}

      ${lead.generalMessage ? `
      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 4px;">Submitter Message</div>
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${lead.generalMessage}</p>
      </div>` : ''}

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center;">
        <p style="margin: 0 0 16px 0; color: #475569; font-size: 14px; font-weight: 600;">
          Access the Deal Desk console to evaluate this submission, assign a reviewer, or dispatch a direct reply:
        </p>
      </div>
    `;

    const html = wrapEmailHtml({
      title: `Deal Alert: ${lead.organizationName}`,
      bodyHtml,
      ctaText: 'Access Deal Desk Console',
      ctaUrl: adminUrl,
    });

    return sendEmail({
      to,
      subject: `[Campital Deal Desk] 📥 New Inbound Dossier: ${lead.organizationName} (#CAMP-${lead.leadNumber || 'NEW'}) • ${lead.personaType}`,
      html,
      templateName: 'DEAL_TEAM_ALERT',
      leadId: lead.id,
    });
  },

  /**
   * 3. Send Status Progression Notification
   */
  async sendStatusUpdate(lead, newStatus, customNote = '') {
    const statusTitles = {
      SHORTLISTED: 'Your venture has been Shortlisted for Campital Evaluation',
      EVALUATION_SCHEDULED: 'Invitation to Campital Discovery Session / Demo Day',
      MORE_INFO_REQUESTED: 'Campital Deal Desk: Additional Information Requested',
      DUE_DILIGENCE: 'Campital Pipeline: Due Diligence Commenced',
      TERM_SHEET_ISSUED: 'Campital Capital Partner: Term Sheet Stage',
      ARCHIVED_REJECTED: 'Update regarding your Campital application',
    };

    const subject = statusTitles[newStatus] || `Campital Status Update: ${lead.organizationName}`;

    const bodyHtml = `
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Dear ${lead.fullName},</h2>
      <p>We are writing to inform you that your application for <strong>${lead.organizationName}</strong> has been updated to:</p>
      
      <div style="background: #eff6ff; border-left: 4px solid #0052FF; padding: 14px 18px; border-radius: 4px; margin: 18px 0; font-weight: 700; color: #1e40af; font-size: 16px;">
        Status: ${newStatus.replace(/_/g, ' ')}
      </div>

      ${customNote ? `<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 16px 0; color: #334155;">${customNote}</div>` : ''}

      <p>Our investment committee will be in touch with any subsequent scheduling or document requests.</p>
    `;

    const html = wrapEmailHtml({
      title: subject,
      bodyHtml,
    });

    return sendEmail({
      to: lead.email,
      subject: `[Campital] ${subject}`,
      html,
      templateName: `STATUS_${newStatus}`,
      leadId: lead.id,
    });
  },

  /**
   * 4. Newsletter Subscription Acknowledgment
   */
  async sendNewsletterWelcome(email) {
    const bodyHtml = `
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Welcome to The Campital Brief</h2>
      <p>You have been added to our monthly intelligence bulletin covering institutional campus venture rounds, open demo calls, and founder stories.</p>
      <p>Expect high-signal analysis directly from our research desk.</p>
    `;

    const html = wrapEmailHtml({
      title: 'Welcome to The Campital Brief',
      bodyHtml,
    });

    return sendEmail({
      to: email,
      subject: `[Campital] Welcome to The Campital Brief`,
      html,
      templateName: 'NEWSLETTER_WELCOME',
    });
  },

  /**
   * 5. Event Registration Acknowledgment
   */
  async sendEventConfirmation(eventReg) {
    const bodyHtml = `
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Calendar Priority Alert Confirmed</h2>
      <p>Hello ${eventReg.fullName},</p>
      <p>You are registered for priority notifications regarding Campital's <strong>2026 Programs & Events Calendar</strong> (${eventReg.trackInterest || 'All Tracks'}).</p>
      <p>We will notify you the moment registration dates and incubator partner tracks go live.</p>
    `;

    const html = wrapEmailHtml({
      title: 'Event Priority Confirmation',
      bodyHtml,
    });

    return sendEmail({
      to: eventReg.email,
      subject: `[Campital] 2026 Calendar Rollout Priority Access Confirmed`,
      html,
      templateName: 'EVENT_REGISTRATION',
    });
  },

  /**
   * 6. Direct Reply from Lead Desk
   */
  async sendDirectLeadReply(lead, { subject, message, replyBy = 'Campital Deal Desk' }) {
    const bodyHtml = `
      <p>Dear ${lead.fullName},</p>
      <div style="background: #f8fafc; border-left: 4px solid #0052FF; padding: 16px 20px; margin: 20px 0; border-radius: 6px; font-size: 15px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${message}</div>
      <div class="meta-box">
        <div class="meta-row">
          <span class="meta-label">Regarding:</span>
          <span class="meta-value">${lead.organizationName}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Reference ID:</span>
          <span class="meta-value">#CAMP-${lead.leadNumber || 'APP'}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Desk Representative:</span>
          <span class="meta-value">${replyBy}</span>
        </div>
      </div>
      <p>Warm regards,<br/><strong>${replyBy}</strong><br/>Campital Deal Desk &bull; <a href="mailto:campital.connect@gmail.com" style="color:#0052FF;">campital.connect@gmail.com</a></p>
    `;

    const html = wrapEmailHtml({
      title: subject || `Update regarding ${lead.organizationName}`,
      bodyHtml,
    });

    return sendEmail({
      to: lead.email,
      subject: subject || `[Campital] Message regarding your application: ${lead.organizationName} (#CAMP-${lead.leadNumber || 'APP'})`,
      html,
      templateName: 'DIRECT_REPLY',
      leadId: lead.id
    });
  }
};

