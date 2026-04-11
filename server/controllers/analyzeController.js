const Scan = require("../models/Scan");

const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "No text provided" });
    }

    let score = 0;
    let reasons = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes("money") || lowerText.includes("payment")) {
      score += 40;
      reasons.push("Asking for money");
    }

    if (lowerText.includes("urgent") || lowerText.includes("immediately")) {
      score += 20;
      reasons.push("Creates urgency");
    }

    if (lowerText.includes("click") || lowerText.includes("link")) {
      score += 20;
      reasons.push("Suspicious link or click request");
    }

    if (lowerText.includes("job offer") && lowerText.includes("no interview")) {
      score += 30;
      reasons.push("Fake job offer pattern");
    }

    let level = "Low";

    if (score >= 60) {
      level = "High";
    } else if (score >= 30) {
      level = "Medium";
    }

    const result = {
      score,
      level,
      reasons,
    };

    if (req.user && req.user.id) {
      await Scan.create({
        user: req.user.id,
        text,
        score,
        level,
        reasons,
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({ message: "Error analyzing text" });
  }
};

const getScans = async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    console.error("Get scans error:", error);
    res.status(500).json({ message: "Error fetching scans" });
  }
};

module.exports = { analyzeText, getScans };