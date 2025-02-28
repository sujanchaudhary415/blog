import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes

app.use("/api/user", userRouter);

// Middleware to validate incoming requests
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
