// /src/handlers/index.ts
// All the handlers

import Elysia from "elysia";
import { authHandler } from "./auth";
import { apiHandler } from "./api";

export const handler = new Elysia().use(authHandler).use(apiHandler);
