// /src/handlers/auth.ts
// Authentication request handler

import { Elysia, t } from "elysia";
import { generateToken, getUserByUsername, signup } from "../services/auth";

export const authHandler = new Elysia({ prefix: "/auth" })
  .post(
    "/signup",
    async ({ body, error }) => {
      try {
        const token = await generateToken(body.username);

        await signup(body.username, body.password, token);
      } catch (err) {
        console.log(err);
        return error(500); // Internal server error
      }
    },
    {
      body: t.Object({
        username: t.String({
          maxLength: 20,
        }),
        password: t.String({
          minLength: 8,
          maxLength: 30,
        }),
      }),
    },
  )
  .post(
    "/login",
    async ({ body, error }) => {
      try {
        const user = await getUserByUsername(body.username);

        if (user === null) {
          // If user doens't exist
          return error(401); // Unauthorized
        } else {
          // If the user exists
          const authorized = await Bun.password.verify(
            body.password,
            user.password,
          );

          return authorized ? { token: user.token } : error(401); // Give token if authorized, else give error 401
        }
      } catch (err) {
        console.log(err);
        return error(500); // Internal server error
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String({
          minLength: 8,
        }),
      }),
    },
  );
