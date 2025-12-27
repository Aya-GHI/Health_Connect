from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import hashlib

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ================= DATABASE =================
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Kjkszpj15",
    database="health_connect"
)

cursor = db.cursor(dictionary=True)

# ================= UTILS =================
def hash_password(password):
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

# ================= TEST =================
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "backend working"}), 200


# ================= REGISTER =================
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        print("REGISTER DATA:", data)

        if not data:
            return jsonify({"message": "No data received"}), 400

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
            data["dateOfBirth"],  # YYYY-MM-DD
            data["gender"],
            hashed_password
        ))

        db.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except mysql.connector.Error as err:
        print("MYSQL ERROR:", err)
        return jsonify({"message": "Database error"}), 500

    except Exception as e:
        print("GENERAL ERROR:", e)
        return jsonify({"message": str(e)}), 500


# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print("LOGIN DATA:", data)

        if not data:
            return jsonify({"message": "No data received"}), 400

        hashed_password = hash_password(data["password"])

        cursor.execute(
            """
            SELECT id, first_name, last_name, email
            FROM users
            WHERE email=%s AND password=%s
            """,
            (data["email"], hashed_password)
        )

        user = cursor.fetchone()

        if user:
            return jsonify({
                "success": True,
                "user": user
            }), 200

        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"message": str(e)}), 500


# ================= RUN =================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
