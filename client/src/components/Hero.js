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
        padding: "110px 20px 60px",
        background:
          "linear-gradient(to bottom, #06070d 0%, #0b0b12 45%, #10111a 100%)",
      }}
    >
      <div style={{ maxWidth: "950px", width: "100%" }}>
        <h1
          style={{
            fontSize: "clamp(42px, 8vw, 82px)",
            fontWeight: "800",
            lineHeight: "1.08",
            marginBottom: "20px",
            letterSpacing: "-1px",
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
            margin: "0 auto 32px",
            color: "#cbd5e1",
            fontSize: "clamp(16px, 3vw, 21px)",
            lineHeight: "1.8",
          }}
        >
          Paste any job posting or recruiter message and quickly check whether it
          looks suspicious. ScamShield helps you spot risky patterns before you
          take the next step.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleScrollToAnalyze}
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #d946ef, #ec4899)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Analyze Now
          </button>

          <a
            href="#footer"
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "white",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Learn More
          </a>
        </div>

        <p
          style={{
            marginTop: "22px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Free to use · Quick results · Built for job seekers
        </p>
      </div>
    </section>
  );
}