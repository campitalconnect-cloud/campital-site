import { db } from '../db.js';
import { emailService } from '../services/emailService.js';

export const eventsController = {
  async register(req, res) {
    try {
      const { fullName, email, organization, trackInterest, eventName } = req.body;
      if (!fullName || !email || !organization) {
        return res.status(400).json({ error: 'Name, email, and organization are required.' });
      }

      const reg = await db.events.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        organization: organization.trim(),
        trackInterest: trackInterest || null,
        eventName: eventName || '2026 Calendar Rollout'
      });

      // Send event confirmation email asynchronously
      emailService.sendEventConfirmation(reg).catch(e => console.warn('Event email error:', e));

      return res.status(201).json({
        success: true,
        message: 'Priority alert registered successfully.',
        registration: reg
      });
    } catch (err) {
      console.error('Event register error:', err);
      return res.status(500).json({ error: 'Failed to register for event alert.' });
    }
  },

  async list(req, res) {
    try {
      const registrations = await db.events.findMany();
      return res.status(200).json({ success: true, count: registrations.length, registrations });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to list event registrations.' });
    }
  }
};

