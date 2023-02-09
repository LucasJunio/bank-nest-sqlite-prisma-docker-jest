import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const custumer = await prisma.custumer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Alice',
      surname: 'Galva',
    },
  });

  console.log({ custumer });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
