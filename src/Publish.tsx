import React, { useEffect, useState } from "react";
import { createhtml } from "./utils/vierw";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Publish({ mobref, lapref }: any) {
  const [html, setHtml] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    async function generate() {
      const result = await createhtml(mobref.current, lapref.current);
      setHtml(result);
    }
    generate();
  }, []);

  async function deploy() {
    setDeploying(true);
    setStatus("idle");

    try {
      const response = await axios.post("http://localhost:3000/publish", {
        html,
      });
      setUrl(response.data.url);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    } finally {
      setDeploying(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br 
    from-gray-50 via-white to-gray-100
    dark:from-[#0a0a0a] dark:via-[#111] dark:to-black
    text-gray-900 dark:text-white transition-all duration-300">

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b
        bg-gradient-to-r from-white/80 to-white/60
        dark:from-black/70 dark:to-black/50
        backdrop-blur-xl shadow-sm px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            SiteCraft 🚀
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Publish your site instantly
          </p>
        </div>

     
      </header>

      {/* MAIN */}
      <main className="flex-1 grid grid-cols-2 gap-4 p-4">

        {/* EDITOR */}
        <div className="rounded-xl overflow-hidden border
        bg-white/60 dark:bg-white/5
        backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-md">

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
        <div className="rounded-xl overflow-hidden border
        bg-white/60 dark:bg-white/5
        backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-md">

          <iframe
            srcDoc={html}
            className="w-full h-full bg-white dark:bg-black"
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t px-6 py-4 flex justify-between items-center
      bg-gradient-to-r from-white/80 to-white/60
      dark:from-black/70 dark:to-black/50
      backdrop-blur-xl">

        {/* STATUS */}
        <div className="text-sm">
          {deploying && <span className="text-blue-500">Deploying...</span>}
          {status === "success" && (
            <span className="text-green-500">✅ Success</span>
          )}
          {status === "error" && (
            <span className="text-red-500">❌ Failed</span>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={deploy}
          disabled={deploying}
          className="px-5 py-2 rounded-lg font-medium transition-all
          bg-blue-600 hover:bg-blue-700
          text-white shadow-md hover:shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
            
          {deploying ? "Deploying..." :url?
          
        (
          <a
            href={url}
            target="_blank"
            className="text-amber-50 hover:underline text-sm"
          >
            Open Site →
          </a>
        ):"deploy"
        
        }
        </button>
      </footer>
    </div>
  );
}

export default Publish;