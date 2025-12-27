import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSuccess.css";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  const { doctor, reason, day, time } = location.state || {
    doctor: {
      name: "Dr Fiona MORES",
      role: "Chirurgien-dentiste",
      address: "27 Rue Charles Devendeville, Lesquin",
      img: "https://via.placeholder.com/150",
    },
    reason: "Consultation dentaire",
    day: "Mardi 6 janv. 2026",
    time: "10h00",
  };

  // lock scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [navigate]);

  // close when clicking the overlay outside the modal
  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      navigate(-1);
    }
  };

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-card" role="document">
        <button
          className="modal-close-btn"
          aria-label="Close"
          onClick={() => navigate(-1)}
        >
          ×
        </button>

        <div className="modal-body">
          <div className="success-section">
            <div className="success-icon-check">✓</div>
            <h2 className="success-title">Your appointment is confirmed!</h2>
            <p className="success-text">A confirmation email has been sent to you.</p>

            <div className="modal-actions">
              <button className="btn-home" onClick={() => navigate("/")}>
                Back to Homepage
              </button>
            </div>
          </div>

          <aside className="summary-section">
            <div className="summary-card">
              <div className="summary-header">{day} • {time}</div>
              <div className="summary-body">
                <img src={doctor?.img} alt={doctor?.name || "Doctor"} className="doc-img" />
                <div className="doc-info">
                  <h4 className="doc-name">{doctor?.name}</h4>
                  <p className="doc-role">{doctor?.role}</p>
                </div>
              </div>
              <div className="summary-footer">
                <p className="summary-line">📍 {doctor?.address}</p>
                <p className="summary-line">🩺 {reason}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
