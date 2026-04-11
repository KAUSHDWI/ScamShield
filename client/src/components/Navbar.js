import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (setCurrentUser) setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "14px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(5, 8, 22, 0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "18px",
          fontWeight: "800",
          color: "white",
          textDecoration: "none",
        }}
      >
        ScamShield
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>

        {!currentUser ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={signupStyle}>Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={logoutStyle}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#e5e7eb",
  textDecoration: "none",
};

const signupStyle = {
  padding: "10px 18px",
  borderRadius: "999px",
  background: "#3867f4",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  textDecoration: "none",
};

const logoutStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: "13px",
};