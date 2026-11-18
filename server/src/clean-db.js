import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function clean() {
  console.log('🧹 Cleaning dummy records from Neon PostgreSQL...');

  const notes = await prisma.leadNote.deleteMany({});
  const history = await prisma.stageHistory.deleteMany({});
  const emails = await prisma.emailLog.deleteMany({});
  const leads = await prisma.lead.deleteMany({});
  const subs = await prisma.newsletterSubscriber.deleteMany({});
  const events = await prisma.eventRegistration.deleteMany({});

  console.log(`Purged: ${leads.count} leads, ${notes.count} notes, ${history.count} history, ${emails.count} email logs, ${subs.count} subscribers, ${events.count} events.`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.deleteMany({});
    const admin = await prisma.adminUser.create({
      data: {
        name: 'Campital Lead Desk',
        email: adminEmail,
        passwordHash,
        role: 'SUPER_ADMIN',
        isActive: true
      }
    });
    console.log(`🔒 Admin initialized: ${admin.email}`);
  }

  await prisma.$disconnect();
}

clean().catch(e => {
  console.error('Error cleaning database:', e);
  process.exit(1);
});
