import { prisma } from "@/config";
import { AvailablePets } from "@prisma/client";

async function findMany() {
  return await prisma.availablePets.findMany({
    where: {
      isAvailable: true
    }
  });
}

async function findTypes() {
  return await prisma.petType.findMany();
}

async function findManyByType(type: string) {
  return await prisma.petType.findMany({
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
  return await prisma.availablePets.findUnique({
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

async function createPet(data: Pet) {
  return await prisma.availablePets.create({
    data: {
      hostId: data.hostId,
      petTypeId: data.petTypeId,
      name: data.name,
      age: data.age,
      race: data.race,
      isVaccinated: data.isVaccinated,
      picture: data.picture
    }
  });
}

async function findPetId(type: string) {
  const name = type.toLowerCase();
  return await prisma.petType.findFirst({
    where: {
      name
    }
  });
}

async function findPetById(petId: number) {
  return await prisma.availablePets.findFirst({
    where: {
      id: petId
    },
    include: {
      Host: {
        select: {
          id: true
        }
      }
    }
  });
}

async function updateAvailability(id: number) {
  return await prisma.availablePets.update({
    where: {
      id
    },
    data: {
      isAvailable: false
    }
  });
}

type Pet = Omit<AvailablePets, "id" | "createdAt" | "updatedAt" | "isAvailable" | "countLikes">

const petsRepository = {
  findMany,
  findManyByType,
  findPet,
  findTypes,
  createPet,
  findPetId,
  updateAvailability,
  findPetById
};

export default petsRepository;
