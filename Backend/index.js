import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./config/dbConnect.js";
import authRoute from "./routes/authRouter.js";
import jobRoute from "./routes/jobRouter.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ CORS setup (allow your Vercel frontend + localhost for dev)
const corsOption = {
  origin: [
    "https://career-view-64v6.vercel.app", // ✅ deployed frontend
    "http://localhost:5173"                // ✅ dev frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOption));

// ✅ Handle preflight (OPTIONS) requests
app.options("*", cors(corsOption));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/v1", authRoute);
app.use("/api/v1", jobRoute);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed.", error);
    process.exit(1);
  }
};

startServer();
