import { Router } from "express";
import { createUserSchema, addPetSchema, deleteUserSchema} from "@/schemas";
import { validateBody } from "@/middlewares";
import { 
    addToMyPets, 
    usersPost,
    userSignOut
} from "@/controllers";

const usersRouter = Router();

usersRouter
    .post("/enroll", validateBody(createUserSchema), usersPost)
    .post("/mypets", validateBody(addPetSchema), addToMyPets)
    .delete("/sign-out", validateBody(deleteUserSchema), userSignOut)

export { usersRouter };
