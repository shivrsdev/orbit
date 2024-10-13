// /src/services/replies.ts
// Replies service

import { prisma } from "../database";

export const getNewestRepliesOfPost = async (postId: number) => {
  const replies = await prisma.reply.findMany({
    where: {
      post: {
        id: postId,
      },
    },
    take: 10,
    orderBy: {
      id: "desc",
    },
  });

  // Wrap in Promise.all to use async when filtering replies
  const repliesWithInfo = await Promise.all(
    replies.map(async (reply) => {
      const user = await prisma.user.findFirst({
        where: {
          id: reply.authorId,
        },
      });

      return {
        ...reply,
        author: user?.username,
      };
    }),
  );

  return repliesWithInfo;
};

export const replyToPost = async (
  userId: number,
  postId: number,
  content: string,
) => {
  const reply = await prisma.reply.create({
    data: {
      author: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
      content: content,
    },
  });

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      replies: {
        connect: {
          id: reply.id,
        },
      },
    },
  });
};