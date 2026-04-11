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
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(10,10,20,0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: "700",
          textDecoration: "none",
        }}
      >
        ScamShield
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
            <span style={{ color: "#cbd5e1", fontSize: "14px" }}>
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
};

const buttonStyle = {
  padding: "8px 16px",
  borderRadius: "999px",
  background: "linear-gradient(90deg, #d946ef, #ec4899)",
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
};

const logoutStyle = {
  padding: "6px 14px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
};