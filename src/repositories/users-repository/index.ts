import { prisma } from "@/config";
import { Prisma } from "@prisma/client";
import { type } from "os";

async function findByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email
    }
  });
}

async function createUser(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data
  });
}

async function addToMyPets(petId: number, userId: number, count: number) {
  await prisma.$transaction([
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

const userRepository = {
  findByEmail,
  createUser,
  addToMyPets
};

export default userRepository;
