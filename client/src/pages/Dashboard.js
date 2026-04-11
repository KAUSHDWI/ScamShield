import { useEffect, useState } from "react";
import { glassCard } from "../styles/glass";

export default function Dashboard() {
  const [scans, setScans] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://scamshield-yifc.onrender.com/api/analyze", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setScans(data);
  };

  const total = scans.length;
  const high = scans.filter((s) => s.level === "High").length;
  const medium = scans.filter((s) => s.level === "Medium").length;
  const low = scans.filter((s) => s.level === "Low").length;

  const filteredScans = scans.filter((scan) => {
    const matchText = scan.text.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || scan.level === filter;
    return matchText && matchFilter;
  });

  const getColor = (level) => {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div style={{ padding: "90px 16px 30px", color: "white", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(28px, 7vw, 36px)" }}>Your Dashboard</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <div style={glassCard}>
            <h3>Total</h3>
            <p>{total}</p>
          </div>

          <div style={{ ...glassCard, border: "1px solid #ef444440" }}>
            <h3>High</h3>
            <p>{high}</p>
          </div>

          <div style={{ ...glassCard, border: "1px solid #f59e0b40" }}>
            <h3>Medium</h3>
            <p>{medium}</p>
          </div>

          <div style={{ ...glassCard, border: "1px solid #22c55e40" }}>
            <h3>Low</h3>
            <p>{low}</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search scans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #1f2937",
            background: "#111827",
            color: "white",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            marginTop: "14px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {["All", "High", "Medium", "Low"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                background: filter === item ? "#2563eb" : "#1f2937",
                color: "white",
                fontSize: "14px",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredScans.map((scan) => {
          const color = getColor(scan.level);

          return (
            <div
              key={scan._id}
              style={{
                ...glassCard,
                marginTop: "18px",
                border: `1px solid ${color}40`,
                transition: "0.2s",
              }}
            >
              <h3 style={{ color }}>Risk: {scan.level}</h3>
              <p style={{ lineHeight: "1.6", wordBreak: "break-word" }}>{scan.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}