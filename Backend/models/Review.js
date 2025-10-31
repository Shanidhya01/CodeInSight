import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: "",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
