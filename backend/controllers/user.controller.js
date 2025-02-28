import { validationResult } from "express-validator";
import userModel from "./../models/user.model.js";
import createUser from "./../services/auth.service.js";
import cloudinary from './../config/cloudinary.js';

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "production",
    });
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user.id;

    // Check if profile picture is provided
    if (!profilePicture) {
      return res.status(400).json({ message: "Invalid profile picture" });
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePicture);

    // Update user profile with the uploaded image URL
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const logoutUser = async (req, res) => {
  res.clearCookie("jwt", "", { maxAge: 0 });
  res.json({ message: "User logged out" });
};

export const checkAuth = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("error in checking authentication", error);
    res.status(500).json({ message: "Server Error" });
  }
};
