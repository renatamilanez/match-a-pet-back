import hostRepository from "@/repositories/hosts-repository";
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

export type CreateHostParams = Pick<Host, "email" | "password" | "name" | "state">;

const hostService = {
  createHost,
};

export default hostService;
