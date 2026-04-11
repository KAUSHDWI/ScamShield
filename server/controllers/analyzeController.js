const OpenAI = require("openai");
const Scan = require("../models/Scan");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    let result;

    try {
      // 🔹 Try AI (if available)
      const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: `Analyze this job message and return JSON:
        { "score": number, "level": "High|Medium|Low", "reasons": [] }
        
        Text: ${text}`,
      });

      const output = response.output_text.trim();
      result = JSON.parse(output);
    } catch (aiError) {
      console.log("AI failed → using fallback");

      // 🔹 FREE fallback logic (works always)
      let score = 0;
      const reasons = [];

      const textLower = text.toLowerCase();

      if (textLower.includes("urgent")) {
        score += 15;
        reasons.push("Uses urgent language");
      }

      if (textLower.includes("no interview")) {
        score += 20;
        reasons.push("No interview process");
      }

      if (textLower.includes("fee") || textLower.includes("deposit")) {
        score += 30;
        reasons.push("Asking for money");
      }

      if (textLower.includes("bank") || textLower.includes("account")) {
        score += 25;
        reasons.push("Requests bank details");
      }

      if (textLower.includes("guaranteed")) {
        score += 15;
        reasons.push("Promises guaranteed job");
      }

      let level = "Low";
      if (score > 60) level = "High";
      else if (score > 30) level = "Medium";

      result = { score, level, reasons };
    }

    // 🔹 Save to database
    if (req.user && req.user.id) {
      await Scan.create({
        user: req.user.id,
        text,
        score: result.score,
        level: result.level,
        reasons: result.reasons,
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error analyzing text" });
  }
};

const getScans = async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scans" });
  }
};

module.exports = { analyzeText, getScans };