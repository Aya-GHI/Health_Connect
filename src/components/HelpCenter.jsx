import React from "react";
import "./HelpCenter.css";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

const HelpCenter = () => {
  return (
    <div className="help-wrapper">

      {/* HEADER */}
      <div className="help-header">

        {/* LOGO (same site logo) */}
        <Link to="/" className="logo-link">
          <img src={logo} alt="HealthConnect Logo" className="help-logo-img" />
        </Link>

        <div className="help-header-text">
          <h1>HealthConnect Help Center</h1>
          <p>Find clear answers to your questions</p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="help-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-cards">
          <div className="faq-card">
            <h3>I forgot my password</h3>
            <p>
              Click on “Forgot password” on the login page to reset your password
              securely.
            </p>
          </div>

          <div className="faq-card">
            <h3>How can I book an appointment?</h3>
            <p>
              Search for a doctor, choose an available date and confirm your
              appointment online.
            </p>
          </div>

          <div className="faq-card">
            <h3>My doctor is not available</h3>
            <p>
              Some doctors do not offer online booking or may have no available
              slots at the moment.
            </p>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="help-section">
        <h2>Browse Help Topics</h2>

        <div className="help-cards">
          <div className="help-card">
            <h3>My Account</h3>
            <p>Create an account, log in, and update your personal information.</p>
          </div>

          <div className="help-card">
            <h3>My Appointments</h3>
            <p>View, cancel, or reschedule your medical appointments.</p>
          </div>

          <div className="help-card">
            <h3>My Family Members</h3>
            <p>Manage appointments for your family members from your account.</p>
          </div>

          <div className="help-card">
            <h3>Privacy & Security</h3>
            <p>Your personal and medical data are protected and confidential.</p>
          </div>

          <div className="help-card">
            <h3>For Doctors</h3>
            <p>Manage availability, appointments, and patient schedules.</p>
          </div>

          <div className="help-card">
            <h3>Customer Support</h3>
            <p>Need help? Contact our support team anytime.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HelpCenter;
