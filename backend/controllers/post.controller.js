import { validationResult } from "express-validator";
import postModel from "./../models/post.model.js";
import cloudinary from './../config/cloudinary.js';

export const createPost = async (req, res, next) => {
  console.log("User from protectRoute:", req.user); // Debugging log

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, synopsis, aired, score } = req.body;
    const image=req.file;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path,{ resource_type: "image" });

    const newPost = new postModel({
      title,
      synopsis,
      aired,
      score,
      createdBy: req.user.id,
      image:result.secure_url,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};