import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { 
    getPets,
    getPetsByType,
    getTypes,
    getPetById
} from "@/controllers";

const petsRouter = Router();

petsRouter
    .get("", getPets)
    .get("/type/:type", getPetsByType)
    .get("/types", getTypes)
    .get("/id/:petId", getPetById);

export { petsRouter };
