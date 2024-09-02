import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { IPosts } from "../types/post";
import { Posts } from "@prisma/client";


export async function findAllInPost(postId: number) {
  return await db.posts.findMany({
    where: { parentId: postId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
      comments: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (postId: number) => {
  return await db.posts.findMany({
    where: { parentId: postId },
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
    },
  });
};

export async function addReply(post: IPosts) {
const newPost = await db.posts.create({
    data: {
      ...post,
      images: {
        create:
          post.images &&
          post.images.map((image) => ({ image: image})),
      },
    },
  });

  return newPost;
};

// export function create(body: any) {
//   throw new Error("Function not implemented.");
// }
// export const update = async (id: number, post: PostModels) => {
//   const updatedPost = await db.posts.update({
//     data: post,
//     where: { id },
//   });

//   return updatedPost;
// };

// export const remove = async (id: number) => {
//   await db.posts.delete({ where: { id } });

//   return "deleted";
// };
