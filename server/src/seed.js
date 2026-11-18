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

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables.');
    process.exit(1);
  }

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail }
  });

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  if (!existingAdmin) {
    const admin = await prisma.adminUser.create({
      data: {
        name: 'Campital Lead Desk',
        email: adminEmail,
        passwordHash,
        role: 'SUPER_ADMIN',
        isActive: true
      }
    });
    console.log('✅ Admin account initialized in Neon DB:', admin.email);
  } else {
    await prisma.adminUser.update({
      where: { email: adminEmail },
      data: { passwordHash, isActive: true }
    });
    console.log('🔄 Admin password updated in Neon DB:', existingAdmin.email);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
