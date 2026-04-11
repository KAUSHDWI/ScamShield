export default function Result({ result }) {
  if (!result) return null;

  const color =
    result.level === "High"
      ? "#ef4444"
      : result.level === "Medium"
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "24px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${color}55`,
        boxShadow: `0 0 30px ${color}22`,
        color: "white",
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "28px" }}>
          Risk: <span style={{ color }}>{result.level}</span>
        </h2>

        <div
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            background: `${color}22`,
            border: `1px solid ${color}55`,
            color,
            fontWeight: "600",
          }}
        >
          Score: {result.score}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${result.score}%`,
            height: "100%",
            background: color,
            borderRadius: "999px",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      <h3 style={{ marginBottom: "12px", fontSize: "18px" }}>Reasons</h3>

      {result.reasons && result.reasons.length > 0 ? (
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          {result.reasons.map((reason, i) => (
            <li key={i} style={{ marginBottom: "10px", color: "#f1f5f9" }}>
              ⚠ {reason}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#cbd5e1", margin: 0 }}>
          No strong scam indicators found.
        </p>
      )}
    </div>
  );
}