import { useEffect, useState } from "react";
import { glassCard } from "../styles/glass";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("https://scamshield-yifc.onrender.com/api/report");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error loading reports:", error);
    }
  };

  const getLevel = (text) => {
    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("registration fee") ||
      lowerText.includes("bank account") ||
      lowerText.includes("deposit") ||
      lowerText.includes("urgent")
    ) {
      return "High";
    }

    if (
      lowerText.includes("guaranteed") ||
      lowerText.includes("limited spots") ||
      lowerText.includes("money")
    ) {
      return "Medium";
    }

    return "Low";
  };

  const getColor = (level) => {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
  };

  const filteredReports = reports.filter((report) => {
    const reportLevel = getLevel(report.text);

    const matchesSearch = report.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || reportLevel === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div
      style={{
        padding: "100px 20px",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
          Community Reports
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: "25px" }}>
          Browse scams reported by users.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #1f2937",
            background: "#111827",
            color: "white",
            outline: "none",
          }}
        />

        {/* Filter buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          {["All", "High", "Medium", "Low"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: filter === item ? "#2563eb" : "#1f2937",
                color: "white",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Count */}
        <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
          Showing {filteredReports.length} report
          {filteredReports.length !== 1 ? "s" : ""}
        </p>

        {/* Cards */}
        {filteredReports.length === 0 ? (
          <div style={{ ...glassCard }}>
            <p style={{ margin: 0 }}>No matching reports found.</p>
          </div>
        ) : (
          filteredReports.map((report) => {
            const level = getLevel(report.text);
            const color = getColor(level);

            return (
              <div
                key={report._id}
                style={{
                  ...glassCard,
                  marginTop: "20px",
                  border: `1px solid ${color}40`,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3 style={{ color, marginTop: 0 }}>
                  Risk: {level}
                </h3>

                <p style={{ lineHeight: "1.6" }}>{report.text}</p>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginTop: "12px",
                  }}
                >
                  {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}