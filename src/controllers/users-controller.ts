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

  try {
    await userService.addToMyPets(petId, userId, count);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    
  }
}
