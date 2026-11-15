import { db } from '../db.js';
import { emailService } from '../services/emailService.js';

export const leadsController = {
  /**
   * Public: Submit new lead / application
   */
  async submitLead(req, res) {
    try {
      const {
        fullName,
        email,
        phone,
        organizationName,
        campusAffiliation,
        personaType = 'STARTUP',
        linkedinUrl,
        websiteUrl,
        pitchHeadline,
        ventureStage,
        productStatus,
        problemCustomer,
        tractionMetrics,
        founderBackground,
        targetCheque,
        useOfFunds,
        priorFunding,
        whyNow,
        pitchDeckUrl,
        partnerCategory,
        generalMessage
      } = req.body;

      if (!fullName || !fullName.trim()) {
        return res.status(400).json({ error: 'Full Name is required.' });
      }
      if (!email || !email.trim() || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }
      if (!organizationName || !organizationName.trim()) {
        return res.status(400).json({ error: 'Organization or Venture Name is required.' });
      }

      // 1. Create Lead in Database (Neon DB or Store)
      const lead = await db.leads.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        organizationName: organizationName.trim(),
        campusAffiliation: campusAffiliation ? campusAffiliation.trim() : null,
        personaType: personaType.toUpperCase(),
        status: 'NEW',
        linkedinUrl: linkedinUrl ? linkedinUrl.trim() : null,
        websiteUrl: websiteUrl ? websiteUrl.trim() : null,
        pitchHeadline: pitchHeadline ? pitchHeadline.trim() : null,
        ventureStage: ventureStage || null,
        productStatus: productStatus || null,
        problemCustomer: problemCustomer ? problemCustomer.trim() : null,
        tractionMetrics: tractionMetrics ? tractionMetrics.trim() : null,
        founderBackground: founderBackground ? founderBackground.trim() : null,
        targetCheque: targetCheque || null,
        useOfFunds: useOfFunds ? useOfFunds.trim() : null,
        priorFunding: priorFunding || null,
        whyNow: whyNow ? whyNow.trim() : null,
        pitchDeckUrl: pitchDeckUrl || null,
        partnerCategory: partnerCategory || null,
        generalMessage: generalMessage ? generalMessage.trim() : null
      });

      // 2. Record initial history event
      await db.history.create({
        leadId: lead.id,
        fromStatus: 'NEW',
        toStatus: 'NEW',
        changedById: 'SYSTEM_INTAKE',
        note: 'Lead intake submitted via website funnel.'
      });

      // 3. Dispatch Automated Emails in background
      Promise.all([
        emailService.sendApplicantAcknowledgment(lead).catch(e => console.warn('Applicant email error:', e)),
        emailService.sendDealTeamAlert(lead).catch(e => console.warn('Deal team email error:', e))
      ]);

      return res.status(201).json({
        success: true,
        message: 'Application received successfully.',
        leadReference: `#CAMP-${lead.leadNumber || 'NEW'}`,
        leadId: lead.id
      });
    } catch (err) {
      console.error('Lead submission error:', err);
      return res.status(500).json({ error: 'Internal server error processing application.' });
    }
  },

  /**
   * Public: Upload Pitch Deck file
   */
  async uploadPitchDeck(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file was uploaded.' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      return res.status(200).json({
        success: true,
        fileUrl,
        originalName: req.file.originalname,
        size: req.file.size
      });
    } catch (err) {
      console.error('Pitch deck upload error:', err);
      return res.status(500).json({ error: 'Failed to upload pitch deck.' });
    }
  }
};

