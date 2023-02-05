import authenticationService from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signInPost(req: Request, res: Response) {
  const { email, password, userType } = req.body;

  try {
    const user = await authenticationService.signIn(email, password, userType);

    const result = {
      id: user.user.id,
      email: user.user.email,
      token: user.token
    }
    
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
