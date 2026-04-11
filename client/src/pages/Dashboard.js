import { useEffect, useState } from "react";

const BASE_URL = "https://scamshield-ylfc.onrender.com";

export default function Dashboard() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/analyze`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setScans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching scans:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "100px 16px", color: "white" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

        {scans.length === 0 ? (
          <div
            style={{
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            No scans yet.
          </div>
        ) : (
          scans.map((scan) => (
            <div
              key={scan._id}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>Risk: {scan.level}</h3>
              <p style={{ marginBottom: "8px" }}>Score: {scan.score}</p>
              <p>{scan.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}