import React, { useState } from "react";
import Header from "../header";
import "./dashboard.css";

// Sample appointment data
const appointmentsData = {
  "2023-10-26": [
    { time: "09:00 AM", patient: "Liam Johnson", reason: "Sore throat and fever", status: "Confirmed" },
    { time: "10:30 AM", patient: "Olivia Davis", reason: "Follow-up checkup", status: "Pending" },
    { time: "11:15 AM", patient: "Noah Martinez", reason: "Annual physical exam", status: "Confirmed" },
    { time: "01:00 PM", patient: "Emma Garcia", reason: "Vaccination appointment", status: "Cancelled" },
    { time: "02:30 PM", patient: "James Wilson", reason: "Consultation for back pain", status: "Confirmed" }
  ]
};

const monthData = {
  1: "grey", 2: "green", 3: "green", 4: "orange", 5: "red", 6: "green", 7: "grey",
  9: "green", 10: "green", 11: "orange", 12: "red", 13: "green", 14: "grey",
  16: "green", 17: "green", 18: "green", 19: "green", 20: "green", 21: "grey",
  23: "green", 24: "green", 25: "red", 26: "white", 27: "green", 28: "grey",
  30: "green", 31: "green"
};

export default function DoctorDashboard() {
  const [selectedDate, setSelectedDate] = useState("2023-10-26");

  const handleDateClick = (day) => {
    setSelectedDate(`2023-10-${day.toString().padStart(2, "0")}`);
  };

  return (
    <div className="doctor-dashboard">
      <Header />

      <div className="dashboard-container">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="doctor-info card">
            <h2>Dr. Emily Carter</h2>
            <p>General Practitioner</p>
            <div className="doctor-buttons">
              <button className="add-btn">+ Add Availability</button>
              <button className="patients-btn">View Patients List</button>
            </div>
          </div>

          <div className="calendar card">
            <div className="month-label">October 2023</div>
            <div className="weekdays">
              {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="days">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <div 
                  key={day} 
                  className={`day ${monthData[day] || "grey"} ${selectedDate.endsWith(day.toString().padStart(2,"0")) ? "selected" : ""}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel card">
          <h3>Appointments for {selectedDate.split("-")[2]} {selectedDate.split("-")[1]}, {selectedDate.split("-")[0]}</h3>
          <div className="appointments-list">
            {appointmentsData[selectedDate]?.map((appt, index) => (
              <div key={index} className={`appointment ${appt.status.toLowerCase()}`}>
                <div className="time">{appt.time} - {appt.patient}</div>
                <div className="reason">{appt.reason}</div>
                <div className={`status ${appt.status.toLowerCase()}`}>{appt.status}</div>
              </div>
            )) || <p>No appointments</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
