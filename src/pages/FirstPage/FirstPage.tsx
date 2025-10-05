import { useState } from "react";

export default function FirstPage() {
  const [input, setInput] = useState("");
  const [ans, setAns] = useState("");

  const callGemini = async () => {
    console.log("[UI] click, prompt=", input);
    try {
      const res = await fetch("http://localhost:3000/api/gemini", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: input || "hello" }),
      });
      console.log("[UI] status", res.status);
      const data = await res.json().catch(() => ({}));
      console.log("[UI] body", data);
      setAns(data.text ?? `HTTP ${res.status}`);
    } catch (e: any) {
      console.error("[UI] fetch error", e);
      setAns("Error: " + e.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Ask Gemini</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={callGemini}>送信</button>
      <pre>{ans}</pre>
    </div>
  );
}
