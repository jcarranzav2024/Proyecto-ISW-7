import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient({ log: ["query"] });


async function main() {
  const Provincia = await prisma.provincias.create({
    data: {
      Provincia: 'San José',
      Cantones: {
        create: {
          Canton: 'Central',
        }
      }
    }
  });
  console.log(Provincia);


  const Cantones = await prisma.cantones.findMany({
    include: {
      Provincias: true,
    }
  });
  console.log(Cantones);


  const Provincias2 = await prisma.provincias.findMany();
  //Interesantemente el objeto Provincias no tiene el campo Cantones
  Provincias2.forEach((Provincia) => {
    console.log(Provincia);
    //Provincia.Cantones
  });


  await prisma.cantones.update({
    where: {
      CantonId: 4,
    },
    data: {
      Canton: 'San José',
    },
  });


  await prisma.cantones.updateMany({
    where: {
      Canton: 'Central',
    },
    data: {
      Canton: 'Centrales',
    },
  });
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });