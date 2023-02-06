import { prisma } from "@/config";
import { UpdateUserParams } from "@/services";
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
  return await prisma.session.delete({
    where: {
      token
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

async function findUserTypeByToken(token: string) {
  return await prisma.session.findFirst({
    where: {
      token
    },
    select: {
      userId: true,
      hostId: true
    }
  });
}

async function findState(id: number) {
  return await prisma.user.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      state: true
    }
  });
}

async function findUser(id: number) {
  return await prisma.user.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      state: true
    }
  });
}

async function updateUser(id: number, data: UpdateUserParams) {
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      name: data.name,
      state: data.state,
      email: data.email
    }
  });
}

const userRepository = {
  findByEmail,
  createUser,
  addToMyPets,
  findMyPets,
  deleteSession,
  findPetInMyPet,
  findUserTypeByToken,
  findState,
  findUser,
  updateUser
};

export default userRepository;
