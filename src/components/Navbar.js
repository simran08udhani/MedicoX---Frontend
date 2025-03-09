import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "./Navbar.css"; // Import CSS for styling
import logo from "../assets/logo2.png"; // Import your logo image
import ThemeToggle from "./toggle";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  
  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      {/* Horizontal Rule before the Logo */}
      <hr className="navbar-divider" />

      {/* Clickable Website Logo */}
      <div className="navbar-logo">

        <img
          src={logo}
          alt="Website Logo"
          style={{ cursor: "pointer", height: "160px" }}
          onClick={() => (window.location.href = "/")}
        />
      </div>
      <hr className="divide"></hr>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <ThemeToggle/>
        
      </div>
    </nav>
  );
};

export default Navbar;
