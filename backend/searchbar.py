# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

# ===== MOCK DATABASE =====
doctors = [
    # Pediatrics
    {
        "id": 1,
        "name": "Dr. Rihab Ben Othman",
        "specialty": "Pediatrician",
        "address": "Mayar Complex, El Mourouj 3",
        "nextAppointment": "Monday, 6 March 2026",
        "image": "pedia1.jpg"
    },
    {
        "id": 2,
        "name": "Dr. Elyes Lassoued",
        "specialty": "Pediatrician",
        "address": "Rose Med Center, Ben Arous",
        "nextAppointment": "Thursday, 15 September 2026",
        "image": "pedia2.jpg"
    },
    {
        "id": 3,
        "name": "Dr. Mohamed Chawki Gharbi",
        "specialty": "Pediatrician",
        "address": "Al Ahmadi Medical, El Mourouj 4",
        "nextAppointment": "Friday, 5 December 2026",
        "image": "pedia3.jpg"
    },

    # Ophthalmology
    {
        "id": 4,
        "name": "Prof. Imen Ammous",
        "specialty": "Optometrist",
        "address": "Ettaoufik Clinic, Tunis",
        "nextAppointment": "Tuesday, 9 June 2026",
        "image": "ophtalmo1.jpg"
    },
    {
        "id": 5,
        "name": "Dr. Sofiene Feki",
        "specialty": "Ophthalmologist",
        "address": "Érable Medical, Berges du Lac 2",
        "nextAppointment": "Wednesday, 18 June 2026",
        "image": "ophtalmo2.jpg"
    },
    {
        "id": 6,
        "name": "Dr. Hatem El Amri",
        "specialty": "Ophthalmologist",
        "address": "21 Env. Avenue, Sidi Hassine, Tunis",
        "nextAppointment": "Monday, 5 May 2026",
        "image": "ophtalmo3.jpg"
    },

    # Dermatology
    {
        "id": 7,
        "name": "Dr. Jihen Hicheri",
        "specialty": "Dermatologist",
        "address": "Iris Medical, Cité Ennasr 1",
        "nextAppointment": "Tuesday, 9 February 2026",
        "image": "dermato1.jpg"
    },
    {
        "id": 8,
        "name": "Dr. Sami Baker",
        "specialty": "Dermatologist",
        "address": "Avicenne Medical, El Manar 2",
        "nextAppointment": "Monday, 18 January 2026",
        "image": "dermato2.jpg"
    },
    {
        "id": 9,
        "name": "Dr. Yosra Jmour",
        "specialty": "Dermatologist",
        "address": "Polyclinique La Marsa",
        "nextAppointment": "Wednesday, 18 May 2026",
        "image": "dermato3.jpg"
    },

    # Dentistry
    {
        "id": 10,
        "name": "Dr. Helmi Jemli",
        "specialty": "Dental Surgeon",
        "address": "Mhamdia, Tunis",
        "nextAppointment": "Tuesday, 6 January 2026",
        "image": "dentist1.jpg"
    },
    {
        "id": 11,
        "name": "Dr. Cherifa Bahri",
        "specialty": "Dentist",
        "address": "Berges du Lac 2",
        "nextAppointment": "Monday, 12 January 2026",
        "image": "dentist2.jpg"
    },
    {
        "id": 12,
        "name": "Dr. Yassine Messaoudi",
        "specialty": "Dentist",
        "address": "L'Aouina, Tunis",
        "nextAppointment": "Thursday, 15 January 2026",
        "image": "dentist3.jpg"
    },

    # Cardiology
    {
        "id": 13,
        "name": "Dr. Fourat Zouari",
        "specialty": "Cardiologist",
        "address": "Aicha Medical, L'Aouina, Tunis",
        "nextAppointment": "Monday, 6 July 2026",
        "image": "cardio1.jpg"
    },
    {
        "id": 14,
        "name": "Dr. Syrine Ben Jeddou",
        "specialty": "Cardiologist",
        "address": "Violette Medical, Ennasr 2, Ariana",
        "nextAppointment": "Friday, 15 April 2026",
        "image": "cardio2.jpg"
    },
    {
        "id": 15,
        "name": "Dr. Tarek Ben Chedli",
        "specialty": "Cardiologist",
        "address": "Soukra Medical, La Soukra, Ariana",
        "nextAppointment": "Thursday, 5 May 2026",
        "image": "cardio3.jpg"
    },
]


# ===== API ENDPOINT =====
@app.route("/doctors", methods=["GET"])
def get_doctors():
    # Get query parameters
    name_filter = request.args.get("name_like", "").strip().lower()
    location_filter = request.args.get("location_like", "").strip().lower()

    # Filter doctors
    filtered = []
    for doc in doctors:
        name_ok = True
        location_ok = True

        if name_filter:
            name_ok = name_filter in doc.get("name", "").lower()

        if location_filter:
            location_ok = location_filter in doc.get("address", "").lower()

        if name_ok and location_ok:
            filtered.append(doc)

    return jsonify(filtered)

# ===== RUN SERVER =====
if __name__ == "__main__":
    app.run(debug=True, port=5000)
