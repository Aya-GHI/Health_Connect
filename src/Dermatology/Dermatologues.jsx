import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../specialties/specialties.css";

import Header from "../header";

import dermato1 from "../assets/dermato1.jpg";
import dermato2 from "../assets/dermato2.jpg";
import dermato3 from "../assets/dermato3.jpg";

/* Months */
const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

/* Fake time slots */
const timeSlots = {
  Monday: ["11:00", "11:15", "11:30", "11:45", "14:30", "14:45", "15:15", "15:30"],
  Tuesday: ["09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15"],
  Wednesday: [],
  Thursday: ["09:00", "09:15", "09:30", "09:45", "10:30", "10:45", "11:15", "11:30"],
  Friday: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45"],
};

/* Cardiologues Data */
const dermatologues = [
  {
    id: 1,
    name: "Dr Jihen HICHERI",
    role: "Dermatologue",
    address: " Iris Medical Center avenue Hedi Nouira Nasr1 (a coté de la Clinique Amilcar), 1 er étage cabinet 1.4 Cité Ennasr 1 2037 Ariana Tunisie",
    img: dermato1,
    nextAppointment: "mardi 9 février  2026",
  },
  {
    id: 2,
    name: "Dr Sami BAKER ",
    role: "Dermatologue",
    address: "Avicenne Medical (à coté de la clinique Avicenne), 2 rue mohammed Jammali , 3ème étage cabinet 12 El Manar 2 2092 Tunis Tunisie",
    img: dermato2,
    nextAppointment: "Lundi  18 janvier 2026",
  },
  {
    id: 3,
    name: "Dr Yosra JMOUR ",
    role: "Dermatologue",
    address: "Centre Médical Lake Tower (près de la clinique Hanibal) 1er étage Cabinet C-8 Avenue Beji Caïd Essebsi , Lac 2 Les Berges Du Lac 2 1053 Tunis Tunisie",
    img: dermato3,
    nextAppointment: "Mercredi  18 May 2026",
  },
];

function Dermatologues() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [showTimes, setShowTimes] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const navigate = useNavigate();
  const year = 2025;

  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleTimeSelection = (time, day) => {
  navigate("/booking/reason", {
    state: {
        doctor: selectedDoc,
        specialty: "dermatology",
        time: time,
        day: day,
        month: months[currentMonth],
        year: year
      }
  });
};


  const handleShowTimes = (doc) => {
    setSelectedDoc(doc);
    setShowTimes(true);
  };

  return (
    <>
  <Header />

  <div className="page-container">
    <h1 className="title">Dermatologues</h1>

    {dermatologues.map((doc) => (
      <div key={doc.id} className="doctor-card">

        {/* LEFT: Doctor info */}
        <div className="doctor-info">
          <img src={doc.img} alt={doc.name} className="doc-img" />

          <div className="doctor-meta">
            <h3>{doc.name}</h3>
            <p className="muted">{doc.role}</p>
            <p className="muted">📍 {doc.address}</p>

            <div className="appointment-btn-wrapper">
              <button
                className="btn-appoint"
                onClick={() => handleShowTimes(doc)}
              >
                Book an appointment
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Calendar / Times */}
        <div className="card-right">
          {!showTimes || selectedDoc?.id !== doc.id ? (
            <>
              <div className="mini-calendar-header">
                <button
                  className="nav-icon"
                  onClick={() =>
                    setCurrentMonth((m) => (m === 0 ? 11 : m - 1))
                  }
                >
                  ◀
                </button>

                <div className="month-label">
                  {months[currentMonth]} {year}
                </div>

                <button
                  className="nav-icon"
                  onClick={() =>
                    setCurrentMonth((m) => (m === 11 ? 0 : m + 1))
                  }
                >
                  ▶
                </button>
              </div>

              <div className="compact-calendar">
                {days.map((day) => (
                  <div key={day} className="compact-day">
                    {day}
                  </div>
                ))}
              </div>

              <div
                className="next-rdv compact-next"
                onClick={() => handleShowTimes(doc)}
              >
                <span className="next-text">
                  Next available <strong>{doc.nextAppointment}</strong>
                </span>
                <span className="arrow">›</span>
              </div>
            </>
          ) : (
            <>
              <div className="time-header-compact">
                <button
                  className="nav-text"
                  onClick={() => setShowTimes(false)}
                >
                  ◀ Back
                </button>
                <strong>Available times</strong>
              </div>

              <div className="time-grid-compact">
                {Object.entries(timeSlots).map(([day, times]) => (
                  <div key={day} className="time-column-compact">
                    <h5 className="day-title">{day}</h5>

                    {times.length === 0 ? (
                      <span className="no-time">—</span>
                    ) : (
                      times.map((t) => (
                        <div
                          key={t}
                          className="time-slot-compact"
                          onClick={() => handleTimeSelection(t, day)}
                        >
                          {t}
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
</>

  );
}

export default Dermatologues;
