import React from "react";
import Header from "../header"; // adjust path if needed
import MiniCalendar from "../calendar/MiniCalendar";
import dermData from "../../BDD/db.json"; // import JSON directly
import "./specialties.css";

export default function Dermatology() {
  const doctors = dermData.dermatology; // use dermatology array directly

  return (
    <div className="page-container">
      <Header />

      <h1 className="title">Dermatologists</h1>

      {doctors.map(doc => (
        <div key={doc.id} className="doctor-card">
          <div className="doctor-info">
            <img src={doc.image} alt={doc.name} className="doc-img" />
            <div>
              <h3>{doc.name}</h3>
              <p>{doc.specialty}</p>
              <p>{doc.address}</p>
              <button className="btn-appoint">Make an appointment</button>
            </div>
          </div>

          <MiniCalendar />
        </div>
      ))}
    </div>
  );
}
