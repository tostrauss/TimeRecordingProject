from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# Mock Data
mock_data = [
    {"user_id": 1, "date": "2024-12-18", "hours_worked": 8},
    {"user_id": 1, "date": "2024-12-17", "hours_worked": 7.5},
    {"user_id": 2, "date": "2024-12-16", "hours_worked": 6},
    {"user_id": 3, "date": "2024-12-16", "hours_worked": 9},
    {"user_id": 1, "date": "2024-12-15", "hours_worked": 8},
    {"user_id": 2, "date": "2024-12-14", "hours_worked": 7},
    {"user_id": 3, "date": "2024-12-14", "hours_worked": 8},
    {"user_id": 2, "date": "2024-12-14", "hours_worked": 6.5},
]

@app.route('/')
def index():
    return "Flask server is running."

@app.route('/get_records', methods=['GET'])
def get_records():
    start_date = request.args.get("start_date", (datetime.now() - timedelta(days=7)).date().isoformat())
    end_date = request.args.get("end_date", datetime.now().date().isoformat())
    user_id = request.args.get("user_id", None)

    print(f"Start Date: {start_date}, End Date: {end_date}, User ID: {user_id}")

    filtered_data = [
        record for record in mock_data
        if (not user_id or record["user_id"] == int(user_id)) and
        start_date <= record["date"] <= end_date
    ]
    print(f"Filtered Data: {filtered_data}")

    return jsonify(filtered_data)

@app.route('/add_record', methods=['POST', 'OPTIONS'])
def add_record():
    data = request.get_json()
    if not data or not data.get("user_id") or not data.get("date") or not data.get("hours_worked"):
        return jsonify({"error": "Invalid data"}), 400

    new_record = {
        "user_id": int(data["user_id"]),
        "date": data["date"],
        "hours_worked": float(data["hours_worked"]),
    }
    mock_data.append(new_record)

    print(f"Record added: {new_record}")
    return jsonify({"message": "Record added successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)

