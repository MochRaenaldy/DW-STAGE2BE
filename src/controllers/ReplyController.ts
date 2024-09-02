import { createPostSchema } from "../libs/validations/post";
import * as replyService from "../services/ReplyService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export async function findAllInPost(req: Request, res: Response) {
  const post = await replyService.findAllInPost(Number(req.params.postId));
  res.json(post);
}

export const findById = async (req: Request, res: Response) => {
  const post = await replyService.findById(parseInt(req.params.postId));
  res.json(post);
};

export const addReply = async (req: Request, res: Response) => {
  try {
    await createPostSchema.validateAsync(req.body);
    if (res.locals.images) {
      req.body.images = res.locals.images;
    }

    const postId = parseInt(req.params.postId);
    const userId = res.locals.user.id;
    req.body.userId = userId;
    req.body.parentId = postId;

    const post = await replyService.addReply(req.body);
    res.json({
      message: "Reply Post  successfully",
      data: post,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

// export const update = (req: Request, res: Response) => {
//   const post = replyService.update(parseInt(req.params.id), req.body);
//   res.json(post);
// };

// export const remove = (req: Request, res: Response) => {
//   const post = replyService.remove(parseInt(req.params.id));
//   res.json(post);
// };
