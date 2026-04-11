const Report = require("../models/Report");

const createReport = async (req, res) => {
  try {
    const { text } = req.body;

    const report = await Report.create({
      user: req.user.id,
      text,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error creating report" });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};

module.exports = { createReport, getReports };