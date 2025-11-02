export default function About() {
  return (
    <div className="mt-15 min-h-[calc(100vh-64px-64px)] w-full bg-transparent text-gray-300 flex flex-col items-center justify-center p-8 text-center relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl">💡</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-blue-400">
              About CodeInsight
            </h1>
          </div>
          
          <p className="max-w-4xl mx-auto leading-relaxed text-lg text-gray-300/90 mb-8">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-purple-300 font-semibold">CodeInsight</span> is an AI-powered
            Code Reviewer that helps developers write cleaner, more efficient, and bug-free code.
            It analyzes your source code using state-of-the-art AI models and provides instant
            feedback with explanations and best practices.
          </p>
        </div>

        {/* Features Section */}
        <div className="relative bg-linear-to-br from-gray-800/80 via-slate-800/80 to-gray-900/80 p-8 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-xl mb-12">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 opacity-50 blur-sm animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
              <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
                Features
              </h2>
              <div className="flex-1 h-px bg-linear-to-r from-indigo-500/50 to-transparent ml-4"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">🤖</span>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">AI-Powered Analysis</h3>
                  <p className="text-gray-400 text-sm">Advanced code review using OpenRouter API with state-of-the-art language models</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">⚡</span>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Instant Feedback</h3>
                  <p className="text-gray-400 text-sm">Real-time syntax analysis with improvement suggestions and best practices</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">🔒</span>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Secure Storage</h3>
                  <p className="text-gray-400 text-sm">Your code and reviews are securely stored using MongoDB with user authentication</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">💻</span>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Professional Editor</h3>
                  <p className="text-gray-400 text-sm">VS Code-style Monaco editor with syntax highlighting and intelligent features</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">📚</span>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Review History</h3>
                  <p className="text-gray-400 text-sm">Track your progress with searchable review history and management tools</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">🎨</span>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Modern Interface</h3>
                  <p className="text-gray-400 text-sm">Beautiful, responsive design with dark theme and smooth animations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
