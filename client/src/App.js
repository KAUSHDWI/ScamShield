import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const BASE_URL = "https://scamshield-yifc.onrender.com";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "14px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(5, 8, 22, 0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "18px",
          fontWeight: "800",
          color: "white",
          textDecoration: "none",
        }}
      >
        ScamShield
      </Link>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>

        {!currentUser ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={signupStyle}>Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={buttonGhost}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reported, setReported] = useState(false);

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
      alert("Report failed");
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

  const scrollToAnalyze = () => {
    const section = document.getElementById("analyze");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: "#050816", color: "white", minHeight: "100vh" }}>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "110px 18px 40px",
          background: "linear-gradient(to bottom, #06070d, #0b0b12, #10111a)",
        }}
      >
        <div style={{ maxWidth: "900px", width: "100%" }}>
          <h1
            style={{
              fontSize: "clamp(38px, 9vw, 78px)",
              fontWeight: "800",
              lineHeight: "1.08",
              marginBottom: "18px",
            }}
          >
            Detect Job Scams
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #d946ef, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Instantly.
            </span>
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto 28px",
              color: "#cbd5e1",
              fontSize: "clamp(16px, 3.8vw, 22px)",
              lineHeight: "1.7",
            }}
          >
            Paste any job posting or recruiter message. Our system analyzes it in seconds
            and flags deceptive patterns before you become a victim.
          </p>

          <button onClick={scrollToAnalyze} style={primaryButton}>
            Analyze Now
          </button>
        </div>
      </section>

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

        <button onClick={handleAnalyze} style={primaryButton}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {error && <p style={{ color: "#ef4444", marginTop: "12px" }}>{error}</p>}

        {result && (
          <div
            style={{
              marginTop: "24px",
              maxWidth: "600px",
              marginInline: "auto",
              border: `1px solid ${getColor()}40`,
              borderRadius: "16px",
              padding: "20px",
              background: "rgba(17, 24, 39, 0.72)",
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
              <button onClick={handleReport} style={dangerButton}>
                Report Scam
              </button>
            ) : (
              <p style={{ color: "#22c55e", marginTop: "14px" }}>✓ Reported</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setCurrentUser(data);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to fetch");
    }
  };

  return (
    <PageCard title="Login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {error && <p style={{ color: "#ef4444", marginBottom: "12px" }}>{error}</p>}

        <button type="submit" style={fullButton}>
          Login
        </button>
      </form>
    </PageCard>
  );
}

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message || "Failed to fetch");
    }
  };

  return (
    <PageCard title="Sign Up">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {error && <p style={{ color: "#ef4444", marginBottom: "12px" }}>{error}</p>}

        <button type="submit" style={fullButton}>
          Sign Up
        </button>
      </form>
    </PageCard>
  );
}

function PageCard({ title, children }) {
  return (
    <div style={{ minHeight: "100vh", padding: "120px 16px", color: "white" }}>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          background: "#111827",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #1f2937",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

const linkStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#e5e7eb",
  textDecoration: "none",
};

const signupStyle = {
  padding: "10px 18px",
  borderRadius: "999px",
  background: "#3867f4",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  textDecoration: "none",
};

const buttonGhost = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: "13px",
};

const primaryButton = {
  padding: "13px 24px",
  borderRadius: "999px",
  background: "#3867f4",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};

const dangerButton = {
  marginTop: "14px",
  padding: "8px 16px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #374151",
  background: "#0f172a",
  color: "white",
  boxSizing: "border-box",
};

const fullButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050816", color: "white" }}>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}