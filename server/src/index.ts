// /src/index.ts
// Entry point to server

import { Elysia } from "elysia";
import { handler } from "./handlers";

const app = new Elysia().use(handler).listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
