
import { hash } from 'bcrypt';
import { prisma } from '../src/utils/prisma';

async function main() {
  const adminEmail = 'admin@exemplo.com';
  const adminExists = await prisma.usuario.findUnique({
    where: { email: adminEmail },
  });

  if (adminExists) {
    console.log('Admin já existe no banco.');
    return;
  }

  const hashedPassword = await hash('admin123', 10);

  await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: adminEmail,
      senha: hashedPassword,
      role: 'ADMIN', 
    },
  });

  console.log('Admin criado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
