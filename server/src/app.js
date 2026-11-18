import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure server/.env or root .env is loaded
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

import express from 'express';
import cors from 'cors';

import leadsRoutes from './routes/leadsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import subscribersRoutes from './routes/subscribersRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';

const app = express();

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Private-Network', 'true');
  next();
});

app.use(cors({
  origin: true, // Allow frontend dev & prod origins
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory for pitch decks & documents
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const uploadsPath = isServerless ? '/tmp/uploads' : path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));
app.use('/api/uploads', express.static(uploadsPath));

// Healthcheck endpoints
const healthHandler = (req, res) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'Campital CRM API Server',
    environment: process.env.NODE_ENV || (isServerless ? 'production' : 'development'),
    database: process.env.DATABASE_URL ? 'Neon PostgreSQL configured' : 'Persistent Fallback Store',
    time: new Date().toISOString()
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Mount Routes on both /api/* and /* so requests match seamlessly whether routed via Vercel rewrite or directly
app.use('/api/leads', leadsRoutes);
app.use('/leads', leadsRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api/subscribers', subscribersRoutes);
app.use('/subscribers', subscribersRoutes);

app.use('/api/events', eventsRoutes);
app.use('/events', eventsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

export default app;

