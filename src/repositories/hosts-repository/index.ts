import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string) {
  return await prisma.host.findFirst({
    where: {
      email
    }
  });
}

async function createHost(data: Prisma.HostUncheckedCreateInput) {
  return await prisma.host.create({
    data
  });
}

async function findHostById(id: number) {
  return await prisma.host.findFirst({
    where: {
      id
    }
  });
}

const hostRepository = {
  findByEmail,
  createHost,
  findHostById
};

export default hostRepository;
