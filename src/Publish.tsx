import React, { useEffect, useState } from "react";
import { createhtml } from "./utils/vierw";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Publish({ mobref, lapref }: any) {
  const [html, setHtml] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [projectName, setProjectName] = useState("");

  /* ---------- GENERATE HTML ---------- */
  useEffect(() => {
    async function generate() {
      try {
        const result = await createhtml(mobref.current, lapref.current);
        setHtml(result);
      } catch (err) {
        console.error("HTML generation failed:", err);
      }
    }
    generate();
  }, [mobref, lapref]);

  /* ---------- DEPLOY ---------- */
  async function deploy() {
    if (!html) return;

    setDeploying(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:3000/publish", {
        html,
        nameofproject: projectName,
      });

      setUrl(response.data.url);
      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMsg(error?.response?.data || "Deployment failed");
    } finally {
      setDeploying(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br 
    from-gray-50 via-white to-gray-100
    dark:from-[#0a0a0a] dark:via-[#111] dark:to-black
    text-gray-900 dark:text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b px-6 py-4 flex justify-between items-center
      bg-white/70 dark:bg-black/60 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-semibold">SiteCraft 🚀</h1>
          <p className="text-xs text-gray-500">Publish instantly</p>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 grid grid-cols-2 gap-4 p-4">

        {/* EDITOR */}
        <div className="rounded-xl overflow-hidden border shadow-md">
          <Editor
            height="100%"
            defaultLanguage="html"
            theme="vs-dark"
            value={html}
            onChange={(value) => setHtml(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
        </div>

        {/* PREVIEW */}
        <div className="rounded-xl overflow-hidden border shadow-md">
          <iframe
            srcDoc={html}
            className="w-full h-full bg-white"
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t px-6 py-4 flex justify-between items-center
      bg-white/70 dark:bg-black/60 backdrop-blur-xl">

        {/* LEFT: INPUT + STATUS */}
        <div className="flex flex-col gap-2 text-sm">

          <input
            type="text"
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="px-3 py-1 rounded-md border text-black"
          />

          {deploying && <span className="text-blue-500">Deploying...</span>}
          {status === "success" && (
            <span className="text-green-500">✅ Success</span>
          )}
          {status === "error" && (
            <span className="text-red-500">❌ {errorMsg}</span>
          )}
        </div>

        {/* RIGHT: BUTTON / LINK */}
        <div>
          {!url ? (
            <button
              onClick={deploy}
              disabled={deploying}
              className="px-5 py-2 rounded-lg font-medium
              bg-blue-600 hover:bg-blue-700 text-white
              disabled:opacity-50"
            >
              {deploying ? "Deploying..." : "Deploy"}
            </button>
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg font-medium
              bg-green-600 hover:bg-green-700 text-white inline-block"
            >
              Open Site →
            </a>
          )}
        </div>

      </footer>
    </div>
  );
}

export default Publish;