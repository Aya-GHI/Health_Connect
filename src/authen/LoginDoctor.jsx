import React, { useState } from "react";
import "./styles/LoginDoctor.css";
import { Link, useNavigate } from "react-router-dom";

const LoginDoctor = () => {
  const navigate = useNavigate(); // Hook to redirect
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Example: replace this with your real authentication logic
    if (username === "doctor" && password === "1234") {
      // Redirect to dashboard
      navigate("/doctor-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-doctor-page">
      <div className="login-card">
        <h2>Doctor Login</h2>

        <div className="form-section">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span className="forgot-password">Forgot password?</span>
        </div>

        <button className="login-btn" onClick={handleLogin}>LOGIN</button>

        <p className="register-link">
          Don’t have an account? <Link to="/register-doctor">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginDoctor;
