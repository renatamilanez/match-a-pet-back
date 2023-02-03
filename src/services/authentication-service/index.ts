import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/users-repository";
import hostRepository from "@/repositories/hosts-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";

async function signIn(email: string, password: string, userType: string): Promise<SignInResult> {  
  const user = await getUserOrFail(email);
  console.log(userType);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id, userType);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  const host = await hostRepository.findByEmail(email);
  if (!user && !host) throw invalidCredentialsError();
  if(user) return user;
  if(host) return host;
}

async function createSession(userId: number, userType: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  console.log(userType);
  if(userType === 'user'){
    await sessionRepository.create({
      token,
      userId,
    });
  }
  if(userType === 'host'){
    await sessionRepository.create({
      token,
      hostId: userId,
    });
  }

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type AuthSignInParams = Pick<User, "email">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
};

export default authenticationService;
export * from "./errors";
