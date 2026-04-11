import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Analyze from "./components/Analyze";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }
      
      const response = await fetch("http://localhost:5001/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to analyze text");
      }

      setResult(data);
    } catch (err) {
      console.error("Analyze Error:", err);
      setError(err.message || "Analyze failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <div style={{ background: "#0b0b12", color: "white", minHeight: "100vh" }}>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Analyze
                  inputText={inputText}
                  setInputText={setInputText}
                  onAnalyze={handleAnalyze}
                  loading={loading}
                  error={error}
                  result={result}
                />
                <Features />
                <Footer />
              </>
            }
          />

          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />

          <Route
            path="/signup"
            element={<Signup />}
            
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}