import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../authen/styles/Step3Confirm.css";

const Step3Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>❌ Données manquantes</h2>
        <button onClick={() => navigate("/")}>Retour accueil</button>
      </div>
    );
  }

  const { doctor, day, time, reason } = location.state;

  return (
    <div className="booking-layout">
      <div className="booking-main">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Étape précédente
        </button>

        <div className="white-card centered-text">
          <h2 className="step-title">Confirmez l'heure du rendez-vous</h2>

          <p className="confirm-msg">
            Vous avez sélectionné le <strong>{day} à {time}</strong>.
          </p>

          <button
            className="btn-continue"
            onClick={() =>
              navigate("/booking/auth", {
                state: location.state,
              })
            }
          >
            CONTINUER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Confirm;
