import { db } from '../db.js';
import { emailService } from '../services/emailService.js';

export const subscribersController = {
  async subscribe(req, res) {
    try {
      const { email, source = 'homepage' } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email address is required.' });
      }

      const subscriber = await db.subscribers.create(email.trim().toLowerCase(), source);

      // Send welcome newsletter email asynchronously
      emailService.sendNewsletterWelcome(email.trim()).catch(e => console.warn('Newsletter email error:', e));

      return res.status(200).json({
        success: true,
        message: 'Successfully subscribed to The Campital Brief.',
        subscriber
      });
    } catch (err) {
      console.error('Subscriber error:', err);
      return res.status(500).json({ error: 'Subscription failed.' });
    }
  },

  async list(req, res) {
    try {
      const subscribers = await db.subscribers.findMany();
      return res.status(200).json({ success: true, count: subscribers.length, subscribers });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to list subscribers.' });
    }
  }
};

