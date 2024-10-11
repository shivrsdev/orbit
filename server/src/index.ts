// /src/index.ts
// Entry point to server

import { Elysia } from "elysia";
import { handler } from "./handlers";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
  .use(swagger())
  .use(handler)
  .listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
