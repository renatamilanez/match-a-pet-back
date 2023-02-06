import { Router } from "express";
import { createHostSchema, updateHostSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { 
    hostsPost, 
    getHostData, 
    updateHostProfile 
} from "@/controllers";

const hostsRouter = Router();

hostsRouter
    .post("/enroll", validateBody(createHostSchema), hostsPost)
    .all("/*", authenticateToken)
    .get("/profile", getHostData)
    .put("/profile", validateBody(updateHostSchema), updateHostProfile);

export { hostsRouter };
