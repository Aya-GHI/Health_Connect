import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // زدنا useNavigate هنا
import "../styles/Step4Auth.css";

const Step4Auth = () => {
  const location = useLocation();
  const navigate = useNavigate(); // نادينالو هنا
  const { doctor, reason, day, time } = location.state || {};

  return (
    <div className="booking-container">
      <div className="booking-wrapper">
        <div className="booking-main">
          <h2 className="main-title">Votre rendez-vous n'est pas encore confirmé.</h2>
          
          <div className="auth-card">
            <p>Nouveau sur Doctolib ?</p>
            {/* الربط بصفحة التسجيل */}
            <button className="btn-blue" onClick={() => navigate("/register")}>
              S'INSCRIRE
            </button>
          </div>

          <div className="auth-card">
            <p>J'ai déjà un compte Doctolib</p>
            {/* الربط بصفحة الدخول */}
            <button className="btn-yellow" onClick={() => navigate("/login")}>
              SE CONNECTER
            </button>
          </div>
        </div>

        {/* الـ Sidebar اللي ديما على اليمين */}
        <div className="booking-sidebar">
          <div className="sidebar-card">
             <div className="sidebar-header-blue">
                📅 {day} à {time}
             </div>
             <div className="doc-mini-profile">
                <img src={doctor?.img} alt="" className="mini-avatar" />
                <div>
                   <h4>{doctor?.name}</h4>
                   <p>{doctor?.role}</p>
                </div>
             </div>
             <div className="rdv-details-list">
                <p>📍 {doctor?.address}</p>
                <p>🩺 {reason}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Auth;