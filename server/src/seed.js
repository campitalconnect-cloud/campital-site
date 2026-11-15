import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: 'admin@campital.in' }
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@12345', 10);
    const admin = await prisma.adminUser.create({
      data: {
        name: 'Campital Admin',
        email: 'admin@campital.in',
        passwordHash,
        role: 'SUPER_ADMIN',
        isActive: true
      }
    });
    console.log('✅ Default Admin created in Neon DB:', admin.email);
  } else {
    console.log('ℹ️ Admin already exists in Neon DB:', existingAdmin.email);
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

