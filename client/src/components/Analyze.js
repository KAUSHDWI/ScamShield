import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { glassCard } from "../styles/glass";

const socket = io("http://localhost:5001");

export default function Analyze() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    socket.on("analysisResult", (data) => {
      setResult(data);
      setLoading(false);
      setReported(false);
    });

    return () => socket.off("analysisResult");
  }, []);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setResult(null);
    setReported(false);

    socket.emit("analyzeText", inputText);
  };

  const handleReport = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await fetch("http://localhost:5001/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: inputText }),
      });

      setReported(true);
    } catch (error) {
      console.log("Report failed", error);
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
    <section id="analyze" style={{ padding: "100px 20px", textAlign: "center" }}>
      <h2>Analyze Job Message</h2>

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
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div
          style={{
            ...glassCard,
            marginTop: "30px",
            maxWidth: "600px",
            marginInline: "auto",
            border: `1px solid ${getColor()}40`,
          }}
        >
          <h3 style={{ color: getColor() }}>Risk: {result.level}</h3>

          <p>Score: {result.score}</p>

          <p dangerouslySetInnerHTML={{ __html: highlightedText }} />

          <ul>
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