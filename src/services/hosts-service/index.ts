import { unauthorizedError } from "@/errors";
import hostRepository from "@/repositories/hosts-repository";
import userRepository from "@/repositories/users-repository";
import { Host } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../email-errors";

export async function createHost({email, password, name, state}: CreateHostParams): Promise<Host> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  const data = {
    email,
    password: hashedPassword,
    name,
    state
  }

  return hostRepository.createHost(data);
}

async function validateUniqueEmailOrFail(email: string) {
  const hostWithSameEmail = await hostRepository.findByEmail(email);
  if (hostWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function getHostData(token: string) {
  const hostId = await userRepository.findUserTypeByToken(token);
  if(!hostId) throw unauthorizedError();

  return await hostRepository.findHostData(hostId.hostId);
}

async function updateHost(token: string, data: UpdateHostParams) {
  const hostId = await userRepository.findUserTypeByToken(token);
  if(!hostId) throw unauthorizedError();

  return await hostRepository.updateHost(hostId.hostId, data);
}

export type CreateHostParams = Pick<Host, "email" | "password" | "name" | "state">;
export type UpdateHostParams = Pick<Host, "email" | "phone" | "name" | "state">;

const hostService = {
  createHost,
  getHostData,
  updateHost
};

export default hostService;
