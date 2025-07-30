import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./config/dbConnect.js";
import authRoute from "./routes/authRouter.js"
import jobRoute from "./routes/jobRouter.js"
import dotenv from "dotenv"


dotenv.config();


const app = express();

const allowedOrigins = [
  "https://careerview.vercel.app",
  "http://localhost:3000"
];
const corsOption = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS" ));
    }
  },
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",authRoute);
app.use("/api/v1",jobRoute)

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB. Server not started.", error);
    process.exit(1);
  }
};

startServer();
