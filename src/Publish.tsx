import React, { useEffect, useState } from "react";
import { createhtml } from "./utils/vierw";
import Editor from "@monaco-editor/react";
import axios from "axios"
function Publish({ mobref, lapref }: any) {
  const [html, setHtml] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function generate() {
      const result = await createhtml(mobref.current, lapref.current);
      setHtml(result);
    }
    generate();
  }, []);

async function deploy() {
  try {
    const response = await axios.post("http://localhost:3000/publish", {
      html: html
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(response.data, "is response");
    setUrl(response.data.url); // set the deployed URL
  } catch (error: any) {
    console.error("Deployment failed:", error.response?.data || error.message);
  }
}
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-semibold">SiteCraft - Publish</h1>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium hover:underline"
          >
            Open Deployed Site →
          </a>
        )}
      </header>

      {/* Editor */}
      <main className="flex-1 p-6">
        <Editor
          height="70vh"
          defaultLanguage="html"
          theme="vs-dark"
          value={html}
          onChange={(value) => setHtml(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />
      </main>

      {/* Bottom Panel */}
      <footer className="flex justify-end items-center gap-4 px-6 py-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-inner">
        <button
          onClick={deploy}
          disabled={deploying}
          className={`px-5 py-2 rounded-lg font-medium transition-colors ${
            deploying
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {deploying ? "Deploying..." : "Deploy to Vercel"}
        </button>
      </footer>
    </div>
  );
}

export default Publish;