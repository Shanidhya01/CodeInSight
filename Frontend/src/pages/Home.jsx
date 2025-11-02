import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import CodeEditor from "../components/CodeEditor";
import ReviewResult from "../components/ReviewResult";
import { submitCodeForReview } from "../utils/api";

export default function Home() {
  const { user } = useAuth();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async (filename, code) => {
    // Require authentication before allowing code review
    if (!user) {
      toast.info("Please login or register to review your code.", {
        position: "top-center",
        autoClose: 3500,
      });
      return;
    }
    try {
      setLoading(true);
  const res = await submitCodeForReview(filename, code, user?.uid, user?.email);
      setReview(res.review);
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.error || err?.response?.data?.message || err.message;
      toast.error(`Error while reviewing code: ${detail}`, { position: "top-center", autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 min-h-[calc(100vh-64px-64px)] w-full bg-transparent text-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="text-3xl">🤖</span>
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-blue-400">
                CodeInsight AI
              </h1>
              <p className="text-lg text-gray-300 font-medium">Intelligent Code Reviewer</p>
            </div>
          </div>
          
          <p className="max-w-2xl mx-auto text-gray-300/90 leading-relaxed mb-8">
            Get instant AI-powered feedback on your code. Our advanced analysis helps you write cleaner, 
            more efficient, and bug-free applications with expert suggestions and best practices.
          </p>

          {/* Features highlight */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <span className="text-green-400">⚡</span>
              <span className="text-sm text-gray-300">Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <span className="text-blue-400">🧠</span>
              <span className="text-sm text-gray-300">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <span className="text-purple-400">🔒</span>
              <span className="text-sm text-gray-300">Secure</span>
            </div>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="mb-8">
          <CodeEditor className="w-full" onSubmit={handleReview} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="relative bg-linear-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-purple-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <div>
                  <p className="text-indigo-300 font-medium">Analyzing your code...</p>
                  <p className="text-gray-400 text-sm">Our AI is reviewing for best practices and improvements</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Result */}
        <ReviewResult review={review} />

        {/* Bottom CTA when no review */}
        {!review && !loading && (
          <div className="text-center mt-12">
            <div className="relative bg-linear-to-br from-gray-800/60 via-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-linear-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">Ready to Get Started?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Paste your code above and click "Review Code" to receive intelligent feedback and suggestions.
                </p>
                <div className="flex justify-center gap-2 text-xs text-gray-500">
                  <span>Supports:</span>
                  <span className="text-indigo-400">JavaScript</span>
                  <span>•</span>
                  <span className="text-purple-400">Python</span>
                  <span>•</span>
                  <span className="text-blue-400">Java</span>
                  <span>•</span>
                  <span className="text-green-400">And more...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
