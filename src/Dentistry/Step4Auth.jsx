import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../authen/styles/Step4Auth.css";
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
              <h3 className="main-title">Votre rendez-vous n'est pas encore confirmé. 
                Veuillez vous connecter d'abord
              </h3>

              <div className="auth-cards-wrapper">
                <div className="auth-card">
                  <p>Nouveau sur Health Connect ?</p>
                  <button className="btn-blue" onClick={() => navigate("/register")}>
                    S'INSCRIRE
                  </button>
                </div>

                <div className="auth-card">
                  <p>J'ai déjà un compte Health Connect</p>
                  <button
                    className="btn-yellow"
                    onClick={() => {
                      navigate("/login", {
                        state: { doctor, reason, day, time },
                      });
                    }}
                  >
                    SE CONNECTER
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
