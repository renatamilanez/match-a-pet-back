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
