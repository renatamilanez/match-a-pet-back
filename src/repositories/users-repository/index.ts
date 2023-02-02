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

const userRepository = {
  findByEmail,
  createUser
};

export default userRepository;
