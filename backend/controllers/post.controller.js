import { validationResult } from "express-validator";
import postModel from "./../models/post.model.js";
import cloudinary from "./../config/cloudinary.js";
import userModel from './../models/user.model.js';

export const createPost = async (req, res, next) => {
  console.log("User from protectRoute:", req.user); // Debugging log

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, synopsis, aired, score } = req.body;
    const image = req.file;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const newPost = new postModel({
      title,
      synopsis,
      aired,
      score,
      createdBy: req.user.id,
      image: result.secure_url,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const fetchPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("createdBy", "name email profilePicture");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const fetchPostById = async (req, res) => {
  try {
    const post = await postModel
      .findById(req.params.id)
      .populate("createdBy", "name email profilePicture");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // postId
    const { text } = req.body;
    const userId = req.user?.id;

    if (!text) {
      return res.status(400).json({ message: "Invalid comment" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentData = {
      text,
      createdBy: userId,
      createdAt: new Date(),
    };

    // Call the addComment method on the post instance
    const result = await post.addComment(commentData);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
