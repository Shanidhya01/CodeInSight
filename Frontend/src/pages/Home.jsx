import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CodeEditor from "../components/CodeEditor";
import ReviewResult from "../components/ReviewResult";
import { submitCodeForReview } from "../utils/api";

export default function Home() {
  const { user } = useAuth();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async (filename, code) => {
    try {
      setLoading(true);
  const res = await submitCodeForReview(filename, code, user?.uid, user?.email);
      setReview(res.review);
    } catch (err) {
      console.error(err);
      alert("Error while reviewing code!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-950 text-white pt-2 pb-0 px-1" style={{ minHeight: 'calc(100vh - 64px - 48px)' }}>
      <h1 className="text-2xl font-bold text-indigo-400 mb-2">
        🤖 CodeInsight AI Reviewer
      </h1>
      <CodeEditor className="w-full" onSubmit={handleReview} />
      {loading && (
        <p className="text-indigo-400 mt-1 animate-pulse">Analyzing your code...</p>
      )}
      <ReviewResult review={review} />
    </div>
  );
}
