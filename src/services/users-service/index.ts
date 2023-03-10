import { conflictError, notFoundError, unauthorizedError } from "@/errors";
import petsRepository from "@/repositories/pets-repository";
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

  return await userRepository.createUser(data);
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function addToMyPets(userId: number, petId: number, count: number) {
  const isPetAvailable = await petsRepository.findPet(petId);
  if(!isPetAvailable) throw notFoundError();
  if(isPetAvailable.isAvailable === false) throw unauthorizedError();
  
  const isPetFavorited = await userRepository.findPetInMyPet(userId, petId);
  if(isPetFavorited === null) throw conflictError('Pet already added to MyPet list');

  return await userRepository.addToMyPets(userId, petId, count);
}

async function getMyPets(userId: number) {
  if(!userId) throw unauthorizedError();
  
  const pets = await userRepository.findMyPets(userId);
  if(!pets) throw notFoundError();

  return pets;
}

async function userSignOut(token: string) {
  return await userRepository.deleteSession(token);
}

async function getUserData(id: number) {
  return await userRepository.findUser(id);
}

async function updateUser(id: number, data: UpdateUserParams) {
  if(!id) throw unauthorizedError();

  return await userRepository.updateUser(id, data);
}

export type CreateUserParams = Pick<User, "email" | "password" | "name" | "state">;
export type UpdateUserParams = Pick<User, "email" | "name" | "state" | "phone">;

const userService = {
  createUser,
  addToMyPets,
  getMyPets,
  userSignOut,
  getUserData,
  updateUser
};

export default userService;
