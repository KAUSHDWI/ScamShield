require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

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
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/analyze", analyzeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);

app.get("/", (req, res) => {
  res.send("ScamShield backend is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error:", err.message));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("analyzeText", async (text) => {
    try {
      let score = 0;
      const reasons = [];
      const t = text.toLowerCase();

      if (t.includes("urgent")) {
        score += 15;
        reasons.push("Uses urgent language");
      }

      if (t.includes("no interview")) {
        score += 20;
        reasons.push("No interview process");
      }

      if (t.includes("fee") || t.includes("deposit")) {
        score += 30;
        reasons.push("Asking for money");
      }

      if (t.includes("bank") || t.includes("account")) {
        score += 25;
        reasons.push("Requests bank details");
      }

      if (t.includes("guaranteed")) {
        score += 15;
        reasons.push("Promises guaranteed job");
      }

      let level = "Low";
      if (score > 60) level = "High";
      else if (score > 30) level = "Medium";

      const result = { score, level, reasons };

      socket.emit("analysisResult", result);
    } catch (error) {
      console.log("Socket analyze error:", error.message);
      socket.emit("analysisResult", {
        score: 0,
        level: "Low",
        reasons: ["Could not analyze text"],
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});