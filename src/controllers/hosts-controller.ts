import { unauthorizedError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import hostService from "@/services/hosts-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function hostsPost(req: Request, res: Response) {
  const {email, password, name, state} = req.body;

  try {
    const host = await hostService.createHost({ email, password, name, state });
    
    return res.status(httpStatus.CREATED).json({
      id: host.id,
      email: host.email,
      name: host.name,
      state: host.state
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getHostData(req: AuthenticatedRequest, res: Response) {
  const token: string = req.headers.authorization?.replace('Bearer ', '');
  if(!token) throw unauthorizedError();

  try {
    const data = await hostService.getHostData(token);
    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function updateHostProfile(req: AuthenticatedRequest, res: Response) {
  console.log('entrou no controller');
  const token: string = req.headers.authorization?.replace('Bearer ', '');
  if(!token) throw unauthorizedError();

  const {name, email, state, phone} = req.body;
  const data = {
    name,
    email,
    phone,
    state
  };

  try {
    await hostService.updateHost(token, data);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}