import express from 'express';
import { eventsController } from '../controllers/eventsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', eventsController.register);
router.get('/', requireAdminAuth, eventsController.list);

export default router;

