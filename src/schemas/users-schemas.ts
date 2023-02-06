import { CreateUserParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  phone: Joi.number().min(11).max(11),
});

export const addPetSchema = Joi.object({
  petId: Joi.number().required(),
  count: Joi.number().required()
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  phone: Joi.string().min(11).max(11),
});
