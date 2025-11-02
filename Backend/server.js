import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

// Middleware
// Allow multiple origins, configurable via env var ALLOWED_ORIGINS (comma-separated)
const defaultOrigins = [
  "http://localhost:5173",
  "https://code-in-sight.vercel.app",
];
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser requests or same-origin
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, "");
      const list = allowedOrigins.length ? allowedOrigins : defaultOrigins;
      if (list.includes(cleanOrigin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
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
