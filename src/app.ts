import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import { createClient } from "redis";

import { loadEnv, connectDb, disconnectDB } from "@/config";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";
import {
  authenticationRouter,
  hostsRouter,
  petsRouter,
  usersRouter,
} from "@/routers";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/sign-in", authenticationRouter)
  .use("/user", usersRouter)
  .use("/host", hostsRouter)
  .use("/pets", petsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

const redisClient = createClient();
export async function redisConnect() {
  await redisClient.connect();
}
export { redisClient };

export default app;
