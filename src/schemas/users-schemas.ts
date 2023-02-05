import { CreateUserParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  state: Joi.string().required()
});

export const addPetSchema = Joi.object({
  petId: Joi.number().required(),
  count: Joi.number().required()
});

export const deleteUserSchema = Joi.object({
  token: Joi.string().required()
});
