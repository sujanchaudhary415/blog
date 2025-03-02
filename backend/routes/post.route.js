import express from "express";
import { body } from "express-validator";
import { addComment, createPost, fetchPostById, fetchPosts } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/user.middleware.js";
import upload from './../middlewares/multer.js';

const postRouter = express.Router();

// Ensure validation and middleware are correctly applied
postRouter.post(
  "/create",
  upload.single("image"),  // Handle image uploads
  body("title").isString().withMessage("Title is required"),
  body("synopsis").isString().withMessage("Synopsis is required"),
  body("aired").isString().withMessage("Aired date is required"),
  body("score").isString().withMessage("Score is required"),
  protectRoute,
  createPost
);

postRouter.get("/get", protectRoute,fetchPosts)
postRouter.get("/:id", protectRoute,fetchPostById)
postRouter.post("/:id/comments", protectRoute,addComment)


export default postRouter;
