import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Analyze from "./components/Analyze";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Home() {
  return (
    <>
      <Hero />
      <Analyze />
    </>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050816", color: "white" }}>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}