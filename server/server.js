require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const analyzeRoutes = require("./routes/analyze");
const authRoutes = require("./routes/auth");
const reportRoutes = require("./routes/report");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://scam-shield-nu.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ScamShield backend is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error:", err.message));

app.use("/api/analyze", analyzeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});