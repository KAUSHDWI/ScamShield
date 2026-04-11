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

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analyze", analyzeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/scamshield")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

// 🔥 Create server for socket
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// 🔥 SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("analyzeText", async (text) => {
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
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});