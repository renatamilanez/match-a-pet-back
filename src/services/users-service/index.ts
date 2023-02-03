import userRepository from "@/repositories/users-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../email-errors";

export async function createUser({email, password, name, state}: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  const data = {
    email,
    password: hashedPassword,
    name,
    state
  }

  return userRepository.createUser(data);
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function addToMyPets(userId: number, petId: number, count: number) {
  await userRepository.addToMyPets(userId, petId, count);
}

export type CreateUserParams = Pick<User, "email" | "password" | "name" | "state">;

const userService = {
  createUser,
  addToMyPets
};

export default userService;
