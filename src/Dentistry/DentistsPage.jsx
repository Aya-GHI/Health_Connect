import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // نزيدو هذي للـ Navigation
import "../authen/styles/DentistsPage.css";


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
    <div className="page">
      <h1 className="title">Dentists</h1>

      {dentists.map((doc) => (
        <div className="card" key={doc.id}>
          {/* LEFT SIDE: Doctor Info */}
          <div className="left">
            <img src={doc.img} alt={doc.name} className="doctor-img" />
            <h3>{doc.name}</h3>
            <p className="role">{doc.role}</p>
            <p className="address">📍 {doc.address}</p>
          </div>

          {/* RIGHT SIDE: Calendar or Time Slots */}
          <div className="right">
            {!showTimes || selectedDoc?.id !== doc.id ? (
              <>
                <div className="calendar-header">
                  <span onClick={() => setCurrentMonth((m) => (m === 0 ? 11 : m - 1))}>◀</span>
                  <strong>{months[currentMonth]} {year}</strong>
                  <span onClick={() => setCurrentMonth((m) => (m === 11 ? 0 : m + 1))}>▶</span>
                </div>

                <div className="calendar">
                  {days.map((day) => (
                    <div key={day} className="day">
                      {day}
                    </div>
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
                  <span onClick={() => setShowTimes(false)} className="back-arrow">◀ Back to calendar</span>
                  <strong>Available times for {doc.name}</strong>
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

export default Dentists;