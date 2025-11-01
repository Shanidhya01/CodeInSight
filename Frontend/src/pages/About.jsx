export default function About() {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-300 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-indigo-400 mb-4">💡 About CodeInsight</h1>
      <p className="max-w-3xl leading-relaxed mb-6">
        <span className="text-indigo-300 font-semibold">CodeInsight</span> is an AI-powered
        Code Reviewer that helps developers write cleaner, more efficient, and bug-free code.
        It analyzes your source code using state-of-the-art AI models and provides instant
        feedback with explanations and best practices.
      </p>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 w-full max-w-3xl text-left">
        <h2 className="text-2xl text-indigo-400 font-semibold mb-2">🚀 Features</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>AI-based code review powered by OpenRouter API</li>
          <li>Instant syntax analysis and improvement suggestions</li>
          <li>Secure code storage via MongoDB</li>
          <li>VS Code–style editor (Monaco)</li>
          <li>Review history with search and delete support</li>
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Built by <span className="text-indigo-400 font-semibold">Shanidhya Kumar</span> — 2025 ✨
        </p>
      </div>
    </div>
  );
}
