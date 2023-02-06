import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email
    }
  });
}

async function createUser(data: Prisma.UserUncheckedCreateInput) {
  return await prisma.user.create({
    data
  });
}

async function addToMyPets(petId: number, userId: number, count: number) {
  return await prisma.$transaction([
    prisma.myPet.create({
      data: {
        petId,
        userId
      }
    }),
    prisma.availablePets.update({
      where: {
        id: petId,
      },
      data: {
        countLikes: count
      }
    })
  ]);
}

async function findMyPets(userId: number) {
  return await prisma.myPet.findMany({
    where: {
      userId
    },
    include: {
      AvailablePets: {
        select: {
          id: true,
          name: true,
          picture: true,
          isAvailable: true
        },
        include: {
          Host: {
            select: {
              email: true
            }
          }
        },
      }
    }
  });
}

async function deleteSession(token: string) {
  const data = await prisma.session.findFirst({
    where: {
      token
    },
  });

  return await prisma.session.delete({
    where: {
      id: data.id
    }
  });
}

async function findPetInMyPet(userId: number, petId: number) {
  return await prisma.myPet.findMany({
    where: {
      userId,
      petId,
    },
  });
}

const userRepository = {
  findByEmail,
  createUser,
  addToMyPets,
  findMyPets,
  deleteSession,
  findPetInMyPet
};

export default userRepository;
