import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../authen/styles/Step2Reason.css";

const reasonsBySpecialty = {
  dentistry: [
    "Consultation dentaire",
    "Urgence dentaire",
    "Consultation d'occlusodontie",
    "Consultation M'T Dents",
  ],
  cardiology: [
    "Consultation de cardiologie",
    "Consultation pré-opératoire de cardiologie",
  ],
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
    "Consultation de dermatologie esthétique",,
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

  const handleSelectReason = (reason) => {
    navigate("/booking/confirm", {
      state: {
        specialty,
        doctor,
        day,
        time,
        reason,
      },
    });
  };

  return (
    <div className="booking-layout">
      <div className="booking-main">
        <button className="back-btn" onClick={() => navigate(-1)}>← Étape précédente</button>
        <div className="white-card">
          <h2 className="step-title">Choisissez votre motif de consultation</h2>
          <div className="options-list">
            {reasons.map((r) => (
  // قمت بتغيير handleSelect إلى handleSelectReason هنا
  <div key={r} className="option-row" onClick={() => handleSelectReason(r)}> 
    <span>{r}</span>
    <span className="blue-arrow">›</span>
  </div>
))}
          </div>
        </div>
      </div>

      {/* Sidebar Summary */}
      <div className="booking-sidebar">
        <div className="doc-summary">
          <img src={doctor?.img} alt="" className="doc-img-mini" />
          <div>
            <h4>{doctor?.name}</h4>
            <p className="sub-text">{doctor?.role}</p>
          </div>
        </div>
        <div className="rdv-summary-details">
          <h5>Votre rendez-vous en détail</h5>
          <p>📍 {doctor?.address}</p>
          {day && <p>📅 {day} à {time}</p>}
        </div>
      </div>
    </div>
  );
};

export default Step2Reason;
