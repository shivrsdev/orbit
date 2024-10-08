// /src/services/auth.ts
// Authentication service

import { randomBytes } from "crypto";
import { prisma } from "../database";

export const generateToken = async (username: string) => {
  // Token is the username.randomBytes in argon2 hash
  // It has to be unique because two users cant have the same username
  // And the username is in the hash
  return await Bun.password.hash(username + randomBytes(48));
};

export const signup = async (
  username: string,
  password: string,
  token: string,
) => {
  const passwordHashed = await Bun.password.hash(password);

  await prisma.user.create({
    data: {
      username: username,
      password: passwordHashed,
      token: token,
    },
  });
};

export const getUserByToken = async (token: string) => {
  if (!token) return;

  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
  });

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  return user;
};
