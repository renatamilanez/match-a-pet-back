import { prisma } from "@/config";
import { UpdateHostParams } from "@/services";
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

async function findHostData(id: number) {
  return await prisma.host.findFirst({
    where: {
      id
    },
    select: {
      name: true,
      email: true,
      state: true,
      phone: true
    }
  });
}

async function updateHost(id: number, data: UpdateHostParams) {
  return await prisma.host.update({
    where: {
      id
    },
    data: {
      name: data.name,
      state: data.state,
      email: data.email,
      phone: data.phone,
    }
  });
}

const hostRepository = {
  findByEmail,
  createHost,
  findHostById,
  findHostData,
  updateHost
};

export default hostRepository;
