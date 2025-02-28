import { validationResult } from "express-validator";
import postModel from "./../models/post.model.js";

export const createPost = async (req, res, next) => {
    console.log("User from protectRoute:", req.user); // Debugging log

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, synopsis, aired, score } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const newPost = new postModel({
            title, 
            synopsis, 
            aired, 
            score,
            createdBy: req.user.id
           
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};