import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function clean() {
  console.log('🧹 Cleaning all dummy leads, history, notes, subscribers, and event registrations from Neon PostgreSQL...');
  
  const notes = await prisma.leadNote.deleteMany({});
  const history = await prisma.stageHistory.deleteMany({});
  const emails = await prisma.emailLog.deleteMany({});
  const leads = await prisma.lead.deleteMany({});
  const subs = await prisma.newsletterSubscriber.deleteMany({});
  const events = await prisma.eventRegistration.deleteMany({});

  console.log(`Deleted ${leads.count} leads, ${notes.count} notes, ${history.count} history entries, ${emails.count} email logs, ${subs.count} subscribers, ${events.count} event RSVPs.`);

  const newEmail = 'core.desk@campital.in';
  const newPassword = 'Campital#Desk92$Secure';
  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.adminUser.deleteMany({});
  const admin = await prisma.adminUser.create({
    data: {
      name: 'Campital Lead Desk',
      email: newEmail,
      passwordHash: hash,
      role: 'SUPER_ADMIN',
      isActive: true
    }
  });

  console.log(`🔒 Unique Admin account initialized: ${admin.email}`);
  await prisma.$disconnect();
}

clean().catch(e => {
  console.error('Error cleaning database:', e);
  process.exit(1);
});

