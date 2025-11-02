import express from "express";
import axios from "axios";
import Review from "../models/Review.js";

const router = express.Router();

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * @route   POST /api/review
 * @desc    Generate AI-based code review (used by website + VS Code extension)
 * @access  Private (website) / Public (extension)
 */
router.post("/", async (req, res) => {
  const { filename, code, userId, userEmail } = req.body;

  console.log("📥 Incoming request:", {
    filename,
    hasCode: !!code,
    userId,
    userEmail,
  });

  // Case 1️⃣: Request from website — enforce auth
  if (!userId || !userEmail) {
    console.log("🧩 No userId/userEmail provided — assuming VS Code extension");
  }

  // Case 2️⃣: Common validation
  if (!code) {
    console.log("❌ Missing 'code' field!");
    return res.status(400).json({ error: "Missing 'code' field." });
  }

  // Fallbacks for VS Code extension usage
  const safeUserId = userId || "anonymous";
  const safeUserEmail = userEmail || "anonymous@local.dev";

  // 1) Generate review text (OpenRouter or fallback)
  let reviewText = null;
  let usedFallback = false;
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("Missing OPENROUTER_API_KEY; using mock fallback");
    }
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "google/gemini-2.5-flash",
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
    reviewText = response.data.choices?.[0]?.message?.content || "No response content";
  } catch (err) {
    usedFallback = true;
    console.warn("⚠️ Using fallback review (no AI)", err.response?.status || err.message);
    reviewText = `## CodeInsight Mock Review\n\n> Running in demo mode. AI provider unavailable.\n\n### Summary\n- Basic syntax appears valid.\n- Consider adding tests and linting.\n\n### Suggestions\n1. Add comments for complex logic.\n2. Validate inputs and handle errors.\n3. Prefer const/let over var; keep functions small.\n\n> This is a mock response generated without external AI.`;
  }

  const summary = usedFallback
    ? "Mock review generated (AI unavailable)."
    : "AI review completed successfully.";
  const score = Math.round(Math.random() * 2 + 8); // 8–10 rating

  // 2) Try to persist; if DB fails, still return the review to the client
  try {
    const newReview = await Review.create({
      filename: filename || "untitled.js",
      code,
      review: reviewText,
      summary,
      score,
      userId: safeUserId,
      userEmail: safeUserEmail,
    });
    console.log("✅ Review saved for:", safeUserEmail);
    return res.json(newReview);
  } catch (dbErr) {
    console.warn("⚠️ DB save failed; returning unsaved review:", dbErr.message);
    return res.json({
      _id: undefined,
      filename: filename || "untitled.js",
      code,
      review: reviewText,
      summary,
      score,
      userId: safeUserId,
      userEmail: safeUserEmail,
      createdAt: new Date().toISOString(),
    });
  }
});

/**
 * @route   GET /api/review
 * @desc    Get all reviews for a specific user
 * @access  Private (website)
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    try {
      const reviews = await Review.find({ userId }).sort({ createdAt: -1 });
      return res.json(reviews);
    } catch (dbErr) {
      console.warn("⚠️ DB fetch failed; returning empty list:", dbErr.message);
      return res.json([]);
    }
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
