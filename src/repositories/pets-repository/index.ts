import { prisma } from "@/config";

async function findMany() {
  return prisma.availablePets.findMany({
    where: {
      isAvailable: true
    }
  });
}

async function findTypes() {
  return prisma.petType.findMany();
}

async function findManyByType(type: string) {
  return prisma.petType.findMany({
    where: {
      name: type
    },
    include: {
      AvailablePets: {
        where: {
          isAvailable: true
        }
      }
    }
  });
}

async function findPet(petId: number) {
  return prisma.availablePets.findUnique({
    include: {
      Host: {
        select: {
          state: true
        }
      }
    },
    where: {
      id: petId
    }
  });
}

const petsRepository = {
  findMany,
  findManyByType,
  findPet,
  findTypes
};

export default petsRepository;
