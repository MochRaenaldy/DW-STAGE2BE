import db from "../libs/db";
import { Ilike } from "../types/like";

export const createLike = async (body :Ilike) => {
  const checkLike = await db.like.findFirst({
    where : {
      postId : body.postId,
      userId : body.userId,
  },
  });
if (checkLike) {
  return "user already liked this post";
} 
const Like = await db.like.create({
  data : body,
});

return Like;
} 

export const deleteLike = async (body :Ilike )  => {
  const existingLike = await db.like.findFirst({
    where : { 
      postId : body.postId,
      userId : body.userId,
    },
  });
  if (!existingLike) {
    return "user has not liked this post";
  }

  await db.like.delete({
    where : {
      id : existingLike.id,
    },
  });
  return "like deleted";
}

export const countLike = async (postId :number) => {
  const res = await db.posts.findUnique({
    where : {
      id : postId,
    },
    include: {
      likes: true,
    },
  });
  return res;
}

export const checkLike = async (body :Ilike) => {
  const existingLike = await db.like.findFirst({
    where: {
      postId: body.postId,
      userId: body.userId,
    },
  });

if (existingLike) {
  return true;
} else {
  return false;
}
}