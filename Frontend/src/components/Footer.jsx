export default function Footer() {
  return (
    <footer className="relative bg-linear-to-r from-gray-900 via-slate-800 to-gray-900 text-gray-300 text-sm text-center py-6 border-t border-gray-700/50 backdrop-blur-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <p className="flex items-center justify-center space-x-2 text-gray-400">
          <span>© {new Date().getFullYear()}</span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 font-semibold">
            CodeInsight
          </span>
          <span>—</span>
          <span className="flex items-center space-x-1">
            <span>Built with</span>
            <span className="text-red-400 animate-pulse">💙</span>
            <span>by</span>
            <a 
              href="https://github.com/Shanidhya01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-300 font-medium hover:text-indigo-200 transition-colors cursor-pointer hover:underline"
            >
              Shanidhya Kumar
            </a>
          </span>
        </p>
        
        {/* Decorative dots */}
        <div className="flex justify-center space-x-2 mt-3">
          <div className="w-1 h-1 rounded-full bg-indigo-500/50"></div>
          <div className="w-1 h-1 rounded-full bg-purple-500/50"></div>
          <div className="w-1 h-1 rounded-full bg-blue-500/50"></div>
        </div>
      </div>
    </footer>
  );
}
