import { AvailablePets, Host, PetType } from "@prisma/client";
import { notFoundError, unauthorizedError } from "@/errors";
import petsRepository from "@/repositories/pets-repository";
import hostRepository from "@/repositories/hosts-repository";
import userRepository from "@/repositories/users-repository";

async function getPetsForUser(id: number) {
  const state = await userRepository.findState(id);
  if(!state) throw unauthorizedError();

  const pets: AvailablePets[] = await petsRepository.findMany(state.state);
  if(!pets) throw notFoundError();

  return pets;
}

async function getHostPets(id: number) {
  const pets = await petsRepository.findHostPets(id);
  if(!pets) throw notFoundError();

  return pets;
}

export async function getPets(token: string) {
  const userType = await userRepository.findUserTypeByToken(token);
  if(userType.userId !== null) {
    return await getPetsForUser(userType.userId);
  }
  
  return await getHostPets(userType.hostId);
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

export async function createPet(data: PetData, token: string) {
  const type: PetType = await petsRepository.findPetTypeId(data.petType);
  if(!type) throw notFoundError();

  const host = await userRepository.findUserTypeByToken(token);
  if(!host) throw unauthorizedError();

  const petData = {
    hostId: host.hostId,
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
  petType: string
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
