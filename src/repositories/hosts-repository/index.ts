import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email
    }
  });
}

async function createHost(data: Prisma.HostUncheckedCreateInput) {
  return prisma.host.create({
    data
  });
}

const userRepository = {
  findByEmail,
  createHost
};

export default userRepository;
