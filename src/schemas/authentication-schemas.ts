import { AuthSignInParams } from "@/services";
import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userType: Joi.string().required(),
});

export const authSignInSchema = Joi.object<AuthSignInParams>({
  email: Joi.string().email().required(),
});
