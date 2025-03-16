import React from "react";
import "./Navbar.css";
import logo from "../assets/logo2.png";
import logoDark from "../assets/logo-dark.png";
import ThemeToggle from "./toggle";

const Navbar = () => {
  return (
    <nav className="navbar">
      <hr className="navbar-divider" />

      <div className="navbar-logo">
        <img
          src={logo}
          alt="Website Logo"
          style={{ cursor: "pointer", height: "160px" }}
          onClick={() => (window.location.href = "/")}
          className="light"
        />
        <img
          src={logoDark}
          alt="Website Logo"
          style={{ cursor: "pointer", height: "160px" }}
          onClick={() => (window.location.href = "/")}
          className="dark"
        />
      </div>
      <hr className="divide"></hr>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
