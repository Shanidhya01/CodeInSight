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
    <div className="w-full mx-auto bg-[#111827] rounded-2xl shadow-lg p-3">
      <input
        type="text"
        placeholder="Filename (e.g. app.py)"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        className="w-full mb-3 p-2 text-sm rounded-md bg-gray-900 text-gray-200 border border-gray-700"
      />

      <div className="border border-gray-700 w-full rounded-lg overflow-hidden">
        <Editor
          height="350px"
          theme="vs-dark"
          language="javascript"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
      >
        🚀 Review Code
      </button>
    </div>
  );
}
