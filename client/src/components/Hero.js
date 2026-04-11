import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
  const handleScrollToAnalyze = () => {
    const section = document.getElementById("analyze");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      const textarea = document.querySelector("textarea");
      if (textarea) textarea.focus();
    }, 500);
  };

  return (
    <section
      className="relative"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "100px 16px 40px",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #06070d, #0b0b12, #10111a)",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <ParticleCanvas />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.14), transparent 30%), radial-gradient(circle at 80% 25%, rgba(59,130,246,0.12), transparent 28%), radial-gradient(circle at 50% 80%, rgba(236,72,153,0.08), transparent 30%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(32px, 9vw, 72px)",
            fontWeight: "800",
            lineHeight: "1.1",
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            maxWidth: "700px",
            color: "#cbd5e1",
            fontSize: "clamp(15px, 4vw, 20px)",
            lineHeight: "1.7",
            marginBottom: "26px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Paste any job posting or recruiter message. Our system analyzes it in seconds
          and flags deceptive patterns before you become a victim.
        </motion.p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleScrollToAnalyze}
            style={{
              padding: "12px 22px",
              borderRadius: "999px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Analyze Now
          </button>

          <a
            href="#features"
            style={{
              padding: "12px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            See How It Works
          </a>
        </div>

        <p
          style={{
            marginTop: "18px",
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
          Trusted by job seekers · Free to use · Instant analysis
        </p>
      </div>
    </section>
  );
}