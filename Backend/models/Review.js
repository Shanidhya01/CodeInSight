import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    filename: String,
    code: String,
    review: String,
    summary: String,
    score: Number,
    userId: {
      type: String,
      required: false,
      index: true,
    },
    userEmail: {
      type: String,
      required: false,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
