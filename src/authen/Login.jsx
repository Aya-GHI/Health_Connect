import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/LoginForm.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // ✅ Login success
      setShowModal(true);

      setTimeout(() => {
        if (location.state) {
          navigate("/bookingsuccess", { state: location.state });
        } else {
          navigate("/");
        }
      }, 3000);

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* ===== SUCCESS MODAL ===== */}
      {showModal && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="modal-icon">🤗</div>
            <h2>Welcome Back!</h2>
            <span className="user-display-name">
              {email.includes("@") ? email.split("@")[0] : email}
            </span>
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

        {/* ===== ERROR MESSAGE ===== */}
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email / Username</label>
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
