import express from "express";
import axios from "axios";
import Review from "../models/Review.js";

const router = express.Router();

// OpenRouter endpoint
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * @route   POST /api/review
 * @desc    Generate AI-based code review
 * @access  Public
 */
router.post("/", async (req, res) => {
  const { filename, code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required." });
  }

  try {
    // 🔹 Send code to OpenRouter API
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "openai/gpt-oss-20b:free", // You can change this to another available model
        messages: [
          {
            role: "system",
            content:
              "You are CodeInsight, an expert AI code reviewer. Analyze the code for bugs, best practices, readability, security, and performance issues. Provide feedback in Markdown format with a clear summary and suggested improvements.",
          },
          {
            role: "user",
            content: `Review this code:\n\n${code}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 🔹 Extract AI's markdown review
    const reviewText = response.data.choices[0].message.content;

    // 🔹 Simple summary & rating logic
    const summary = "AI review completed successfully. Code quality analyzed.";
    const score = Math.round(Math.random() * 2 + 8); // Random score between 8–10

    // 🔹 Save to MongoDB
    const newReview = await Review.create({
      filename: filename || "untitled.js",
      code,
      review: reviewText,
      summary,
      score,
    });

    // 🔹 Return final response
    res.json({
      filename: newReview.filename,
      code: newReview.code,
      review: newReview.review,
      summary: newReview.summary,
      score: newReview.score,
      createdAt: newReview.createdAt,
    });
  } catch (err) {
    console.error("Error in /api/review:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to generate code review.",
      details: err.response?.data || err.message,
    });
  }
});

/**
 * @route   GET /api/review
 * @desc    Get all reviews
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
});

/**
 * @route   GET /api/review/:id
 * @desc    Get single review by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found." });
    res.json(review);
  } catch (err) {
    console.error("Error fetching review:", err.message);
    res.status(500).json({ error: "Failed to fetch review." });
  }
});

export default router;
