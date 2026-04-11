import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "⚡",
    title: "Real-Time Analysis",
    description:
      "Get instant results in under 2 seconds. Our engine processes your text the moment you hit analyze.",
    accentColor: "#f59e0b",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Your data is never stored or logged. All analysis runs in-session and is discarded immediately after.",
    accentColor: "#22c55e",
  },
  {
    icon: "🧠",
    title: "Smart Detection",
    description:
      "Matches against 15+ scam pattern categories including financial traps, urgency tactics, and identity harvesting.",
    accentColor: "#a855f7",
  },
  {
    icon: "📊",
    title: "Risk Breakdown",
    description:
      "Not just a verdict — understand exactly which phrases triggered each warning flag.",
    accentColor: "#3b82f6",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 px-10 pb-28">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#a855f7" }}
          >
            Why ScamShield
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-syne font-extrabold tracking-tighter mt-3"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            Built to Protect You
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl p-8 cursor-default transition-shadow duration-300"
              style={{
                background: "#13131f",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-2xl"
                style={{
                  background: `${feature.accentColor}18`,
                  border: `1px solid ${feature.accentColor}33`,
                }}
              >
                {feature.icon}
              </div>

              <h3 className="font-syne font-bold text-lg tracking-tight mb-3">
                {feature.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8b8aa8" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}