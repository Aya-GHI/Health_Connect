import React from "react";
import Header from "../header"; 
import MiniCalendar from "../calendar/MiniCalendar";
import dentistsData from "../../BDD/db.json"; // import JSON directly
import "./specialties.css";

export default function Dentists() {
  const doctors = dentistsData.dentists; // directly use dentists array

  return (
    <div className="page-container">
      {/* Render the Header at the top */}
      <Header />

      <h1 className="title">Dentists</h1>

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
