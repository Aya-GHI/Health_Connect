import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../authen/styles/RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.surname.trim()) {
      newErrors.surname = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } 
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsLoading(true);

  // 🔁 mapping between React & Flask
  const payload = {
    firstName: formData.firstName,
    lastName: formData.surname,
    email: formData.email,
    phone: formData.phoneNumber,
    dateOfBirth: formData.dateOfBirth, // تأكدي الفورما DD/MM/YYYY ولا YYYY-MM-DD
    gender: formData.gender,
    password: formData.password,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Account created successfully ✅");
      navigate("/login");
    } else {
      setErrors({ submit: result.message || "Registration failed" });
    }
  } catch (error) {
    setErrors({ submit: "Backend not reachable ❌" });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Create Your Account</h2>
          
        </div>
        
        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                required
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="surname">Last Name</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Enter your last name"
                value={formData.surname}
                onChange={handleChange}
                className={errors.surname ? 'error' : ''}
                required
              />
              {errors.surname && (
                <span className="error-text">{errors.surname}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}
              required
            />
            {errors.phoneNumber && (
              <span className="error-text">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
  type="date"
  id="dateOfBirth"
  name="dateOfBirth"
  value={formData.dateOfBirth}
  onChange={handleChange}
  required
/>

              {errors.dateOfBirth && (
                <span className="error-text">{errors.dateOfBirth}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
                required
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <span className="error-text">{errors.gender}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                required
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                required
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="form-options">
            <label className="terms-agreement">
              <input type="checkbox" required />
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            className={`register-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                CREATING ACCOUNT...
              </>
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>
        </form>

        <div className="register-footer">
          <p className="login-link">
            Already have an account? <Link to="/login">LOG IN</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;