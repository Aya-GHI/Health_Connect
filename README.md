# Health_Connect 🏥

**Health_Connect** is a professional healthcare management platform designed to bridge the gap between patients and specialized medical professionals in Tunisia.

## 🚀 Project Overview
This platform provides a streamlined interface for patients to browse medical specialties, book appointments, and for doctors to manage their professional profiles and patient activities.

## ✨ Key Features
* **Dual Authentication**: Separate login and registration flows for both **Patients** and **Doctors**.
* **Medical Specialties**: Organized modules for various healthcare fields:
    * **Cardiology** 🫀 - Heart and vascular health.
    * **Dentistry** 🦷 - Dental care and oral hygiene.
    * **Dermatology** ✨ - Skin, hair, and nail treatments.
    * **Ophtalmology** 👁️ - Eye care and vision health.
    * **Pediatrics** 👶 - Specialized care for infants and children.
* **Doctor Dashboard**: A dedicated workspace for doctors to manage their schedules and patient data.
* **Responsive UI**: Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

### Frontend
* **Framework**: React.js (Vite)
* **Styling**: CSS3 / Modern UI Design
* **State Management**: React Hooks

### Backend & Database 🔙
* **Framework**: Flask (Python) 🐍
* **Main Entry**: `app.py`
* **Database**: MySQL 🐬
* **API Style**: RESTful API

## 📂 Project Structure
* `src/authen/`: Authentication components (Login/Register).
* `src/[Specialty Name]/`: Folders for each medical field (e.g., `src/Cardiology`).
* `app.py`: The main Flask application file handling routes and DB logic.
* `requirements.txt`: Python dependencies.

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Aya-GHI/Health_Connect.git](https://github.com/Aya-GHI/Health_Connect.git)

2. Frontend Setup:
# From the root directory
npm install
npm run dev

3. Backend (Flask) & MySQL Setup
   1.Create a MySQL database named health_connect.

   

    2. Install Python dependencies:
    pip install flask flask-mysql mysql-connector-python  # add any other libs you use

    3. Run the Flask server:
    python app.py
    python searchbar.py

    👥 Authors
Aya GHI - Developer - Aya-GHI

Hanine157 - Developer - Hanine157

Created with ❤️ for better healthcare accessibility.