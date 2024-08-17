import { createPostSchema } from "../libs/validations/post";
import * as userservice from "../services/UserService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAll = async (req: Request, res: Response) => {
  const user = await userservice.findAll();
  res.json(user);
};

export const findById = async (req: Request, res: Response) => {
  const user = await userservice.findById(parseInt(req.params.id));
  res.json(user);
};

export async function findByUsername(req: Request, res: Response) {
  console.log(req.params)
  const user = await userservice.findByUsername(req.params.username);
  res.json(user);
}

export const update = async (req: Request, res: Response) => {
  const user = await userservice.update(parseInt(req.params.id), req.body);
  console.log(user);
  res.json({
    message: "update successfully",
    data: user,
  });
};

// export const remove = (req: Request, res: Response) => {
//   const user = userservice.remove(parseInt(req.params.id));
//   res.json({
//     message: "remove successfully",
//     data: user,
//   });
// };

// export const create = async (req: Request, res: Response) => {
//   try {
//     await createuserSchema.validateAsync(req.body);

//     console.log(req.file);
//     if (req.file) {
//       req.body.image = req.file.filename;
//     }

//     const user = await profileservice.create(req.body);
//     res.json({
//       message: "user created successfully",
//       data: user,
//     });
//   } catch (error) {
//     errorHandler(res, error as unknown as Error);
//   }
// };
