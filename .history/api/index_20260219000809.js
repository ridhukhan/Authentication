import express from "express";
import userRoute from "./routes/user.js";
import { createClient } from "redis";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./Socket/Socket.js";

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(cors({
  origin: "https://spaytimes.xyz",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Routes
app.use("/api/user", userRoute);

// Database ar Redis Connect korar jonno ekti function
const initializeServices = async () => {
  try {
    await connectDB();
    
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      const redisClint = createClient({ url: redisUrl });
      redisClint.on("error", (err) => console.log("Redis error:", err.message));
      await redisClint.connect();
      console.log("Connected to Redis");
    }
  } catch (err) {
    console.error("Initialization error:", err.message);
  }
};

// Vercel-er jonno eita dorkar
initializeServices();

// Local-e thakle server listen hobe, Vercel-e eita ignore hobe
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Most Important for Vercel
export default app;