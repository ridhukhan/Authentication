import express from "express";
import userRoute from "./routes/user.js";
import { createClient } from "redis";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/api/user", userRoute);

app.use(cookieParser())
/* ---------- MongoDB ---------- */
await connectDB();

/* ---------- Redis ---------- */
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.log("missing redis");
  process.exit(1);
}

export const redisClint = createClient({
  url: redisUrl,
});

/* 🔥 এই লাইনটাই সবচেয়ে important (NEW) */
redisClint.on("error", (err) => {
  console.log("Redis error:", err.message);
});

/* আগের connect, শুধু await করা */
try {
  await redisClint.connect();
  console.log("connected to redis");
} catch (err) {
  console.log("redis connect error:", err.message);
}

/* ---------- Server ---------- */
app.listen(PORT, () => {
  console.log(`your app is running at http://localhost:${PORT}`);
});
