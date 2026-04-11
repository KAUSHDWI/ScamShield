import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Analyze from "../components/Analyze";
import Result from "../components/Result";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { analyzeJobPosting } from "../services/api";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  async function handleAnalyze() {
    if (inputText.trim().length < 10) return;
    setLoading(true);
    setError(null);
    setShowResult(false);

    try {
      const data = await analyzeJobPosting(inputText);
      setResult(data);
      setShowResult(true);
      setTimeout(() => {
        document.getElementById("result-anchor")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: "#080810" }}>
      <div className="noise" />
      <Navbar />
      <Hero />
      <Analyze
        inputText={inputText}
        setInputText={setInputText}
        onAnalyze={handleAnalyze}
        loading={loading}
        error={error}
      />
      <div id="result-anchor" />
      <Result result={result} visible={showResult} />
      <Features />
      <Footer />
    </div>
  );
}