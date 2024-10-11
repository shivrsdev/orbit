// /src/services/posts.ts
// Posts services

import { prisma } from "../database";

export const createPost = async (
  userId: number,
  title: string,
  content: string
) => {
  await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const getNewestPosts = async (userId: number) => {
  // Use orderBy to get only the newest
  // Use take to specify the amount of posts we want
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: {
      id: "desc",
    },
  });

  // Use posts.map to add a like count to all the posts
  // Wrap posts.map in Promise.all for us to use async
  const postsWithInfo = await Promise.all(
    posts.map(async (post) => {
      const user = await prisma.user.findFirst({
        where: {
          id: post.authorId,
        },
      });

      const likes = await prisma.like.findMany({
        where: {
          post: {
            id: post.id,
          },
        },
      });

      const userLike = await prisma.like.findFirst({
        where: {
          user: {
            id: userId,
          },
          post: {
            id: post.id,
          },
        },
      });

      // Return everything inside posts, then the extra info
      // (using the ... spread operator to grab everything inside post)
      return {
        ...post,
        author: user?.username,
        likesCount: likes.length,
        liked: userLike !== null,
      };
    })
  );

  return postsWithInfo;
};

export const getPost = async (userId: number, postId: number) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: post?.authorId,
    },
  });

  const likes = await prisma.like.findMany({
    where: {
      post: {
        id: post?.id,
      },
    },
  });

  const userLike = await prisma.like.findFirst({
    where: {
      user: {
        id: userId,
      },
      post: {
        id: post?.id,
      },
    },
  });

  // Return everything inside posts, then the extra info
  // (using the ... spread operator to grab everything inside post)
  return {
    ...post,
    author: user?.username,
    likesCount: likes.length,
    liked: userLike !== null,
  };
};

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
  const repliesWithInfo = await Promise.all(replies.map(async (reply) => {
    const user = await prisma.user.findFirst({
      where: {
        id: reply.authorId
      }
    });

    return {
      ...reply,
      author: user?.username
    };
  }));

  return repliesWithInfo;
};

export const likePost = async (userId: number, postId: number) => {
  const like = await prisma.like.findFirst({
    where: {
      user: {
        id: userId,
      },
      post: {
        id: postId,
      },
    },
  });

  if (!like) {
    await prisma.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  } else {
    // Finally, delete the like
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
  }
};

export const replyToPost = async (
  userId: number,
  postId: number,
  content: string
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
