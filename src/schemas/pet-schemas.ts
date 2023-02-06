import Joi from "joi";

const urlRegex = new RegExp(`(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`);

export const createPetSchema = Joi.object({
    name: Joi.string().required(),
    hostId: Joi.number().required(),
    petType: Joi.string().required(),
    age: Joi.number().required(),
    race: Joi.string().required(),
    isVaccinated: Joi.boolean().required(),
    picture: Joi.string().regex(urlRegex).required(),
  });