from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import hashlib
from datetime import datetime

app = Flask(__name__)

# ✅ CORS صح
CORS(app, resources={r"/*": {"origins": "*"}})

# ============ DATABASE ============
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Kjkszpj15",
    database="health_connect"
)

# ============ UTILS ============
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ============ TEST ============
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "backend working"}), 200


# ============ REGISTER ============
@app.route("/register", methods=["POST", "OPTIONS"])
def register():
    if request.method == "OPTIONS":
        return "", 200  # ✅ مهم برشا

    try:
        data = request.get_json()
        print("📥 REGISTER DATA:", data)

        datetime.strptime(data["dateOfBirth"], "%Y-%m-%d")

        cursor = db.cursor(buffered=True)

        cursor.execute("SELECT id FROM users WHERE email=%s", (data["email"],))
        if cursor.fetchone():
            return jsonify({"message": "Email already exists"}), 409

        cursor.execute("""
            INSERT INTO users
            (first_name, last_name, email, phone, date_of_birth, gender, password)
            VALUES (%s,%s,%s,%s,%s,%s,%s)
        """, (
            data["firstName"],
            data["lastName"],
            data["email"],
            data["phone"],
            data["dateOfBirth"],
            data["gender"],
            hash_password(data["password"])
        ))

        db.commit()
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        print("🔥 REGISTER ERROR:", e)
        return jsonify({"message": str(e)}), 500


# ============ LOGIN ============
@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return "", 200  # ✅ مهم

    try:
        data = request.get_json()
        print("📥 LOGIN DATA:", data)

        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        cursor = db.cursor(dictionary=True, buffered=True)
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"message": "Email not found"}), 401

        if user["password"] != hash_password(password):
            return jsonify({"message": "Wrong password"}), 401

        return jsonify({
            "success": True,
            "user": {
                "id": user["id"],
                "email": user["email"]
            }
        }), 200

    except Exception as e:
        print("🔥 LOGIN ERROR:", e)
        return jsonify({"message": str(e)}), 500


# ============ RUN ============
if __name__ == "__main__":
    app.run(debug=True)


