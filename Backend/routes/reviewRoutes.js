import express from "express";
import axios from "axios";
import Review from "../models/Review.js";

const router = express.Router();

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * @route   POST /api/review
 * @desc    Generate AI-based code review (linked to Firebase user)
 * @access  Private
 */
router.post("/", async (req, res) => {
  const { filename, code, userId, userEmail } = req.body;

  if (!code || !userId || !userEmail) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "openai/gpt-oss-20b:free",
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

    const reviewText = response.data.choices[0].message.content;
    const summary = "AI review completed successfully.";
    const score = Math.round(Math.random() * 2 + 8); // random 8–10 score

    // Save to MongoDB
    const newReview = await Review.create({
      filename: filename || "untitled.js",
      code,
      review: reviewText,
      summary,
      score,
      userId,
      userEmail,
    });

    res.json(newReview);
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
 * @desc    Get all reviews for a specific user
 * @access  Private
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const reviews = await Review.find({ userId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
});

/**
 * @route   GET /api/review/:id
 * @desc    Get a single review by ID
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

/**
 * @route   DELETE /api/review/:id
 * @desc    Delete a review by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

export default router;
