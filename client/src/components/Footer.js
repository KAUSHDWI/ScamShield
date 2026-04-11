export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        padding: "50px 20px 30px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#070b16",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: "420px" }}>
          <h3 style={{ marginBottom: "12px", fontSize: "20px" }}>ScamShield</h3>
          <p style={{ color: "#cbd5e1", lineHeight: "1.7", fontSize: "15px" }}>
            A simple platform to help users identify suspicious job messages,
            review scam patterns, and stay safer while applying for opportunities.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "16px" }}>Quick Links</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "#cbd5e1",
              fontSize: "15px",
            }}
          >
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
            <a href="/dashboard">Dashboard</a>
          </div>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        © 2026 ScamShield. Built for safer job searching.
      </p>
    </footer>
  );
}