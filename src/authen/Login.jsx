import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/LoginForm.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // State lel fazaa el jdida

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Nwarriw el Modal mte3 Success
    setShowModal(true);

    // 2. Nastenaw 2 seconds (wa9t el progress bar) bech na3mlou navigate
    setTimeout(() => {
      if (location.state) {
        navigate("/bookingsuccess", { state: location.state });
      } else {
        navigate("/");
      }
    }, 3000);
  };

  return (
    <div className="login-container">
      {/* --- El SUCCESS MODAL (Overlay) --- */}
      {showModal && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="modal-icon">🤗</div>
            <h2>Welcome Back!</h2>
            <span className="user-display-name">{email.split('@')[0]}</span>
            <div className="success-badge">✨ Login Successful ✨</div>
            
            <div className="modal-progress-container">
              <div className="modal-progress-bar"></div>
            </div>
          </div>
        </div>
      )}

      <div className="login-card">
        <div className="login-header">
          <h2>WELCOME BACK!</h2>
          <p className="login-subtitle">
            Log in to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email/Username</label>
            <input
              type="text"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="eye-icon" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="forgot-password">
              <a href="#">Forget Password?</a>
            </div>
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;