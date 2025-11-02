import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ onSubmit }) {
  const [filename, setFilename] = useState("index.js");
  const [code, setCode] = useState("// Start coding here...");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return alert("Please enter some code!");
    onSubmit(filename, code);
  };

  return (
    <div className="w-full mx-auto bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-sm p-6">
      {/* Header with filename input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          📄 Filename
        </label>
        <input
          type="text"
          placeholder="e.g. app.py, main.js, index.html"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="w-full p-3 text-sm rounded-xl bg-gray-800/80 text-gray-100 border border-gray-600/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-gray-500 backdrop-blur-sm"
        />
      </div>

      {/* Code editor container */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ⚡ Code Editor
        </label>
        <div className="border border-gray-600/50 w-full rounded-xl overflow-hidden shadow-inner bg-[#1e1e1e] relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center px-4 border-b border-gray-600/30">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-xs text-gray-400">{filename}</span>
          </div>
          <div className="pt-8">
            <Editor
              height="380px"
              theme="vs-dark"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                renderWhitespace: "selection",
                wordWrap: "on",
                fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
                fontLigatures: true,
              }}
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>🚀</span>
            <span>Review Code</span>
          </span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
}
