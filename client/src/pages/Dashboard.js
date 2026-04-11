import { useEffect, useState } from "react";
import { glassCard } from "../styles/glass";

const BASE_URL = "https://scamshield-yifc.onrender.com";

export default function Dashboard() {
  const [scans, setScans] = useState([]);
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("scans");

  useEffect(() => {
    fetchScans();
    fetchReports();
  }, []);

  const fetchScans = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/analyze`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setScans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching scans:", error);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/report`);
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching reports:", error);
    }
  };

  const total = scans.length;
  const high = scans.filter((item) => item.level === "High").length;
  const medium = scans.filter((item) => item.level === "Medium").length;
  const low = scans.filter((item) => item.level === "Low").length;

  const filteredScans = scans.filter((scan) => {
    const matchText = scan.text.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || scan.level === filter;
    return matchText && matchFilter;
  });

  const filteredReports = reports.filter((report) =>
    report.text.toLowerCase().includes(search.toLowerCase())
  );

  const getColor = (level) => {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div
      style={{
        padding: "90px 16px 30px",
        color: "white",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(28px, 7vw, 36px)", marginBottom: "18px" }}>
          Dashboard
        </h1>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
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

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => setActiveTab("scans")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "scans" ? "#3867f4" : "#1f2937",
              color: "white",
              cursor: "pointer",
            }}
          >
            My Scans
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "reports" ? "#3867f4" : "#1f2937",
              color: "white",
              cursor: "pointer",
            }}
          >
            Community Reports
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={
            activeTab === "scans" ? "Search scans..." : "Search reports..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#0f172a",
            color: "white",
            marginBottom: "14px",
            boxSizing: "border-box",
          }}
        />

        {/* Filter only for scans */}
        {activeTab === "scans" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            {["All", "High", "Medium", "Low"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: filter === item ? "#3867f4" : "#1f2937",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Scans tab */}
        {activeTab === "scans" && (
          <>
            {filteredScans.length === 0 ? (
              <div style={glassCard}>
                <p>No scans found.</p>
              </div>
            ) : (
              filteredScans.map((scan) => {
                const color = getColor(scan.level);

                return (
                  <div
                    key={scan._id}
                    style={{
                      ...glassCard,
                      marginTop: "16px",
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <h3 style={{ color, marginBottom: "8px" }}>
                      Risk: {scan.level}
                    </h3>

                    <p style={{ marginBottom: "8px" }}>
                      <strong>Score:</strong> {scan.score}
                    </p>

                    <p style={{ lineHeight: "1.6", wordBreak: "break-word" }}>
                      {scan.text}
                    </p>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Reports tab */}
        {activeTab === "reports" && (
          <>
            {filteredReports.length === 0 ? (
              <div style={glassCard}>
                <p>No reports found.</p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report._id}
                  style={{
                    ...glassCard,
                    marginTop: "16px",
                    border: "1px solid rgba(239,68,68,0.25)",
                  }}
                >
                  <h3 style={{ color: "#ef4444", marginBottom: "8px" }}>
                    Community Report
                  </h3>

                  <p style={{ lineHeight: "1.6", wordBreak: "break-word" }}>
                    {report.text}
                  </p>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}