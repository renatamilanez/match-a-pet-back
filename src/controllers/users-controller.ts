import { unauthorizedError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  const {email, password, name, state} = req.body;

  try {
    const user = await userService.createUser({ email, password, name, state });
    
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      name: user.name,
      state: user.state
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function addToMyPets(req: AuthenticatedRequest, res: Response) {
  const petId = Number(req.body.petId);
  const count = Number(req.body.count);
  const {userId} = req;

  if(!petId || !count || !userId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    await userService.addToMyPets(petId, userId, count);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error);
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
    if(error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getMyPets(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;

  try {
    const pets = await userService.getMyPets(userId);
    return res.status(httpStatus.OK).send(pets);
  } catch (error) {
    if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error);
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function userSignOut(req: AuthenticatedRequest, res: Response) {
  const token: string = req.headers.authorization?.replace('Bearer ', '');
  if(!token) throw unauthorizedError();

  try {
    await userService.userSignOut(token);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getProfileData(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;

  try {
    const data = await userService.getUserData(userId);
    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function updateUserProfile(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;
  const {name, email, state, phone} = req.body;

  const data = {
    name,
    email,
    phone,
    state
  };

  try {
    await userService.updateUser(userId, data);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}