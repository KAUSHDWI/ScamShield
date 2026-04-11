export default function Hero() {
  const handleScrollToAnalyze = () => {
    const section = document.getElementById("analyze");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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

        <button
          onClick={handleScrollToAnalyze}
          style={{
            padding: "13px 24px",
            borderRadius: "999px",
            background: "#3867f4",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          Analyze Now
        </button>
      </div>
    </section>
  );
}