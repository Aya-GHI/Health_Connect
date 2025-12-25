import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import MiniCalendar from "../calendar/MiniCalendar";
import cardioData from "../../BDD/db.json";
import "./specialties.css";

export default function Cardio() {
  const doctors = cardioData.cardiology;
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Header />

      <h1 className="title">Cardiologists</h1>

      {doctors.map(doc => (
        <div key={doc.id} className="doctor-card">
          <div className="doctor-info">
            <img src={doc.image} alt={doc.name} className="doc-img" />
            <div>
              <h3>{doc.name}</h3>
              <p>{doc.specialty}</p>
              <p>{doc.address}</p>

              <button
                className="btn-appoint"
                onClick={() =>
                  navigate("/booking", { state: { doctor: doc } })
                }
              >
                Make an appointment
              </button>
            </div>
          </div>

          <MiniCalendar />
        </div>
      ))}
    </div>
  );
}
