import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../authen/styles/Step2Reason.css";
import "../authen/styles/Step3Confirm.css"; // keep styles for the popup
import backArrow from "../assets/back-arrow.png";
import Header from "../header.jsx";


const reasonsBySpecialty = {
  dentistry: [
    "Consultation dentaire",
    "Urgence dentaire",
    "Consultation d'occlusodontie",
    "Consultation M'T Dents",
  ],
  cardiology: ["Consultation de cardiologie", "Consultation pré-opératoire de cardiologie"],
  ophtalmology: [
    "Consultation",
    "Lentilles de contact",
    "Cataracte:Consultation",
    "Chirurgie réfractive:Consultation",
    "Examen pré-opératoire",
    "Examen post-opératoire",
  ],
  dermatology: [
    "Consultation de dermatologie générale",
    "Suivi et contrôle des grains de beauté",
    "Consultation pour acné",
    "Consultation pour chute de cheveux (Alopécie)",
    "Traitement de l'eczéma ou du psoriasis",
    "Avis pour une lésion cutanée suspecte",
    "Consultation pour mycose ou problèmes d'ongles",
    "Traitement de verrues",
    "Consultation de dermatologie esthétique",
  ],
  pediatrics: [
    "Consultation de suivi pédiatrique (bilan de santé)",
    "Vaccination et rappels",
    "Consultation pour maladie aiguë (fièvre, toux, otite)",
    "Suivi de la croissance et du développement",
    "Consultation pour troubles du sommeil",
    "Visite obligatoire (8ème jour, 9ème mois, 24ème mois)",
  ],
};

const Step2Reason = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { specialty, doctor, day, time } = location.state || {};
  const reasons = reasonsBySpecialty[specialty] || [];

  const [selectedReason, setSelectedReason] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSelectReason = (reason) => {
    setSelectedReason(reason);
    setShowPopup(true); // show popup instead of navigating
  };

  const handleContinue = () => {
    navigate("/booking/auth", {
      state: { specialty, doctor, day, time, reason: selectedReason },
    });
  };

  return (
    <div className="booking-layout">
      <div className="booking-main">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={backArrow} alt="Back" className="back-arrow-img" />
        </button>

        <div className="white-card">
          <h2 className="step-title">Choose your appointment's reason</h2>
          <div className="options-list">
            {reasons.map((r) => (
              <div key={r} className="option-row" onClick={() => handleSelectReason(r)}>
                <span>{r}</span>
                <span className="blue-arrow">›</span>
              </div>
            ))}
          </div>
          <div className="appointment-btn-wrapper">
            <button className="btn-appoint" onClick={() => handleSelectReason(reasons[0])}>
              Proceed
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Summary */}
      <div className="booking-sidebar">
        <div className="doc-summary">
          <img src={doctor?.img} alt="" className="doc-img" />
          <div className="doctor-meta">
            <h3>{doctor?.name}</h3>
            <p className="muted">{doctor?.role}</p>
          </div>
        </div>
        <div className="rdv-summary-details">
          <h5>Votre rendez-vous en détail</h5>
          <p>📍 {doctor?.address}</p>
          {day && <p>📅 {day} at {time}</p>}
        </div>
      </div>

      {/* Popup for Step3Confirm */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <h2 className="step-title">Confirmez l'heure du rendez-vous</h2>
            <p className="confirm-msg">
              Vous avez sélectionné le <strong>{day} à {time}</strong> pour <strong>{selectedReason}</strong>.
            </p>
            <button className="btn-continue" onClick={handleContinue}>
              CONTINUER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2Reason;
