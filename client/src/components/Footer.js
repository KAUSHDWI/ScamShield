export default function Footer() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#0b0b12] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-white">Scam</span>
            <span className="text-pink-500">Shield</span>
          </h2>
          <p className="text-gray-400 leading-7 text-sm">
            ScamShield helps job seekers identify suspicious job posts and
            recruiter messages before they become victims of fraud.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <button onClick={() => scrollToSection("analyze")} className="text-left hover:text-white transition">
              Analyze
            </button>
            <button onClick={() => scrollToSection("features")} className="text-left hover:text-white transition">
              Features
            </button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-left hover:text-white transition">
              How It Works
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <button onClick={() => scrollToSection("hero")} className="text-left hover:text-white transition">
              Home
            </button>
            <button onClick={() => scrollToSection("features")} className="text-left hover:text-white transition">
              Why ScamShield
            </button>
            <button onClick={() => scrollToSection("analyze")} className="text-left hover:text-white transition">
              Try It Free
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-gray-400 text-sm leading-7">
            Built as a safety-first platform for students, freshers, and job seekers.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-gray-500 text-sm py-5">
        © 2026 ScamShield. All rights reserved.
      </div>
    </footer>
  );
}