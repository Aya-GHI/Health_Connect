import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Step4Auth.css";
import backArrow from "../assets/back-arrow.png";


const Step4Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, reason, day, time } = location.state || {};

  return (
      
      <div>
          {/* زر الرجوع */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <img src={backArrow} alt="Back" className="back-arrow-img" />
          </button>
        <div className="booking-container">
          <div className="booking-wrapper" style={{ justifyContent: "center" }}>
            <div className="booking-main">
              <h3 className="main-title">Your appointment has not been confirmed yet. 
                Please log in first.
              </h3>

              <div className="auth-cards-wrapper">
                <div className="auth-card">
                  <p>New in  Health Connect ?</p>
                  <button className="btn-blue" onClick={() => navigate("/register")}>
                    SIGN UP
                  </button>
                </div>

                <div className="auth-card">
                  <p>I already have a Health Connect account</p>
                  <button
                    className="btn-yellow"
                    onClick={() => {
                      navigate("/login", {
                        state: { doctor, reason, day, time },
                      });
                    }}
                  >
                    SIGN IN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

  );
};

export default Step4Auth;
