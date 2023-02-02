import { CreateHostParams } from "@/services/hosts-service";
import Joi from "joi";

export const createHostSchema = Joi.object<CreateHostParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  state: Joi.string().required()
});
