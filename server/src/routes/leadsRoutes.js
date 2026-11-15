import express from 'express';
import { leadsController } from '../controllers/leadsController.js';
import { pitchDeckUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public: Submit Lead
router.post('/', leadsController.submitLead);

// Public: Upload Pitch Deck
router.post('/upload-deck', pitchDeckUpload.single('deck'), leadsController.uploadPitchDeck);

export default router;
