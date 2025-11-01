import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteReview } from "../utils/api";

export default function ReviewCard({ review, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this review permanently?")) return;
    try {
      setDeleting(true);
      await deleteReview(review._id);
      onDelete(review._id);
    } catch (err) {
      alert("Failed to delete review.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-3 transition-all duration-300 hover:border-indigo-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-indigo-400">{review.filename}</h3>
          <p className="text-xs text-gray-400">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-400 hover:text-red-500 transition"
            title="Delete review"
          >
            <TrashIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-300 hover:text-indigo-400"
          >
            {expanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 bg-gray-900 text-gray-200 text-sm p-3 rounded-md whitespace-pre-wrap">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{review.review}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
