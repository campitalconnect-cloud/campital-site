import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { emailService } from '../services/emailService.js';

export const adminController = {
  /**
   * Admin Login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const user = await db.adminUsers.findByEmail(email.trim());
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'Invalid admin credentials or inactive account.' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid admin credentials.' });
      }

      const jwtSecret = process.env.JWT_SECRET || 'campital_dev_jwt_secret_998877665544332211';
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error('Admin login error:', err);
      return res.status(500).json({ error: 'Server error during login.' });
    }
  },

  /**
   * Get Current Admin Profile
   */
  async getProfile(req, res) {
    return res.status(200).json({ success: true, user: req.adminUser });
  },

  /**
   * Get Leads (Filterable, Searchable)
   */
  async getLeads(req, res) {
    try {
      const { status, personaType, search } = req.query;
      let leads = await db.leads.findMany();

      if (status && status !== 'ALL') {
        leads = leads.filter(l => l.status === status);
      }
      if (personaType && personaType !== 'ALL') {
        leads = leads.filter(l => l.personaType === personaType);
      }
      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        leads = leads.filter(l =>
          (l.fullName && l.fullName.toLowerCase().includes(query)) ||
          (l.email && l.email.toLowerCase().includes(query)) ||
          (l.organizationName && l.organizationName.toLowerCase().includes(query)) ||
          (l.campusAffiliation && l.campusAffiliation.toLowerCase().includes(query))
        );
      }

      return res.status(200).json({
        success: true,
        count: leads.length,
        leads
      });
    } catch (err) {
      console.error('Error fetching leads:', err);
      return res.status(500).json({ error: 'Failed to fetch leads.' });
    }
  },

  /**
   * Get Lead by ID (Full Detail)
   */
  async getLeadById(req, res) {
    try {
      const { id } = req.params;
      const lead = await db.leads.findById(id);
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found.' });
      }

      return res.status(200).json({ success: true, lead });
    } catch (err) {
      console.error('Error fetching lead details:', err);
      return res.status(500).json({ error: 'Failed to retrieve lead details.' });
    }
  },

  /**
   * Update Lead Status (Optionally trigger notification email)
   */
  async updateLeadStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, note, sendNotificationEmail, emailNote } = req.body;

      const currentLead = await db.leads.findById(id);
      if (!currentLead) {
        return res.status(404).json({ error: 'Lead not found.' });
      }

      const previousStatus = currentLead.status;
      const updatedLead = await db.leads.update(id, { status });

      // Record stage history
      await db.history.create({
        leadId: id,
        fromStatus: previousStatus,
        toStatus: status,
        changedById: req.adminUser.id,
        note: note || `Status changed from ${previousStatus} to ${status}`
      });

      // Optionally dispatch status email
      if (sendNotificationEmail) {
        await emailService.sendStatusUpdate(updatedLead, status, emailNote).catch(e => {
          console.warn('Status notification email error:', e);
        });
      }

      return res.status(200).json({
        success: true,
        message: `Lead status updated to ${status}.`,
        lead: updatedLead
      });
    } catch (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ error: 'Failed to update lead status.' });
    }
  },

  /**
   * Add Note to Lead
   */
  async addNote(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      if (!content || !content.trim()) {
        return res.status(400).json({ error: 'Note content is required.' });
      }

      const note = await db.notes.create({
        leadId: id,
        authorId: req.adminUser.id,
        content: content.trim()
      });

      return res.status(201).json({ success: true, note });
    } catch (err) {
      console.error('Error adding note:', err);
      return res.status(500).json({ error: 'Failed to add note.' });
    }
  },

  /**
   * Get CRM Analytics
   */
  async getAnalytics(req, res) {
    try {
      const leads = await db.leads.findMany();
      const subscribers = await db.subscribers.findMany();
      const events = await db.events.findMany();

      const byStatus = {};
      const byPersona = {};
      const byCampus = {};

      leads.forEach(l => {
        byStatus[l.status] = (byStatus[l.status] || 0) + 1;
        byPersona[l.personaType] = (byPersona[l.personaType] || 0) + 1;
        if (l.campusAffiliation) {
          byCampus[l.campusAffiliation] = (byCampus[l.campusAffiliation] || 0) + 1;
        }
      });

      return res.status(200).json({
        success: true,
        analytics: {
          totalLeads: leads.length,
          activePipeline: leads.filter(l => !['CLOSED_FUNDED', 'ARCHIVED_REJECTED'].includes(l.status)).length,
          totalSubscribers: subscribers.length,
          totalEventRegistrations: events.length,
          byStatus,
          byPersona,
          topCampuses: Object.entries(byCampus)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([campus, count]) => ({ campus, count }))
        }
      });
    } catch (err) {
      console.error('Analytics error:', err);
      return res.status(500).json({ error: 'Failed to generate analytics.' });
    }
  },

  /**
   * Export Leads as CSV
   */
  async exportLeadsCsv(req, res) {
    try {
      const leads = await db.leads.findMany();

      const headers = [
        'Lead ID',
        'Lead Number',
        'Submission Date',
        'Track',
        'Status',
        'Full Name',
        'Email',
        'Phone',
        'Organization',
        'Campus Affiliation',
        'Pitch Headline',
        'Stage',
        'Cheque Target',
        'Traction',
        'Deck URL'
      ];

      const csvRows = [headers.join(',')];

      leads.forEach(l => {
        const clean = (val) => {
          if (!val) return '""';
          return `"${String(val).replace(/"/g, '""').replace(/\n/g, ' ')}"`;
        };

        const row = [
          clean(l.id),
          clean(`#CAMP-${l.leadNumber}`),
          clean(new Date(l.createdAt).toLocaleDateString()),
          clean(l.personaType),
          clean(l.status),
          clean(l.fullName),
          clean(l.email),
          clean(l.phone),
          clean(l.organizationName),
          clean(l.campusAffiliation),
          clean(l.pitchHeadline),
          clean(l.ventureStage),
          clean(l.targetCheque),
          clean(l.tractionMetrics),
          clean(l.pitchDeckUrl)
        ];
        csvRows.push(row.join(','));
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=campital-leads-${Date.now()}.csv`);
      return res.status(200).send(csvRows.join('\n'));
    } catch (err) {
      console.error('CSV export error:', err);
      return res.status(500).json({ error: 'Failed to export CSV.' });
    }
  },

  /**
   * Send Direct Reply Email to Lead
   */
  async sendLeadReply(req, res) {
    try {
      const { id } = req.params;
      const { subject, message } = req.body;

      if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message content is required.' });
      }

      const lead = await db.leads.findById(id);
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found.' });
      }

      const replyResult = await emailService.sendDirectLeadReply(lead, {
        subject: subject && subject.trim() ? subject.trim() : `[Campital] In inquiry response: ${lead.organizationName}`,
        message: message.trim(),
        replyBy: req.adminUser?.name || 'Campital Deal Desk'
      });

      // Record in internal notes
      await db.notes.create({
        leadId: id,
        authorId: req.adminUser.id,
        content: `[Direct Email Dispatched by ${req.adminUser.name || 'Admin'}]\nSubject: ${subject || 'Direct Reply'}\n\n${message.trim()}`
      });

      return res.status(200).json({
        success: true,
        message: `Reply email successfully dispatched to ${lead.email}.`,
        replyResult
      });
    } catch (err) {
      console.error('Error sending lead reply:', err);
      return res.status(500).json({ error: 'Failed to dispatch reply email.' });
    }
  }
};

