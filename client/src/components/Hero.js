import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";

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
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "110px 18px 40px",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #06070d, #0b0b12, #10111a)",
      }}
    >
      <ParticleCanvas />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.12), transparent 30%), radial-gradient(circle at 80% 25%, rgba(59,130,246,0.12), transparent 28%), radial-gradient(circle at 50% 80%, rgba(236,72,153,0.08), transparent 30%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
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
        </motion.p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={handleScrollToAnalyze} style={primaryButton}>
            Analyze Now
          </button>

          <a href="#features" style={secondaryButton}>
            See How It Works
          </a>
        </div>

        <p
          style={{
            marginTop: "18px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Trusted by job seekers · Free to use · Instant analysis
        </p>
      </div>
    </section>
  );
}

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

const secondaryButton = {
  padding: "13px 24px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.18)",
  color: "white",
  fontWeight: "600",
  fontSize: "15px",
};