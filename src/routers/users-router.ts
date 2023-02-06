import { Router } from "express";
import { createUserSchema, addPetSchema, deleteUserSchema} from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { 
    addToMyPets, 
    usersPost,
    userSignOut,
    getMyPets
} from "@/controllers";

const usersRouter = Router();

usersRouter
    .all("/*", authenticateToken)
    .post("/enroll", validateBody(createUserSchema), usersPost)
    .post("/mypets", validateBody(addPetSchema), addToMyPets)
    .get("/mypets", getMyPets)
    .delete("/sign-out", validateBody(deleteUserSchema), userSignOut)

export { usersRouter };
