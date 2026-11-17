import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const p = new PrismaClient();

async function test() {
  const users = await p.adminUser.findMany();
  console.log('Users in DB:', users.map(u => ({ id: u.id, email: u.email, active: u.isActive })));

  if (users.length > 0) {
    const isMatch = await bcrypt.compare('Campital#Desk92$Secure', users[0].passwordHash);
    console.log('Password comparison result:', isMatch);
  }
}

test().catch(console.error).finally(() => p.$disconnect());

