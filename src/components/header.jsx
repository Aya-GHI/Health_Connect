import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.png";
import "./Header.css";


export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-logo">
        {/* Logo links to home */}
        <Link 
          to="/" 
          style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}
        >
          <img src={logo} alt="logo" style={{ marginRight: "8px" }} />
          <h1>HealthConnect</h1>
        </Link>
      </div>

      <div className="header-menu">
       <button
            className="doctor-btn"
            onClick={() => navigate("/register-doctor")}
          >
             ARE YOU A DOCTOR?
          </button>

        {/* Help center link can stay */}
        <a href="#">HELP CENTER</a>

        {/* Login button */}
        <button className="login-btn" onClick={() => navigate("/login")}>
          LOGIN
        </button>
      </div>
    </header>
  );
}
