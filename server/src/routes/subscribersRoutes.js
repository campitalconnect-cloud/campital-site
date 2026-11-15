import express from 'express';
import { subscribersController } from '../controllers/subscribersController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/subscribe', subscribersController.subscribe);
router.get('/', requireAdminAuth, subscribersController.list);

export default router;

