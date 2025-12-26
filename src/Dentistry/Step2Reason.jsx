import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../authen/styles/Step2Reason.css";
import "../authen/styles/Step3Confirm.css"; // keep styles for the popup
import backArrow from "../assets/back-arrow.png";
import Header from "../header.jsx";


const reasonsBySpecialty = {
  dentistry: [
    "Dental consultation",
    "Dental emergency",
    "Occlusodontics consultation",
    "M'T Dents consultation",
  ],
  cardiology: [
    "Cardiology consultation", 
    "Pre-operative cardiology consultation"
  ],
  ophtalmology: [
    "Consultation",
    "Contact lenses",
    "Cataract consultation",
    "Refractive surgery consultation",
    "Pre-operative examination",
    "Post-operative examination",
  ],
  dermatology: [
    "General dermatology consultation",
    "Mole monitoring and follow-up",
    "Acne consultation",
    "Hair loss (alopecia) consultation",
    "Eczema or psoriasis treatment",
    "Assessment of a suspicious skin lesion",
    "Consultation for fungal or nail disorders",
    "Wart treatment",
    "Aesthetic dermatology consultation",
  ],
  pediatrics: [
    "Pediatric follow-up consultation (health check-up)",
    "Vaccination and booster shots",
    "Consultation for acute illness (fever, cough, ear infection)",
    "Growth and developmental monitoring",
    "Sleep disorder consultation",
    "Mandatory check-ups (8th day, 9th month, 24th month)",
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
          <h5>Your appointment details</h5>
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
            <h2 className="step-title">Confirm the appointment time</h2>
            <p className="confirm-msg">
              You have selected <strong>{day} at {time}</strong> for  <strong>{selectedReason}</strong>.
            </p>
            <button className="btn-continue" onClick={handleContinue}>
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2Reason;
