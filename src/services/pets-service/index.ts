import { AvailablePets, PetType } from "@prisma/client";
import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import petsRepository from "@/repositories/pets-repository";

export async function getPets() {
  const pets: AvailablePets[] = await petsRepository.findMany();
  if(!pets) throw notFoundError();

  return pets;
}

export async function getPetsByType(type: string) {
  const pets = await petsRepository.findManyByType(type);
  if(!pets) throw notFoundError();

  return pets;
}

export async function getPetById(petId: number) {
  const pet: AvailablePets = await petsRepository.findPet(petId);
  if(!pet || pet.isAvailable === false) throw notFoundError();
  
  return exclude(pet, "createdAt", "updatedAt");
}

export async function getTypes() {
  const types: PetType[] = await petsRepository.findTypes();
  if(!types) throw notFoundError();
  
  return types;
}

const petsService = {
  getPets,
  getPetsByType,
  getPetById,
  getTypes
};

export default petsService;
