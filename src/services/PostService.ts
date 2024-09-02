import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";
import { IPosts } from "../types/post";

const posts: PostModels[] = [];

export const findAll = async () => {
  return await db.posts.findMany({
    where : {
      parentId:null 
    },
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
      comments: true,
      images: {
        select: {
          image: true,
        },
      },
    },
    orderBy: {
      createdAt:'desc',
    }
  });
};

export const findById = async (id: number) => {
  return await db.posts.findFirst({
    where: { id, parentId: null },
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
          email: true,
          fullName: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              profile_pic: true,
              email: true,
              fullName: true,
            },
          }
        },
      },
      images: {
        select: {
          image: true,
        },
      },
    },
    orderBy: {
      createdAt:'desc',
    },
  });
};

export const findByUserId = async (userId: number) => {
  return await db.posts.findMany({
    where: { userId, parentId: null },
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
      comments: true,
      images: {
        select: {
          image: true,

        }
      },
    },
    orderBy: {
      createdAt:'desc',
    },
  }
);
};

export const create = async (post: IPosts) => {
  const newPost = await db.posts.create({
    data: {
      ...post,
      images: {
        create:
          post.images &&
          post.images.map((image) => ({ image: image })),
      },
    },
  });

  return newPost;
};

export const update = async (id: number, post: PostModels) => {
  const updatedPost = await db.posts.update({
    data: post,
    where: { id },
  });
  return updatedPost;
};

export const remove = async (id: number) => {
  await db.posts.delete({ where: { id } });

  return "deleted";
};
