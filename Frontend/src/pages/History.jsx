import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getReviews } from "../utils/api";
import ReviewCard from "../components/ReviewCard";

export default function History() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!user) return;
    getReviews(user.uid)
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch((e) => {
        console.error(e);
        const detail = e?.response?.data?.error || e?.response?.data?.message || e.message;
        toast.error(`Failed to load history: ${detail}` , { position: "top-center" });
      });
  }, [user]);

  if (!user)
    return (
      <div className="min-h-[calc(100vh-64px-64px)] grid place-items-center bg-transparent text-gray-300 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-linear-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-3">Authentication Required</h2>
          <p className="text-gray-400 mb-6">Please login to view your review history.</p>
          <a 
            href="/login" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5"
          >
            <span>🚀</span>
            <span>Login Now</span>
          </a>
        </div>
      </div>
    );

  return (
    <div className="mt-16 min-h-[calc(100vh-64px-64px)] w-full bg-transparent text-gray-100 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-blue-400">
                Review History
              </h2>
              <p className="text-gray-400 text-sm mt-1">Track your code review journey</p>
            </div>
          </div>
          <div className="h-px bg-linear-to-r from-indigo-500/50 via-purple-500/50 to-transparent w-full"></div>
        </div>

        {/* Content */}
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative bg-linear-to-br from-gray-800/60 via-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 max-w-2xl mx-auto">
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-linear-to-r from-gray-600 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-3">No Reviews Yet</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Start your code review journey! Submit your first piece of code to get AI-powered insights and feedback.
                </p>
                <a 
                  href="/" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5"
                >
                  <span>🚀</span>
                  <span>Start Reviewing Code</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-sm">
                Found <span className="text-indigo-400 font-semibold">{reviews.length}</span> review{reviews.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 rounded-full bg-indigo-500/60 animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-purple-500/60 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 rounded-full bg-blue-500/60 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span>Latest First</span>
              </div>
            </div>
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onDelete={(id) => setReviews(reviews.filter((r) => r._id !== id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
