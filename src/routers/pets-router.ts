import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPetSchema } from "@/schemas";
import { 
    getPets,
    getPetsByType,
    getTypes,
    getPetById,
    createPet,
    updatePetAvailability
} from "@/controllers";

const petsRouter = Router();

petsRouter
    .get("", getPets)
    .get("/type/:type", getPetsByType)
    .get("/types", getTypes)
    .get("/id/:petId", getPetById)
    .post("/", validateBody(createPetSchema), createPet)
    .put("/:petId", updatePetAvailability);

export { petsRouter };
