import { Router } from "express";
import * as postController from "../controllers/PostController";
import authorization from "../middlewares/authorization";
import { upload } from "../middlewares/fileUpload";
import { uploadCloudinary } from "../middlewares/claudinary";
const postRoute = Router();

postRoute.get("/", authorization, postController.findAll);

postRoute.get("/:id", authorization, postController.findById);

postRoute.get("/byUser/:id", authorization, postController.findByUserId);

postRoute.post(
  "/",
  authorization,
  upload.array("files"),
  uploadCloudinary,
  postController.create
);

postRoute.put("/:id", authorization, postController.update);

postRoute.delete("/:id", authorization, postController.remove);

export default postRoute;
