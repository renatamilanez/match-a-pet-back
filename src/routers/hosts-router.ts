import { Router } from "express";

import { createHostSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { usersPost } from "@/controllers";

const hostsRouter = Router();

hostsRouter.post("/", validateBody(createHostSchema), usersPost);

export { hostsRouter };
