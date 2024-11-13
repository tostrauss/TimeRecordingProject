from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import sqlite3
from datetime import timedelta
import os
import dotenv
import logging

dotenv.load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', os.urandom(24))
app.permanent_session_lifetime = timedelta(days=1)
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_COOKIE_SECURE'] = True  # Use HTTPS in production
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

logging.basicConfig(level=logging.INFO)

def get_db_connection():
    return sqlite3.connect('time_recording.db')

# Initialize the SQLite database with user and record tables
def init_db():
    with get_db_connection() as conn:
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL
                    )''')
        c.execute('''CREATE TABLE IF NOT EXISTS records (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        task_details TEXT NOT NULL,
                        hours_worked REAL NOT NULL,
                        date TEXT NOT NULL,
                        FOREIGN KEY (user_id) REFERENCES users(id)
                    )''')
        conn.commit()

init_db()

@app.route('/')
def home_page():
    return redirect(url_for('login_page'))

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'GET':
        return render_template('login.html')

    if request.method == 'POST':
        data = request.json
        username = data['username']
        password = data['password']

        try:
            with get_db_connection() as conn:
                c = conn.cursor()
                c.execute("SELECT * FROM users WHERE username = ?", (username,))
                user = c.fetchone()

                if user and bcrypt.check_password_hash(user[2], password):
                    session.permanent = True
                    session['user_id'] = user[0]
                    session['username'] = username
                    logging.info(f"User logged in with user_id: {session['user_id']}")
                    return jsonify({"message": "Login successful", "redirect": "/time-recording"}), 200
                else:
                    logging.warning("Invalid login attempt")
                    return jsonify({"error": "Invalid username or password"}), 401
        except Exception as e:
            logging.error(f"Error during login: {e}")
            return jsonify({"error": "An error occurred during login"}), 500

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']

    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("SELECT * FROM users WHERE username = ?", (username,))
            user = c.fetchone()

            if user:
                logging.warning("User registration attempted with an existing username")
                return jsonify({"error": "User already exists"}), 409

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
            conn.commit()
            logging.info("User registered successfully")
            return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        logging.error(f"Error during registration: {e}")
        return jsonify({"error": "An error occurred during registration"}), 500

@app.route('/time-recording')
def time_recording_page():
    if 'user_id' not in session:
        logging.warning("Unauthorized access attempt to time recording page")
        return redirect(url_for('login_page'))
    
    try:
        return render_template('time-recording.html')
    except Exception as e:
        logging.error(f"Error rendering time recording page: {e}")
        return "An error occurred while loading the page", 500

@app.route('/add_record', methods=['POST'])
def add_record():
    if 'user_id' not in session:
        logging.warning("Unauthorized access attempt to add a record")
        return jsonify({"error": "Unauthorized"}), 401

    try:
        data = request.json
        user_id = session['user_id']
        task_details = data['task_details']
        hours_worked = data['hours_worked']
        date = data['date']

        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("INSERT INTO records (user_id, task_details, hours_worked, date) VALUES (?, ?, ?, ?)",
                      (user_id, task_details, hours_worked, date))
            conn.commit()
        logging.info(f"Record added successfully for user_id: {user_id}")
        return jsonify({"message": "Record added successfully"}), 201
    except Exception as e:
        logging.error(f"Error adding record: {e}")
        return jsonify({"error": "An error occurred while adding the record"}), 500

@app.route('/get_records', methods=['GET'])
def get_records():
    if 'user_id' not in session:
        logging.warning("Unauthorized access attempt to get records")
        return jsonify({"error": "Unauthorized"}), 401

    try:
        user_id = session['user_id']
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("SELECT task_details, hours_worked, date FROM records WHERE user_id = ?", (user_id,))
            records = c.fetchall()
        logging.info(f"Records retrieved successfully for user_id: {user_id}")
        return jsonify([{
            "task_details": record[0],
            "hours_worked": record[1],
            "date": record[2]
        } for record in records])
    except Exception as e:
        logging.error(f"Error retrieving records: {e}")
        return jsonify({"error": "An error occurred while retrieving records"}), 500
    
@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("SELECT id, username FROM users")
            users = c.fetchall()
            return jsonify([{"id": user[0], "username": user[1]} for user in users])
    except Exception as e:
        logging.error(f"Error retrieving users: {e}")
        return jsonify({"error": "An error occurred while retrieving users"}), 500

    
@app.route('/graph')
def graph_page():
    if 'user_id' not in session:
        logging.warning("Unauthorized access attempt to graph page")
        return redirect(url_for('login_page'))
    
    try:
        return render_template('graph.html')
    except Exception as e:
        logging.error(f"Error rendering graph page: {e}")
        return "An error occurred while loading the page", 500


@app.route('/logout')
def logout():
    try:
        session.clear()
        logging.info("User logged out successfully")
        return redirect(url_for('login_page'))
    except Exception as e:
        logging.error(f"Error during logout: {e}")
        return jsonify({"error": "An error occurred during logout"}), 500

if __name__ == '__main__':
    app.run(debug=True)




