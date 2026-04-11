import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #06070d, #0b0b12, #10111a)",
        color: "white",
      }}
    >
      <ParticleCanvas />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.14), transparent 30%), radial-gradient(circle at 80% 25%, rgba(59,130,246,0.12), transparent 28%), radial-gradient(circle at 50% 80%, rgba(236,72,153,0.08), transparent 30%)",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(42px, 8vw, 86px)",
            fontWeight: "800",
            lineHeight: "1.05",
            marginBottom: "20px",
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
            fontSize: "20px",
            lineHeight: "1.7",
            marginBottom: "30px",
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
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#analyze"
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #d946ef, #ec4899)",
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Analyze Now
          </a>

          <a
            href="#features"
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            See How It Works
          </a>
        </div>

        <p
          style={{
            marginTop: "22px",
            color: "#94a3b8",
            fontSize: "15px",
          }}
        >
          Trusted by job seekers · Free to use · Instant analysis
        </p>
      </div>
    </section>
  );
}