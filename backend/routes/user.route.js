import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  checkAuth,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import { protectRoute } from './../middlewares/user.middleware.js';
import { updateUserProfile } from './../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post(
  "/register",
  body("name").isString().withMessage("name is required"),
  body("email").isEmail().withMessage("email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  registerUser
);

userRouter.post(
  "/login",
  body("email").isEmail().withMessage("email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  loginUser
);

userRouter.post("/logout", logoutUser);

userRouter.get("/check",protectRoute,checkAuth);

userRouter.put("/updateProfile",protectRoute,updateUserProfile);


export default userRouter;
