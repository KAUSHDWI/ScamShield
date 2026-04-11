export default function HowItWorks() {
  const steps = [
    {
      title: "Paste the text",
      desc: "Copy any job post, recruiter message, or suspicious offer into the analyzer."
    },
    {
      title: "Analyze instantly",
      desc: "ScamShield checks for risky phrases like money requests, pressure tactics, and fake promises."
    },
    {
      title: "Review the result",
      desc: "See the risk score, warning level, and reasons behind the decision."
    }
  ];

  return (
    <section id="how-it-works" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-fuchsia-400 uppercase text-sm tracking-widest mb-3">
          How It Works
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
          Simple, Fast, Useful
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-3xl p-8 bg-[#13131f] border border-white/10 hover:border-fuchsia-500/40 transition"
            >
              <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center font-bold mb-5">
                {index + 1}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-7">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}