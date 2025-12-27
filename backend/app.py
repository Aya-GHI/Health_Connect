from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import hashlib

app = Flask(__name__)
CORS(app)

# 🔗 MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Kjkszpj15",
    database="health_connect"
)

cursor = db.cursor(dictionary=True)

# 🔐 hash password
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ================= TEST ROUTE =================
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "backend working"}), 200


# ================= REGISTER =================
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        print("DATA RECEIVED:", data)

        hashed_password = hash_password(data["password"])

        sql = """
        INSERT INTO users (
            first_name, last_name, email, phone,
            date_of_birth, gender, password
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s)
        """

        cursor.execute(sql, (
            data["firstName"],
            data["lastName"],
            data["email"],
            data["phone"],
            data["dateOfBirth"],  # لازم YYYY-MM-DD
            data["gender"],
            hashed_password
        ))

        db.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except mysql.connector.Error as err:
        print("MYSQL ERROR:", err)
        return jsonify({"message": str(err)}), 500

    except Exception as e:
        print("GENERAL ERROR:", e)
        return jsonify({"message": str(e)}), 500


# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        hashed_password = hash_password(data["password"])

        cursor.execute(
            "SELECT id, first_name, last_name, email FROM users WHERE email=%s AND password=%s",
            (data["email"], hashed_password)
        )

        user = cursor.fetchone()

        if user:
            return jsonify(user), 200

        return jsonify({"message": "Invalid email or password"}), 401

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
