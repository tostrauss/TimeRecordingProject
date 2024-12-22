from flask import Flask, request, jsonify

app = Flask(__name__)

# Mock Data Storage
data_store = {
    "records": []
}

@app.route('/add_record', methods=['POST'])
def add_record():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    record = {
        "user_id": data.get("user_id"),
        "clock_in": data.get("clock_in"),
        "clock_out": data.get("clock_out"),
        "task_details": data.get("task_details"),
        "hours_worked": data.get("hours_worked"),
        "date": data.get("date"),
    }
    data_store["records"].append(record)
    return jsonify({"message": "Record added successfully", "record": record}), 201

@app.route('/get_records', methods=['GET'])
def get_records():
    return jsonify(data_store["records"]), 200

if __name__ == '__main__':
    app.run(debug=True)
