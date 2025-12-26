import React, { useState } from "react";
import Header from "../header";
import "./dashboard.css";

/* Tunisian appointments */
const appointmentsData = {
  "2026-01-26": [
  { time: "09:00", patient: "Youssef Ben Salah", reason: "Douleur dentaire aiguë", status: "Confirmed" },
  { time: "10:30", patient: "Amira Trabelsi", reason: "Contrôle dentaire de routine", status: "Pending" },
  { time: "11:15", patient: "Ahmed Gharbi", reason: "Sensibilité dentaire au chaud et au froid", status: "Confirmed" },
  { time: "13:00", patient: "Meriem Jlassi", reason: "Inflammation des gencives", status: "Cancelled" },
  { time: "14:30", patient: "Mohamed Ali Zouari", reason: "Carie dentaire suspectée", status: "Confirmed" }
]

};

export default function DoctorDashboard() {
  const [selectedDay, setSelectedDay] = useState(26);

  /* October 2023 starts on Sunday */
  const daysInMonth = 31;
  const emptyDays = 0;

  return (
    <div className="doctor-dashboard">
      <Header />

      <div className="dashboard-container">

        {/* LEFT */}
        <div className="left-panel">

          <div className="doctor-info card">
            <h4>Dr. Karim Bouzid</h4>
            <p>Médecin Dentiste</p>

            <div className="doctor-buttons">
              <button className="add-btn">+ Add Availability</button>
              <button className="patients-btn">View Patients</button>
            </div>
          </div>

          <div className="calendar card">
            <div className="month-label">January 2026</div>

            <div className="weekdays">
              {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="days">
              {Array.from({ length: emptyDays }).map((_, i) => (
                <div key={`empty-${i}`}></div>
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isWeekend = (day % 7 === 1 || day % 7 === 0);

                return (
                  <div
                    key={day}
                    className={`day ${isWeekend ? "weekend" : ""} ${selectedDay === day ? "selected" : ""}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-panel card">
          <h3>Appointments for 26 January 2026</h3>

          <div className="appointments-list">
            {appointmentsData["2026-01-26"].map((appt, i) => (
              <div key={i} className={`appointment ${appt.status.toLowerCase()}`}>
                <div className="time">{appt.time} — {appt.patient}</div>
                <div className="reason">{appt.reason}</div>
                <div className="status">{appt.status}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
