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
  const fromAddress = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  let status = 'SENT';
  let externalId = null;
  let errorMsg = null;

  if (resendClient) {
    try {
      const { data, error } = await resendClient.emails.send({
        from: fromAddress,
        to: [to],
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
      // In Resend sandbox mode, if the recipient is unverified, fallback to mock so lead flow continues
    }
  } else if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to,
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
  await db.emailLogs.create({
    leadId,
    recipient: to,
    templateName,
    subject,
    status,
    externalId,
    error: errorMsg,
  });

  return { status, externalId };
}

export const emailService = {
  /**
   * 1. Send Applicant Acknowledgment Email
   */
  async sendApplicantAcknowledgment(lead) {
    const isStartup = lead.personaType === 'STARTUP';
    const title = isStartup ? 'Startup Application Received' : 'Partnership Scoping Received';

    const bodyHtml = `
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Dear ${lead.fullName},</h2>
      <p>Thank you for submitting <strong>${lead.organizationName}</strong> to Campital's evaluation pipeline.</p>
      <p>Our deal discovery team and evaluation committee review incoming venture dossiers on a weekly rolling basis.</p>
      
      <div class="meta-box">
        <div class="meta-row"><span class="meta-label">Reference ID:</span><span class="meta-value">#CAMP-${lead.leadNumber || 'NEW'}</span></div>
        <div class="meta-row"><span class="meta-label">Venture / Organization:</span><span class="meta-value">${lead.organizationName}</span></div>
        <div class="meta-row"><span class="meta-label">Track:</span><span class="meta-value">${lead.personaType}</span></div>
        ${lead.targetCheque ? `<div class="meta-row"><span class="meta-label">Target Cheque:</span><span class="meta-value">${lead.targetCheque}</span></div>` : ''}
        ${lead.campusAffiliation ? `<div class="meta-row"><span class="meta-label">Campus Affiliation:</span><span class="meta-value">${lead.campusAffiliation}</span></div>` : ''}
      </div>

      <h3 style="color: #0f172a; font-size: 16px; margin-top: 24px;">What happens next?</h3>
      <ol style="padding-left: 20px; color: #475569;">
        <li><strong>Metrics & Screening Review:</strong> Our team assesses problem defensibility, product stage, and campus origination.</li>
        <li><strong>Evaluation Committee:</strong> Shortlisted teams will be invited to a discovery session or upcoming Campital Demo Day.</li>
        <li><strong>Status Update:</strong> Expect a direct follow-up from our deal desk within <strong>5 to 7 business days</strong>.</li>
      </ol>
      <p>If you have urgent updates or new traction data to share, simply reply directly to this email.</p>
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
    const adminUrl = `${process.env.CLIENT_ORIGIN || 'http://localhost:3000'}/admin/leads/${lead.id}`;
    const to = process.env.CENTRAL_TEAM_EMAIL || 'team@campital.in';

    const bodyHtml = `
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">🚨 New Lead Intake: ${lead.organizationName}</h2>
      <p>A new applicant has completed the intake funnel on Campital.</p>
      
      <div class="meta-box">
        <div class="meta-row"><span class="meta-label">Lead Ref:</span><span class="meta-value">#CAMP-${lead.leadNumber || 'NEW'}</span></div>
        <div class="meta-row"><span class="meta-label">Applicant Name:</span><span class="meta-value">${lead.fullName} (${lead.email})</span></div>
        <div class="meta-row"><span class="meta-label">Track:</span><span class="meta-value">${lead.personaType}</span></div>
        <div class="meta-row"><span class="meta-label">Venture:</span><span class="meta-value">${lead.organizationName}</span></div>
        <div class="meta-row"><span class="meta-label">Campus:</span><span class="meta-value">${lead.campusAffiliation || 'N/A'}</span></div>
        <div class="meta-row"><span class="meta-label">Cheque Target:</span><span class="meta-value">${lead.targetCheque || 'N/A'}</span></div>
        <div class="meta-row"><span class="meta-label">Stage:</span><span class="meta-value">${lead.ventureStage || 'N/A'}</span></div>
      </div>

      ${lead.pitchHeadline ? `<p><strong>Pitch Headline:</strong> <em>"${lead.pitchHeadline}"</em></p>` : ''}
      ${lead.tractionMetrics ? `<p><strong>Traction:</strong> ${lead.tractionMetrics}</p>` : ''}
      ${lead.pitchDeckUrl ? `<p><strong>Deck Uploaded:</strong> <a href="${lead.pitchDeckUrl}" target="_blank">Download Pitch Deck</a></p>` : ''}

      <p style="margin-top: 24px;">Click below to view the full 10-point screening report and assign to deal reviewer:</p>
    `;

    const html = wrapEmailHtml({
      title: `New Lead: ${lead.organizationName}`,
      bodyHtml,
      ctaText: 'Open in Campital CRM',
      ctaUrl: adminUrl,
    });

    return sendEmail({
      to,
      subject: `🔥 New Lead #${lead.leadNumber || 'NEW'} (${lead.personaType}): ${lead.organizationName} - ${lead.fullName}`,
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

