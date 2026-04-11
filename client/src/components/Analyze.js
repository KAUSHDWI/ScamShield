import { useState, useMemo } from "react";
import { glassCard } from "../styles/glass";

const BASE_URL = "https://scamshield-yifc.onrender.com";

export default function Analyze() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reported, setReported] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setResult(null);
    setReported(false);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Analyze failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await fetch(`${BASE_URL}/api/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Report failed");
      }

      setReported(true);
    } catch (err) {
      console.log("Report failed", err);
    }
  };

  const getColor = () => {
    if (!result) return "#888";
    if (result.level === "High") return "#ef4444";
    if (result.level === "Medium") return "#f59e0b";
    return "#22c55e";
  };

  const highlightedText = useMemo(() => {
    if (!result) return inputText;

    let text = inputText;

    result.reasons.forEach((reason) => {
      const word = reason.split(" ")[0];
      const regex = new RegExp(`(${word})`, "gi");

      text = text.replace(
        regex,
        `<span style="color:#ef4444;font-weight:600;">$1</span>`
      );
    });

    return text;
  }, [result, inputText]);

  return (
    <section
      id="analyze"
      style={{
        padding: "80px 16px",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ fontSize: "clamp(26px, 7vw, 36px)", marginBottom: "16px" }}>
        Analyze Job Message
      </h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste job message..."
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "140px",
          padding: "12px",
          borderRadius: "8px",
          background: "#111827",
          color: "white",
          border: "1px solid #1f2937",
          boxSizing: "border-box",
          fontSize: "15px",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleAnalyze}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && (
        <p style={{ color: "#ef4444", marginTop: "12px" }}>{error}</p>
      )}

      {result && (
        <div
          style={{
            ...glassCard,
            marginTop: "24px",
            maxWidth: "600px",
            marginInline: "auto",
            border: `1px solid ${getColor()}40`,
            boxSizing: "border-box",
            textAlign: "left",
          }}
        >
          <h3 style={{ color: getColor(), marginTop: 0 }}>Risk: {result.level}</h3>

          <p style={{ marginBottom: "10px" }}>Score: {result.score}</p>

          <p
            style={{ lineHeight: "1.6", wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />

          <ul style={{ paddingLeft: "18px", lineHeight: "1.6" }}>
            {result.reasons.map((reason, index) => (
              <li key={index}>⚠ {reason}</li>
            ))}
          </ul>

          {!reported ? (
            <button
              onClick={handleReport}
              style={{
                marginTop: "14px",
                padding: "8px 16px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Report Scam
            </button>
          ) : (
            <p style={{ color: "#22c55e", marginTop: "14px" }}>✓ Reported</p>
          )}
        </div>
      )}
    </section>
  );
}