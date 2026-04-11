import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setCurrentUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setCurrentUser(data.user);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "120px 20px 40px",
        background: "linear-gradient(to bottom, #06070d, #0b0b12, #10111a)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "36px",
          borderRadius: "28px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 35px rgba(59,130,246,0.12)",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Welcome back
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: "24px" }}>
          Login to continue protecting your job search.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          {error && (
            <p style={{ color: "#f87171", marginBottom: "16px" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(90deg, #3b82f6, #d946ef)",
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#cbd5e1", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#ec4899", textDecoration: "none" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

function Input({ label, type = "text", ...props }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#e2e8f0",
          fontSize: "14px",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        {...props}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "#11131c",
          color: "white",
          outline: "none",
          fontSize: "15px",
        }}
      />
    </div>
  );
}