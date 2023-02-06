import Joi from "joi";

export const createHostSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  phone: Joi.number().min(10).max(11),
});

export const updateHostSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  phone: Joi.string().min(11).max(11),
});