import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // نزيدو هذي للـ Navigation
import "../specialties/specialties.css";

import Header from "../header";

import dentist1 from "../assets/dentist1.jpg";
import dentist2 from "../assets/dentist2.jpg";
import dentist3 from "../assets/dentist3.jpg";

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

/* Dentists Data */
const dentists = [
  {
    id: 1,
    name: "Dr. Helmi Jemli",
    role: "Chirurgien dentiste",
    address: "Sabra et chatila, Tunis",
    img: dentist2,
    nextAppointment: "Tuesday 6 January 2026",
  },
  {
    id: 2,
    name: "Dr Cherifa Bahri",
    role: "Médecin dentiste",
    address: "Les Berges du Lac 2",
    img: dentist1,
    nextAppointment: "Monday 12 January 2026",
  },
  {
    id: 3,
    name: "Dr Yassine Messaoudi",
    role: "Médecin dentiste",
    address: "L'aouina, Tunis",
    img: dentist3,
    nextAppointment: "Thursday 15 January 2026",
  },
];

function Dentists() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [showTimes, setShowTimes] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null); // باش نعرفو شكون الطبيب اللي اخترناه
  
  const navigate = useNavigate();
  const year = 2025;

  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Function باش تتعدى لصفحة اختيار السبب
  const handleTimeSelection = (time, day) => {
    navigate("/booking/reason", {
      state: {
        doctor: selectedDoc,
        specialty: "dentistry",
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
    <h1 className="title">Dentists</h1>

    {dentists.map((doc) => (
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

export default Dentists;