import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Step3Confirm.css";

const Step3Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, day, time, reason } = location.state || {};

  return (
    <div className="booking-layout">
      <div className="booking-main">
        <button className="back-btn" onClick={() => navigate(-1)}>← Étape précédente</button>
        <div className="white-card centered-text">
          <h2 className="step-title">Confirmez l'heure du rendez-vous</h2>
          <p className="confirm-msg">
            Vous avez sélectionné le <strong>{day} {time}</strong>.
          </p>
          <button className="btn-continue" onClick={() => navigate("/booking/auth", { state: location.state })}>
            CONTINUER
          </button>
        </div>
      </div>
      
      {/* نفس الـ Sidebar يعاد هنا */}
    </div>
  );
};

export default Step3Confirm;