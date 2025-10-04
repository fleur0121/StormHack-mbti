import { useState } from "react";
import { callGemini } from "../../utils/callGemini";
import "./FirstPage.css";

export default function FirstPage() {
  const [prompt, setPrompt] = useState("Explain about MBTI in a few sentences.");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onAsk = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      setLoading(true);
      setErr(null);
      setOut("");
      const text = await callGemini(prompt);
      setOut(text);
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-wrap">
        <header className="fp-hero">
          <h1 className="fp-title">MBTI Helper</h1>
          <p className="fp-sub">
            Ask Gemini!
          </p>
        </header>

        <form className="fp-card fp-query" onSubmit={onAsk}>
          <label className="fp-label" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            id="prompt"
            className="fp-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Your question for Gemini"
          />
          <div className="fp-actions">
            <button
              type="submit"
              className="fp-button"
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <span className="fp-row">
                  <span className="fp-spinner" aria-hidden />
                  Loading…
                </span>
              ) : (
                "Ask Gemini"
              )}
            </button>
            <button
              type="button"
              className="fp-button fp-ghost"
              onClick={() => setOut("")}
              disabled={loading}
              title="Clear the output"
            >
              Clear
            </button>
          </div>
        </form>

        <section className="fp-card fp-output" aria-live="polite">
          <div className="fp-output-head">
            <h2 className="fp-sec-title">Response</h2>
            {loading && <span className="fp-dot" aria-hidden />}
          </div>

          {err && <div className="fp-error">⚠ {err}</div>}

          {!err && !out && !loading && (
            <div className="fp-empty">No Response</div>
          )}

          {loading && (
            <div className="fp-skeleton">
              <div className="fp-skel-line" />
              <div className="fp-skel-line" />
              <div className="fp-skel-line short" />
            </div>
          )}

          {!!out && !loading && (
            <pre className="fp-pre">{out}</pre>
          )}
        </section>
      </div>
    </div>
  );
}
