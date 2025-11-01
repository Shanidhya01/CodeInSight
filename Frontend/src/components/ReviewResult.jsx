import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReviewResult({ review }) {
  if (!review) return null;

  return (
    <div className="w-full mt-6 bg-[#1e293b] p-5 rounded-2xl border border-gray-700 shadow-lg text-gray-100">
      <h2 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
        🧠 AI Review
      </h2>

      <div className="markdown-body text-sm leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{review}</ReactMarkdown>
      </div>
    </div>
  );
}
