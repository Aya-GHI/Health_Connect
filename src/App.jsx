import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Login from "./authen/Login.jsx";
import Register from "./authen/Register.jsx";
import LoginDoctor from "./authen/LoginDoctor.jsx";
import RegisterDoctor from "./authen/RegisterDoctor.jsx";
import DoctorDashboard from "./doctordashboard/dashboard.jsx";

import doctorsImg from "./assets/doc.png";

import Dentists from "./specialties/Dentistry";
import Cardiology from "./specialties/cardio";
import Ophthalmology from "./specialties/ophtalmo";
import Dermatology from "./specialties/Dermatology";
import Pediatrics from "./specialties/Pediatrics";

import Header from "./header";

import heart from "./assets/heart.jpg";
import brain from "./assets/brain.png";
import lungs from "./assets/lungs.png";
import bone from "./assets/bone.png";
import skin from "./assets/skin.png";
import baby from "./assets/baby.png";

/* ✅ Cardio video */
import cardioVideo from "./assets/videos/cardio.mp4";

// ======= SPECIALTIES SECTION =======
function Specialties() {
  const navigate = useNavigate();

  return (
    <section className="specialties-section">
      <h2 className="specialties-title">Our Specialties</h2>
      <p className="specialties-subtitle">
        Explore our wide range of medical specialties. Click on one to see our specialist doctors.
      </p>

      <div className="specialties-container">
        <SpecialtyCard title="Cardiology" img={heart} route="/cardio" />
        <SpecialtyCard title="Dentists" img={brain} route="/dentists" />
        <SpecialtyCard title="Ophthalmology" img={bone} route="/ophthalmology" />
        <SpecialtyCard title="Dermatology" img={skin} route="/dermatology" />
        <SpecialtyCard title="Pediatrics" img={baby} route="/pediatrics" />
      </div>
    </section>
  );
}


/* ===== Default Specialty Card (unchanged) ===== */
function SpecialtyCard({ title, img, route }) {
  const navigate = useNavigate();

  return (
    <div
      className="specialty-card"
      style={{ backgroundImage: `url(${img})` }}
      onClick={() => navigate(route)}
      role="button"
      aria-label={title}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") navigate(route); }}
    >
      <div className="specialty-overlay">
        <h4>{title}</h4>
      </div>
    </div>
  );
}


// ======= SEARCH BAR COMPONENT =======
function SearchBar() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      let url = `http://localhost:5000/doctors?`;
      if (name) url += `name_like=${name}&`;
      if (location) url += `location_like=${location}&`;

      const response = await axios.get(url);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="material-symbols-outlined">location_on</span>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="search-results">
        {results.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <h4>{doctor.name}</h4>
            <p>
              {doctor.specialty} — {doctor.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======= HOME PAGE CONTENT =======
function AppContent() {
  return (
    <div className="app">
      <Header />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Connecting you to trusted doctors</h1>
            <h3>anytime, anywhere!</h3>
            <p>
              HealthConnect helps you reach verified medical professionals,
              explore their specialties, and access personalized healthcare
              services from the comfort of your home.
            </p>
          </div>

          <div className="hero-image">
            <img src={doctorsImg} alt="Doctors" />
          </div>
        </div>
      </section>
      {/* NEW WAVE DIVIDER */} <div className="custom-shape-divider-bottom"> <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" > <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" ></path> </svg> </div>

      <SearchBar />
      <Specialties />
    </div>
  );
}

// ======= ROOT APP WITH ROUTING =======
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-doctor" element={<LoginDoctor />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/dentists" element={<Dentists />} />
        <Route path="/cardio" element={<Cardiology />} />
        <Route path="/dermatology" element={<Dermatology />} />
        <Route path="/pediatrics" element={<Pediatrics />} />
        <Route path="/ophthalmology" element={<Ophthalmology />} />
      </Routes>
    </Router>
  );
}
