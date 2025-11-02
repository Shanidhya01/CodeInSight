import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: ["https://code-in-sight.vercel.app/", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/review", reviewRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 CodeInsight API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
