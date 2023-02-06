import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import petsService from "@/services/pets-service";
import { unauthorizedError } from "@/errors";

export async function getPets(req: AuthenticatedRequest, res: Response) {
  const token: string = req.headers.authorization?.replace('Bearer ', '');
  if(!token) throw unauthorizedError();

  try {
    const pets = await petsService.getPets(token);
    return res.status(httpStatus.OK).send(pets);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await petsService.getTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getPetsByType(req: AuthenticatedRequest, res: Response) {
    const type = (req.params.type).toLowerCase();

  try {
    const pets = await petsService.getPetsByType(type);
    return res.status(httpStatus.OK).send(pets);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getPetById(req: AuthenticatedRequest, res: Response) {
  const petId = Number(req.params.petId);

  try {
    const pet = await petsService.getPetById(petId);
    return res.status(httpStatus.OK).send(pet);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updatePetAvailability(req: AuthenticatedRequest, res: Response) {
  const petId = Number(req.params.petId);
  const { hostId } = res.locals;
  if(!hostId) throw unauthorizedError();

  try {
    await petsService.updatePetAvailability(petId, hostId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createPet(req: AuthenticatedRequest, res: Response) {
  const { name, age, race, picture, isVaccinated, petType, hostId } = req.body;

  const data = {
    name, 
    age, 
    race, 
    picture, 
    isVaccinated, 
    petType, 
    hostId
  }

  try {
    const pet = await petsService.createPet(data);

    return res.status(httpStatus.CREATED).send(pet);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}