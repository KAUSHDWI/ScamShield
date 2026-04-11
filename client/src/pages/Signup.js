import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://scamshield-yifc.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/login");
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
          boxShadow: "0 0 35px rgba(217,70,239,0.12)",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Create your account
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: "24px" }}>
          Join ScamShield and keep your job search safer.
        </p>

        <form onSubmit={handleSignup}>
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

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
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
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
              background: "linear-gradient(90deg, #d946ef, #ec4899)",
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#cbd5e1", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ec4899", textDecoration: "none" }}>
            Login
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