import { Router } from "express";
import { createUserSchema, addPetSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { addToMyPets, usersPost } from "@/controllers";

const usersRouter = Router();

usersRouter
    .post("/enroll", validateBody(createUserSchema), usersPost)
    .post("/mypets", validateBody(addPetSchema), addToMyPets)

export { usersRouter };
