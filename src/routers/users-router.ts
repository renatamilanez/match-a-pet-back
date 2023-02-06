import { Router } from "express";
import { createUserSchema, addPetSchema, updateUserSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { 
    addToMyPets, 
    usersPost,
    userSignOut,
    getMyPets,
    getProfileData,
    updateUserProfile
} from "@/controllers";

const usersRouter = Router();

usersRouter
    .post("/enroll", validateBody(createUserSchema), usersPost)
    .all("/*", authenticateToken)
    .post("/mypets", validateBody(addPetSchema), addToMyPets)
    .get("/mypets", getMyPets)
    .delete("/sign-out", userSignOut)
    .get("/profile", getProfileData)
    .put("/profile", validateBody(updateUserSchema), updateUserProfile);

export { usersRouter }; 
