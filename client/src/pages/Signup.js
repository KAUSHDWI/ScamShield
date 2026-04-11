import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://scamshield-ylfc.onrender.com";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

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

      setSuccess("Signup successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px 16px 60px",
        background:
          "linear-gradient(to bottom, #06070d 0%, #0b0b12 45%, #10111a 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "430px",
          margin: "0 auto",
          background: "rgba(17, 24, 39, 0.82)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "28px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "30px",
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "24px",
            lineHeight: "1.6",
          }}
        >
          Sign up to start checking job messages and keeping track of results.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {error && (
            <p style={{ color: "#ef4444", marginBottom: "14px", fontSize: "14px" }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#22c55e", marginBottom: "14px", fontSize: "14px" }}>
              {success}
            </p>
          )}

          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#cbd5e1",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#60a5fa" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px 14px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#0f172a",
  color: "white",
  boxSizing: "border-box",
  fontSize: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "13px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};