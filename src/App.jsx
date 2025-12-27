import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import DoctorResults from "./components/DoctorResults.jsx"; // juste au-dessus de SearchBar


import Login from "./authen/Login.jsx";
import Register from "./authen/Register.jsx";
import LoginDoctor from "./authen/LoginDoctor.jsx";
import RegisterDoctor from "./authen/RegisterDoctor.jsx";
import DoctorDashboard from "./doctordashboard/dashboard.jsx";

import doctorsImg from "./assets/doctors/doc.png";

import Dentists from "./specialties/DentistsPage.jsx";
import Step2Reason from "./Appointbooking/Step2Reason.jsx";
import Step4Auth from "./Appointbooking/Step4Auth.jsx";
import BookingSuccess from "./Appointbooking/BookingSuccess.jsx";

//import hanine 
import Cardiologues from "./specialties/Cardiologues.jsx";
import Ophtalmologues from "./specialties/Ophtalmologues.jsx";
import Dermatologues from "./specialties/Dermatologues.jsx";
import Pediatres from "./specialties/Pediatres.jsx";

import Header from "./components/header.jsx";

import heartVideo from "./assets/videos/heart.mp4";
import eyesVideo from "./assets/videos/eyes.mp4";
import toothVideo from "./assets/videos/tooth.mp4";
import babyVideo from "./assets/videos/baby.mp4";
import skinVideo from "./assets/videos/skin.mp4";
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
        <div className="specialties-container">
        <SpecialtyCard video={heartVideo} route="/cardiologues" />
        <SpecialtyCard video={toothVideo} route="/dentists" />
        <SpecialtyCard video={eyesVideo} route="/ophtalmologues" />
        <SpecialtyCard video={skinVideo} route="/dermatologues" />
        <SpecialtyCard video={babyVideo} route="/pediatres" />
        </div>

      </div>
    </section>
  );
}

/* ===== Default Specialty Card (unchanged) ===== */
function SpecialtyCard({ video, route }) {
  const navigate = useNavigate();
  const vidRef = useRef(null);

  const handleEnter = () => {
    if (vidRef.current) {
      vidRef.current.currentTime = 0;
      vidRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    if (vidRef.current) {
      vidRef.current.pause();
      vidRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="specialty-card"
      onClick={() => navigate(route)}
      role="button"
      tabIndex={0}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onMouseLeave={handleLeave}
      onBlur={handleLeave}
    >
      <video
        ref={vidRef}
        src={video}
        muted
        playsInline
        preload="metadata"
      />
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
      const params = {};
      if (name) params.name_like = name;
      if (location) params.location_like = location;

      const response = await axios.get("http://127.0.0.1:5000/doctors", { params });
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <span className="material-symbols-outlined">search</span>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <span className="material-symbols-outlined">location_on</span>
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

    {results.length > 0 && (
      <div className="results-wrapper">
        <DoctorResults doctors={results} />
      </div>
    )}
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
      <div className="font-sans">

        <Router>
          <Routes>
        
            <Route path="/" element={<AppContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-doctor" element={<RegisterDoctor />} />
            <Route path="/login-doctor" element={<LoginDoctor />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            
            <Route path="/dentists" element={<Dentists />} />
            <Route path="/booking/reason" element={<Step2Reason />} />
            <Route path="/booking/auth" element={<Step4Auth />} />
            <Route path="/bookingsuccess" element={<BookingSuccess />} />
            <Route path="/cardiologues" element={<Cardiologues />} />
            <Route path="/ophtalmologues" element={<Ophtalmologues />} />
            <Route path="/dermatologues" element={<Dermatologues />} />
            <Route path="/pediatres" element={<Pediatres />} />
          
          </Routes>
        </Router>
      </div>
  );
}
