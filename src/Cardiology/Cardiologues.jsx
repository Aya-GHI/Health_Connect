import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../authen/styles/Cardiologues.css";

import cardio1 from "../assets/cardio1.jpg";
import cardio2 from "../assets/cardio2.jpg";
import cardio3 from "../assets/cardio3.jpg";

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
const cardiologues = [
  {
    id: 1,
    name: "Dr. Syrine Ben Jeddou",
    role: "Cardiologue",
    address: "Centre medical Aicha, L'Aouina, Tunis",
    img: cardio1,
    nextAppointment: "Monday 6 July 2026",
  },
  {
    id: 2,
    name: "Dr Fourat ZOUARI",
    role: "Cardiologue",
    address: "Centre médical Violette, Ennasr 2, Ariana",
    img: cardio2,
    nextAppointment: "Friday 15 April 2026",
  },
  {
    id: 3,
    name: "Dr Tarek BEN CHEDLI",
    role: "Cardiologue",
    address: "Soukra Médical, La Soukra, Ariana",
    img: cardio3,
    nextAppointment: "Thursday 5 May 2026",
  },
];

function Cardiologues() {
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
      specialty: "cardiology", // 👈 مهم برشا
      doctor: selectedDoc,
      time,
      day,
    },
  });
};


  const handleShowTimes = (doc) => {
    setSelectedDoc(doc);
    setShowTimes(true);
  };

  return (
    <div className="page">
      <h1 className="title">Cardiologues</h1>

      {cardiologues.map((doc) => (
        <div className="card" key={doc.id}>
          {/* LEFT */}
          <div className="left">
            <img src={doc.img} alt={doc.name} className="doctor-img" />
            <h3>{doc.name}</h3>
            <p className="role">{doc.role}</p>
            <p className="address">📍 {doc.address}</p>
          </div>

          {/* RIGHT */}
          <div className="right">
            {!showTimes || selectedDoc?.id !== doc.id ? (
              <>
                <div className="calendar-header">
                  <span onClick={() => setCurrentMonth(m => (m === 0 ? 11 : m - 1))}>◀</span>
                  <strong>{months[currentMonth]} {year}</strong>
                  <span onClick={() => setCurrentMonth(m => (m === 11 ? 0 : m + 1))}>▶</span>
                </div>

                <div className="calendar">
                  {days.map((day) => (
                    <div key={day} className="day">{day}</div>
                  ))}
                </div>

                <div className="next-rdv" onClick={() => handleShowTimes(doc)}>
                  <span>
                    Prochain RDV le <strong>{doc.nextAppointment}</strong>
                  </span>
                  <span className="arrow">›</span>
                </div>
              </>
            ) : (
              <>
                <div className="time-header">
                  <span className="back-arrow" onClick={() => setShowTimes(false)}>
                    ◀ Back to calendar
                  </span>
                  <strong>Available times</strong>
                </div>

                <div className="time-grid">
                  {Object.entries(timeSlots).map(([day, times]) => (
                    <div key={day} className="time-column">
                      <h4>{day}</h4>
                      {times.length === 0 ? (
                        <span className="no-time">—</span>
                      ) : (
                        times.map((t) => (
                          <div
                            key={t}
                            className="time-slot"
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
  );
}

export default Cardiologues;
