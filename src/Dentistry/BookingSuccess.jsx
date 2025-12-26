import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "../authen/styles/BookingSuccess.css";

const BookingSuccess = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  
  const { doctor, reason, day, time } = location.state || {
    doctor: { name: "Dr Fiona MORES", role: "Chirurgien-dentiste", address: "27 Rue Charles Devendeville, Lesquin", img: "https://via.placeholder.com/150" },
    reason: "Consultation dentaire",
    day: "Mardi 6 janv. 2026",
    time: "10h00"
  };

  return (
    <div className="booking-container">
      <div className="booking-wrapper">
        <div className="booking-main">
          <div className="success-card">
            <div className="success-icon-check">✓</div>
            <h2 className="success-title">Your appointment is confirmed!</h2>
            <p className="success-text">A confirmation email has been sent to you.</p>
            <button className="btn-home" onClick={() => navigate("/")}>Back to home</button>
          </div>
        </div>

        
        <div className="booking-sidebar">
          <div className="summary-card">
            <div className="summary-header">{day} • {time}</div>
            <div className="summary-body">
              <img src={doctor?.img} alt="" className="doc-img" />
              <div>
                <h4>{doctor?.name}</h4>
                <p>{doctor?.role}</p>
              </div>
            </div>
            <div className="summary-footer">
              <p>📍 {doctor?.address}</p>
              <p>🩺 {reason}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;