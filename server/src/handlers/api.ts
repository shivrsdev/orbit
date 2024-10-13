// /src/handlers/api.ts
// API request handler

import Elysia, { t } from "elysia";
import {
  createPost,
  getNewestPosts,
  getPost,
  likePost,
} from "../services/posts";
import { getNewestRepliesOfPost, replyToPost } from "../services/replies";
import { getUserByToken } from "../services/auth";

export const apiHandler = new Elysia({ prefix: "/api" })
  .derive(async ({ headers, error }) => {
    const token = headers["authorization"];

    if (!token) return error(401); // Unauthorized

    const user = await getUserByToken(token);

    if (!user) return error(401); // Unauthorized

    return {
      user: user,
    };
  })
  .post(
    "/posts",
    async ({ user, body, error }) => {
      try {
        await createPost(user.id, body.title, body.content);
      } catch (err) {
        console.error(err);
        return error(500); // Internal server error; 500
      }
    },
    {
      body: t.Object({
        title: t.String({
          maxLength: 30,
        }),
        content: t.String({
          maxLength: 69,
        }),
      }),
    }
  )
  .get(
    "/posts/:id",
    async ({ user, params, error }) => {
      try {
        // Params.id represents the post id
        return await getPost(user.id, params.id);
      } catch (err) {
        console.error(err);
        return error(500); // Internal server error
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .get("/posts/newest", async ({ user, error }) => {
    try {
      const posts = await getNewestPosts(user.id);

      return posts;
    } catch (err) {
      console.error(err);
      return error(500); // Internal server error; 500
    }
  })
  .post(
    "/posts/:id/like",
    async ({ user, params, error }) => {
      try {
        // Params.id is the target post id
        await likePost(user.id, params.id);
      } catch (err) {
        console.error(err);
        return error(500); // Internal server error; 500
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .get(
    "/posts/:id/replies/newest",
    async ({ params, error }) => {
      try {
        const replies = await getNewestRepliesOfPost(params.id);
        return replies;
      } catch (err) {
        console.error(err);
        return error(500); // Internal server error
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .post(
    "/posts/:id/replies",
    async ({ user, body, params, error }) => {
      try {
        await replyToPost(user.id, params.id, body.content);
      } catch (err) {
        console.error(err);

        return error(500); // Internal server error
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      body: t.Object({
        content: t.String(),
      }),
    }
  );
