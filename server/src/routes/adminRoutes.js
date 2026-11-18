import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Admin Login
router.post('/login', adminController.login);

// Protected Admin Endpoints
router.use(requireAdminAuth);

router.get('/profile', adminController.getProfile);
router.get('/analytics', adminController.getAnalytics);
router.get('/export/csv', adminController.exportLeadsCsv);

router.get('/leads', adminController.getLeads);
router.get('/leads/:id', adminController.getLeadById);
router.patch('/leads/:id/status', adminController.updateLeadStatus);
router.delete('/leads/:id', adminController.deleteLead);
router.post('/leads/:id/notes', adminController.addNote);
router.post('/leads/:id/reply', adminController.sendLeadReply);

export default router;

