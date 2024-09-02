import { Router } from "express";
import * as userController from "../controllers/UserController";
import authorization from "../middlewares/authorization";
import { uploadCloudinary } from "../middlewares/claudinary";
import { upload } from "../middlewares/fileUpload";
const userRoute = Router();

userRoute.get("/", userController.findAll);

userRoute.get("/:id", userController.findById);

userRoute.get("/search/:username", userController.findByUsername);

userRoute.patch(
  "/update/:id",
  upload.single("file"),
  uploadCloudinary,
  userController.update
);

userRoute.get("/userlogin/:userId", userController.findbyuserlogin);

userRoute.get("/follows/:id", userController.countFoll);

userRoute.get("/following/:id", userController.userFollowing);

userRoute.get("/follower/:id", userController.userFollower);

// userRoute.delete("/:id", userController.remove);

export default userRoute;

// profileRoute.post(
//   "/",
//   authorization,
//   upload.single("image"),
//   profileController.create
// );
