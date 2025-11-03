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
          
          <p className="max-w-4xl mx-auto leading-relaxed text-lg text-gray-300/90 mb-6">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-purple-300 font-semibold">CodeInsight</span> is an AI-powered
            Code Reviewer that helps developers write cleaner, more efficient, and bug-free code.
            It analyzes your source code using state-of-the-art AI models and provides instant
            feedback with explanations and best practices.
          </p>
          
          {/* VS Code Extension Notice */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl border border-indigo-400/30 mb-8">
            <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z" fill="#007ACC"/>
                <path d="M14.925 1.148L18.503.02a.749.749 0 0 1 1.047.69v22.58a.749.749 0 0 1-1.047.69l-3.578-1.128a.749.749 0 0 1-.503-.706V1.854a.749.749 0 0 1 .503-.706z" fill="#1F9CF0"/>
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-indigo-300">Available as VS Code Extension!</p>
              <p className="text-xs text-gray-400 mb-2">Get code reviews directly in your editor with our VS Code extension</p>
              <a 
                href="https://marketplace.visualstudio.com/items?itemName=ShanidhyaKumar.codeinsight" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <span>View on VS Code Marketplace</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
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
