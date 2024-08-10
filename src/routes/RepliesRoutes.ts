import { Router } from "express";
import * as replyController from "../controllers/ReplyController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
const repliesRoute = Router();

repliesRoute.get("/:postId", replyController.findAll);

repliesRoute.get("/:id", replyController.findById);

repliesRoute.post(
  "/:postId",
  authorization,
  upload.single("image"),
  replyController.create
);

// repliesRoute.put("/:id", replyController.update);

// repliesRoute.delete("/:id", replyController.remove);

export default repliesRoute;
