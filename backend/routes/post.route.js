import express from "express";
import { body } from "express-validator";
import { createPost } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/user.middleware.js";

const postRouter = express.Router();

// Ensure validation and middleware are correctly applied
postRouter.post(
  "/create",
  body("title").isString().withMessage("Title is required"),
  body("synopsis").isString().withMessage("Synopsis is required"),
  body("aired").isString().withMessage("Aired date is required"),
  body("score").isString().withMessage("Score is required"),
  protectRoute,
  createPost
);

export default postRouter;
