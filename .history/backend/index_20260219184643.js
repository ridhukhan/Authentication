import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import { app, server } from "./Socket/Socket.js";

import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/message.js";

dotenv.config();

// Trust proxy
app.set("trust proxy", 1);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

connectDB();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
