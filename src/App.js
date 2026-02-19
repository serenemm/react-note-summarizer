import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #95a8d6;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #95a8d6 0%, #7b91c9 40%, #a8bae0 100%);
    padding: 40px 20px;
    position: relative;
    overflow: hidden;
  }

  .app::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(149, 168, 214, 0.3) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 860px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 36px;
    animation: slideDown 0.6s ease-out;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .emoji-badge {
    font-size: 52px;
    display: block;
    margin-bottom: 12px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
  }

  .header h1 {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 800;
    color: #ffffff;
    text-shadow: 0 2px 12px rgba(0,0,0,0.2);
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  .header p {
    margin-top: 10px;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.85);
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  .card {
    background: #ffffff;
    border-radius: 24px;
    padding: 36px;
    box-shadow: 0 20px 60px rgba(60, 80, 140, 0.25), 0 4px 16px rgba(0,0,0,0.08);
    animation: fadeUp 0.6s ease-out 0.2s both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .section-label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #95a8d6;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    min-height: 220px;
    border: 2px solid #e2e8f5;
    border-radius: 14px;
    padding: 16px 18px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    line-height: 1.7;
    color: #2d3a5c;
    resize: vertical;
    transition: border-color 0.25s, box-shadow 0.25s;
    background: #f8faff;
    outline: none;
  }

  textarea::placeholder {
    color: #b0bcd8;
    font-style: italic;
  }

  textarea:focus {
    border-color: #95a8d6;
    box-shadow: 0 0 0 4px rgba(149,168,214,0.18);
    background: #fff;
  }

  .char-count {
    text-align: right;
    font-size: 0.75rem;
    color: #b0bcd8;
    margin-top: 6px;
  }

  .btn-row {
    margin-top: 22px;
    display: flex;
    justify-content: center;
  }

  .btn-summarize {
    background: linear-gradient(135deg, #95a8d6 0%, #7b91c9 100%);
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 15px 44px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 6px 24px rgba(123,145,201,0.45);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn-summarize:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(123,145,201,0.55);
  }

  .btn-summarize:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn-summarize:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .divider {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, transparent, #e2e8f5, transparent);
    margin: 32px 0;
  }

  .summary-section {
    animation: fadeUp 0.5s ease-out both;
  }

  .summary-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .summary-title {
    font-size: 1rem;
    font-weight: 700;
    color: #2d3a5c;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-copy {
    background: #f0f4ff;
    border: 1.5px solid #c5d0eb;
    border-radius: 8px;
    padding: 6px 14px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: #5a6fa0;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .btn-copy:hover { background: #95a8d6; color: #fff; border-color: #95a8d6; }

  .summary-content {
    background: #f8faff;
    border: 1.5px solid #e2e8f5;
    border-radius: 14px;
    padding: 24px 26px;
    color: #2d3a5c;
    font-size: 0.9rem;
    line-height: 1.8;
  }

  .summary-content h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #5a6fa0;
    margin: 20px 0 8px;
    padding-bottom: 6px;
    border-bottom: 2px solid #e2e8f5;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .summary-content h2:first-child { margin-top: 0; }

  .summary-content h3 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #3d4f7a;
    margin: 14px 0 6px;
  }

  .summary-content ul {
    padding-left: 20px;
    margin: 6px 0 10px;
  }

  .summary-content li {
    margin-bottom: 5px;
    padding-left: 4px;
  }

  .summary-content li::marker {
    color: #95a8d6;
    font-size: 1.1em;
  }

  .summary-content strong {
    color: #2d3a5c;
    font-weight: 600;
  }

  .summary-content em {
    color: #7b91c9;
  }

  .summary-content p { margin-bottom: 8px; }

  .summary-content .tag {
    display: inline-block;
    background: #e8edf8;
    color: #5a6fa0;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.78rem;
    font-weight: 600;
    margin: 2px 3px;
  }

  .error-box {
    background: #fff0f0;
    border: 1.5px solid #ffc5c5;
    border-radius: 12px;
    padding: 16px 20px;
    color: #c0392b;
    font-size: 0.88rem;
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .copied-toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #2d3a5c;
    color: #fff;
    padding: 10px 22px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: none;
    z-index: 100;
  }

  .copied-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

function parseSummary(text) {
  const lines = text.split("\n");
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++}>{line.slice(3)}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h2 key={key++}>{line.slice(2)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++}>{line.slice(4)}</h3>);
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      const items = [];
      let j = i;
      while (j < lines.length && (lines[j].trim().startsWith("- ") || lines[j].trim().startsWith("• "))) {
        items.push(<li key={j}>{lines[j].trim().slice(2)}</li>);
        j++;
      }
      elements.push(<ul key={key++}>{items}</ul>);
      i = j - 1;
    } else if (/^\d+\.\s/.test(line)) {
      const items = [];
      let j = i;
      while (j < lines.length && /^\d+\.\s/.test(lines[j].trim())) {
        items.push(<li key={j}>{lines[j].trim().replace(/^\d+\.\s/, "")}</li>);
        j++;
      }
      elements.push(<ol key={key++} style={{ paddingLeft: 20, margin: "6px 0 10px" }}>{items}</ol>);
      i = j - 1;
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<h3 key={key++}>{line.slice(2, -2)}</h3>);
    } else {
      elements.push(<p key={key++}>{line}</p>);
    }
  }

  return elements;
}

export default function App() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an expert student note summarizer. Convert raw lecture notes or transcripts into a beautifully structured summary. 
Format your response using these markdown conventions:
- Use ## for main topic sections (e.g., ## 📌 Key Concepts)
- Use ### for sub-topics
- Use bullet points (- ) for lists
- Use numbered lists for steps or sequences
- Bold important terms with **term**
- Keep language clear, concise, and student-friendly

Always include these sections when relevant:
## 📌 Key Concepts
## 📝 Main Points
## 💡 Important Details
## 🔑 Key Takeaways

Make it easy to review and study from. Be thorough but concise.`,
          messages: [
            {
              role: "user",
              content: `Please summarize these lecture notes into a structured, easy-to-study format:\n\n${notes}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((c) => c.text || "").join("\n") || "";
      setSummary(text);
    } catch (err) {
      setError("May error na nangyari. Please try again. (" + err.message + ")");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="container">
          <div className="header">
            <span className="emoji-badge">📚</span>
            <h1>Summarize mo ang notes mo dito!</h1>
            <p>I-paste ang iyong raw notes o lecture transcript, tapos i-click ang button para makuha ang structured summary.</p>
          </div>

          <div className="card">
            <div className="section-label">Iyong mga Notes / Transcript</div>
            <textarea
              placeholder="I-paste dito ang iyong lecture notes, transcript, o raw text... Pwede ring mahabang notes, okay lang!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="char-count">{notes.length.toLocaleString()} characters</div>

            <div className="btn-row">
              <button
                className="btn-summarize"
                onClick={handleSummarize}
                disabled={loading || !notes.trim()}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Ginagawa ang summary...
                  </>
                ) : (
                  <>
                    ✨ I-summarize!
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="error-box">
                ⚠️ {error}
              </div>
            )}

            {summary && (
              <>
                <hr className="divider" />
                <div className="summary-section">
                  <div className="summary-header">
                    <div className="summary-title">
                      📋 Ang iyong Summary
                    </div>
                    <button className="btn-copy" onClick={handleCopy}>
                      📄 I-copy
                    </button>
                  </div>
                  <div className="summary-content">
                    {parseSummary(summary)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`copied-toast ${copied ? "show" : ""}`}>
        ✅ Nakopya na ang summary!
      </div>
    </>
  );
}
