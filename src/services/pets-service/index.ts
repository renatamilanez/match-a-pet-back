import { AvailablePets, Host, PetType } from "@prisma/client";
import { conflictError, notFoundError, unauthorizedError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import petsRepository from "@/repositories/pets-repository";
import hostRepository from "@/repositories/hosts-repository";

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
  const pet: (AvailablePets & {Host: {state: string}}) = await petsRepository.findPet(petId);
  if(!pet || pet.isAvailable === false) throw notFoundError();

  const data = {
    id: pet.id,
    name: pet.name,
    picture: pet.picture,
    age: pet.age,
    isVaccinated: pet.isVaccinated,
    race: pet.race,
    state: pet.Host.state,
    countLikes: pet.countLikes,
  }
  
  return data;
}

export async function getTypes() {
  const types: PetType[] = await petsRepository.findTypes();
  if(!types) throw notFoundError();
  
  return types;
}

export async function createPet(data: PetData) {
  const type: PetType = await petsRepository.findPetId(data.petType);
  if(!type) throw notFoundError();

  const host: Host = await hostRepository.findHostById(data.hostId);
  if(!host) throw unauthorizedError();

  const petData = {
    hostId: data.hostId,
    petTypeId: type.id,
    name: data.name,
    age: data.age,
    race: data.race,
    picture: data.picture,
    isVaccinated: data.isVaccinated
  };

  return await petsRepository.createPet(petData);
}

type PetData = {
  name: string, 
  age: number, 
  race: string, 
  picture: string, 
  isVaccinated: boolean, 
  petType: string, 
  hostId: number
}

export async function updatePetAvailability(id: number, hostId: number) {
  const petId = await petsRepository.findPetById(id);

  if(petId.Host.id !== hostId) throw unauthorizedError();

  return await petsRepository.updateAvailability(id);
}

const petsService = {
  getPets,
  getPetsByType,
  getPetById,
  getTypes,
  createPet,
  updatePetAvailability
};

export default petsService;
