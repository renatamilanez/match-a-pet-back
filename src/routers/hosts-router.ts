import { Router } from "express";
import { createHostSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { hostsPost } from "@/controllers";

const hostsRouter = Router();

hostsRouter.post("/enroll", validateBody(createHostSchema), hostsPost);

export { hostsRouter };
