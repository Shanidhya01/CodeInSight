import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteReview } from "../utils/api";
import { toast } from "react-toastify";

export default function ReviewCard({ review, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteReview(review._id);
      onDelete(review._id);
      toast.success("Review deleted", { position: "top-center" });
    } catch (err) {
      toast.error("Failed to delete review.", { position: "top-center" });
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const cancelDelete = () => setShowConfirm(false);

  return (
    <>
      <div className="group relative bg-linear-to-br from-gray-800 via-slate-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6 mb-4 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
        
        {/* Header */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-linear-to-r from-indigo-400 to-purple-400"></div>
              <h3 className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
                {review.filename}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span>📅</span>
                <span>{new Date(review.createdAt).toLocaleString()}</span>
              </span>
              {review.score && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span>⭐</span>
                    <span className="text-yellow-400 font-medium">{review.score}/10</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 ml-4">
            <button
              onClick={handleDeleteClick}
              disabled={deleting}
              className="group/btn relative p-2 text-red-400 hover:text-red-300 transition-all duration-300 hover:bg-red-500/10 rounded-xl"
              title="Delete review"
            >
              <TrashIcon className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
              <div className="absolute inset-0 bg-red-500/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity blur-sm"></div>
            </button>

            <button
              onClick={() => setExpanded(!expanded)}
              className="group/btn relative p-2 text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:bg-indigo-500/10 rounded-xl"
              title={expanded ? "Collapse review" : "Expand review"}
            >
              {expanded ? (
                <ChevronUpIcon className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
              )}
              <div className="absolute inset-0 bg-indigo-500/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity blur-sm"></div>
            </button>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="relative z-10 mt-6 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gray-950/80 backdrop-blur-sm border border-gray-700/30 rounded-xl p-5 shadow-inner">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
                <span className="text-sm font-medium text-gray-300">📝 AI Review</span>
                <div className="flex-1 h-px bg-linear-to-r from-indigo-500/50 to-transparent"></div>
              </div>
              <div className="prose prose-sm prose-invert max-w-none text-gray-200 leading-relaxed">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => <h1 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2"><span>📋</span>{children}</h1>,
                    h2: ({children}) => <h2 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2"><span>🔍</span>{children}</h2>,
                    h3: ({children}) => <h3 className="text-base font-medium text-blue-300 mb-2 flex items-center gap-2"><span>💡</span>{children}</h3>,
                    ul: ({children}) => <ul className="list-none space-y-2 my-4">{children}</ul>,
                    li: ({children}) => <li className="flex items-start gap-2 text-gray-300"><span className="text-indigo-400 mt-1">•</span><span>{children}</span></li>,
                    p: ({children}) => <p className="text-gray-200 mb-3 leading-relaxed">{children}</p>,
                    code: ({children}) => <code className="bg-gray-800/80 text-indigo-300 px-2 py-1 rounded text-sm font-mono border border-gray-700/50">{children}</code>,
                    pre: ({children}) => <pre className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 overflow-x-auto my-4 shadow-inner">{children}</pre>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-500/5 rounded-r-lg my-4 text-gray-300">{children}</blockquote>,
                    strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                    em: ({children}) => <em className="text-indigo-200 italic">{children}</em>,
                    a: ({href, children}) => <a href={href} className="text-indigo-400 hover:text-indigo-300 underline transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>
                  }}
                >
                  {review.review}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
          <div className="relative bg-linear-to-br from-gray-800 via-slate-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-600/50 text-center backdrop-blur-sm max-w-md mx-4">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-3xl pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-linear-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrashIcon className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-xl font-bold mb-2 text-gray-100">
                Delete Review
              </h2>
              <p className="text-gray-300 mb-2 font-medium">
                {review.filename}
              </p>
              <p className="text-gray-400 mb-8 text-sm">
                This action cannot be undone. The review will be permanently removed.
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="group relative px-6 py-3 bg-linear-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {deleting && (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    )}
                    {deleting ? "Deleting..." : "Yes, Delete"}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={cancelDelete}
                  disabled={deleting}
                  className="group relative px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-gray-200 rounded-xl font-medium transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
