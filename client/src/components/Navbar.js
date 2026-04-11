import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "14px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(10,10,20,0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "700",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        ScamShield
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        {currentUser && (
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
        )}

        <Link to="/reports" style={linkStyle}>
          Reports
        </Link>

        {!currentUser ? (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>

            <Link to="/signup" style={buttonStyle}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span
              style={{
                color: "#cbd5e1",
                fontSize: "13px",
                maxWidth: "90px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              👤 {currentUser.name}
            </span>

            <button onClick={handleLogout} style={logoutStyle}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#2563eb",
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
};

const logoutStyle = {
  padding: "7px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: "13px",
};