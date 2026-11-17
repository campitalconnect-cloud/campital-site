import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import bcrypt from 'bcryptjs';

let prismaInstance = null;
let usePrisma = false;

// Check if valid PostgreSQL DATABASE_URL is provided
if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
  try {
    prismaInstance = new PrismaClient();
    usePrisma = true;
    console.log('🔌 Prisma configured with Neon PostgreSQL URL.');
  } catch (err) {
    console.warn('⚠️ Could not initialize Prisma client:', err.message);
    usePrisma = false;
  }
} else {
  console.log('ℹ️ No active PostgreSQL DATABASE_URL detected in server/.env. Initializing local persistent JSON store for instant testing.');
}

// Local File Store for zero-config fallback
const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultStore = {
  leads: [],
  adminUsers: [
    {
      id: 'admin-core-desk-1',
      name: 'Campital Lead Desk',
      email: 'core.desk@campital.in',
      passwordHash: '$2b$10$hEXZlxxiGsUoXZxrvErwOubLj71gYYpjcXU4kW6mPHkBL.Hsd3uRe',
      role: 'SUPER_ADMIN',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ],
  leadNotes: [],
  stageHistory: [],
  emailLogs: [],
  subscribers: [],
  events: []
};

function readLocalStore() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultStore, null, 2));
      return defaultStore;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return defaultStore;
  }
}

function writeLocalStore(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Failed to write local store:', e);
  }
}

export const db = {
  isPrisma: () => usePrisma,
  prisma: prismaInstance,

  // Leads
  leads: {
    async create(data) {
      if (usePrisma) {
        try {
          return await prismaInstance.lead.create({ data });
        } catch (err) {
          console.warn('Neon DB write error, falling back to local store:', err.message);
        }
      }
      const store = readLocalStore();
      const newLead = {
        id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
        leadNumber: store.leads.length + 1001,
        status: data.status || 'NEW',
        personaType: data.personaType || 'STARTUP',
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        organizationName: data.organizationName,
        campusAffiliation: data.campusAffiliation || null,
        linkedinUrl: data.linkedinUrl || null,
        websiteUrl: data.websiteUrl || null,
        pitchHeadline: data.pitchHeadline || null,
        ventureStage: data.ventureStage || null,
        productStatus: data.productStatus || null,
        problemCustomer: data.problemCustomer || null,
        tractionMetrics: data.tractionMetrics || null,
        founderBackground: data.founderBackground || null,
        targetCheque: data.targetCheque || null,
        useOfFunds: data.useOfFunds || null,
        priorFunding: data.priorFunding || null,
        whyNow: data.whyNow || null,
        pitchDeckUrl: data.pitchDeckUrl || null,
        partnerCategory: data.partnerCategory || null,
        generalMessage: data.generalMessage || null,
        internalRating: 0,
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.leads.unshift(newLead);
      writeLocalStore(store);
      return newLead;
    },

    async findMany(options = {}) {
      if (usePrisma) {
        try {
          return await prismaInstance.lead.findMany({
            include: { notes: { include: { author: true } }, statusHistory: true },
            orderBy: { createdAt: 'desc' }
          });
        } catch (err) {
          console.warn('Neon DB query error, using local store:', err.message);
        }
      }
      const store = readLocalStore();
      let leads = [...store.leads];

      if (options.where) {
        if (options.where.personaType) {
          leads = leads.filter(l => l.personaType === options.where.personaType);
        }
        if (options.where.status) {
          leads = leads.filter(l => l.status === options.where.status);
        }
      }

      // Attach relations
      return leads.map(lead => ({
        ...lead,
        notes: store.leadNotes.filter(n => n.leadId === lead.id),
        statusHistory: store.stageHistory.filter(h => h.leadId === lead.id)
      }));
    },

    async findById(id) {
      if (usePrisma) {
        try {
          return await prismaInstance.lead.findUnique({
            where: { id },
            include: { notes: { include: { author: true } }, statusHistory: true, emailLogs: true }
          });
        } catch (err) {
          console.warn('Neon DB query error:', err.message);
        }
      }
      const store = readLocalStore();
      const lead = store.leads.find(l => l.id === id);
      if (!lead) return null;
      return {
        ...lead,
        notes: store.leadNotes.filter(n => n.leadId === lead.id),
        statusHistory: store.stageHistory.filter(h => h.leadId === lead.id),
        emailLogs: store.emailLogs.filter(e => e.leadId === lead.id)
      };
    },

    async update(id, updates) {
      if (usePrisma) {
        try {
          return await prismaInstance.lead.update({
            where: { id },
            data: updates
          });
        } catch (err) {
          console.warn('Neon DB update error:', err.message);
        }
      }
      const store = readLocalStore();
      const idx = store.leads.findIndex(l => l.id === id);
      if (idx === -1) return null;
      store.leads[idx] = {
        ...store.leads[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      writeLocalStore(store);
      return store.leads[idx];
    },

    async delete(id) {
      if (usePrisma) {
        try {
          return await prismaInstance.lead.delete({ where: { id } });
        } catch (err) {
          console.warn('Neon DB delete error:', err.message);
        }
      }
      const store = readLocalStore();
      store.leads = store.leads.filter(l => l.id !== id);
      store.leadNotes = store.leadNotes.filter(n => n.leadId !== id);
      store.stageHistory = store.stageHistory.filter(h => h.leadId !== id);
      writeLocalStore(store);
      return { id };
    }
  },

  // Notes
  notes: {
    async create({ leadId, authorId, content }) {
      if (usePrisma) {
        try {
          return await prismaInstance.leadNote.create({
            data: { leadId, authorId, content },
            include: { author: true }
          });
        } catch (err) {
          console.warn('Prisma note create error:', err.message);
        }
      }
      const store = readLocalStore();
      const author = store.adminUsers.find(u => u.id === authorId) || { name: 'Admin', email: 'admin@campital.in' };
      const note = {
        id: 'note-' + Date.now(),
        leadId,
        authorId,
        author: { name: author.name, email: author.email },
        content,
        createdAt: new Date().toISOString()
      };
      store.leadNotes.push(note);
      writeLocalStore(store);
      return note;
    }
  },

  // Stage History
  history: {
    async create({ leadId, fromStatus, toStatus, changedById, note }) {
      if (usePrisma) {
        try {
          return await prismaInstance.stageHistory.create({
            data: { leadId, fromStatus, toStatus, changedById, note }
          });
        } catch (err) {
          console.warn('Stage history create error:', err.message);
        }
      }
      const store = readLocalStore();
      const record = {
        id: 'hist-' + Date.now(),
        leadId,
        fromStatus,
        toStatus,
        changedById,
        note: note || null,
        createdAt: new Date().toISOString()
      };
      store.stageHistory.push(record);
      writeLocalStore(store);
      return record;
    }
  },

  // Email Logs
  emailLogs: {
    async create(data) {
      if (usePrisma) {
        try {
          return await prismaInstance.emailLog.create({ data });
        } catch (err) {
          console.warn('Email log write error:', err.message);
        }
      }
      const store = readLocalStore();
      const log = {
        id: 'email-log-' + Date.now(),
        ...data,
        sentAt: new Date().toISOString()
      };
      store.emailLogs.push(log);
      writeLocalStore(store);
      return log;
    }
  },

  // Admin Users
  adminUsers: {
    async findByEmail(email) {
      if (usePrisma) {
        try {
          return await prismaInstance.adminUser.findUnique({ where: { email } });
        } catch (err) {
          console.warn('Prisma admin user query error:', err.message);
        }
      }
      const store = readLocalStore();
      return store.adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    },

    async findById(id) {
      if (usePrisma) {
        try {
          return await prismaInstance.adminUser.findUnique({ where: { id } });
        } catch (err) {
          console.warn('Prisma admin user query error:', err.message);
        }
      }
      const store = readLocalStore();
      return store.adminUsers.find(u => u.id === id);
    }
  },

  // Subscribers
  subscribers: {
    async create(email, source = 'homepage') {
      if (usePrisma) {
        try {
          return await prismaInstance.newsletterSubscriber.upsert({
            where: { email },
            update: { isActive: true },
            create: { email, source }
          });
        } catch (err) {
          console.warn('Prisma subscriber error:', err.message);
        }
      }
      const store = readLocalStore();
      let sub = store.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
      if (!sub) {
        sub = {
          id: 'sub-' + Date.now(),
          email,
          source,
          isActive: true,
          createdAt: new Date().toISOString()
        };
        store.subscribers.push(sub);
        writeLocalStore(store);
      }
      return sub;
    },

    async findMany() {
      if (usePrisma) {
        try {
          return await prismaInstance.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
        } catch (err) {
          console.warn('Prisma subscribers error:', err.message);
        }
      }
      const store = readLocalStore();
      return store.subscribers;
    }
  },

  // Events
  events: {
    async create(data) {
      if (usePrisma) {
        try {
          return await prismaInstance.eventRegistration.create({ data });
        } catch (err) {
          console.warn('Prisma event registration error:', err.message);
        }
      }
      const store = readLocalStore();
      const reg = {
        id: 'event-reg-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString()
      };
      store.events.push(reg);
      writeLocalStore(store);
      return reg;
    },

    async findMany() {
      if (usePrisma) {
        try {
          return await prismaInstance.eventRegistration.findMany({ orderBy: { createdAt: 'desc' } });
        } catch (err) {
          console.warn('Prisma event query error:', err.message);
        }
      }
      const store = readLocalStore();
      return store.events;
    }
  }
};

