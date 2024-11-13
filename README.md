TimeRecordingProject is a comprehensive web application designed to help users track work hours, clock in and out, and visualize their data in charts. The app integrates a database for storing user sessions, work records, and user notes. This project includes a fully functional frontend and backend, built with Flask, SQLite, HTML/CSS, and JavaScript.

Table of Contents
Features
Tech Stack
Setup and Installation
Project Structure
Usage Guide
Screenshots
License
Features
Frontend
User Authentication: Login and registration forms with validation and secure password handling.
Responsive Design: Fully responsive design to adapt to various screen sizes, built with standard HTML and CSS.
Time Recording Form: Input form for users to log task details, hours worked, and date.
Data Visualization: Interactive charts using Chart.js to display work hours over time.
Filters: Filter data by date and user to view specific work records.
Backend
Flask Framework: Python-based web server for handling HTTP requests and serving frontend templates.
User Management: User authentication with session handling for secure login and logout.
Data Storage: SQLite database to store user information, session data, and work records.
APIs: Backend routes for adding and retrieving work records and user data.
Error Handling: Comprehensive error handling and logging for smoother debugging.
Tech Stack
Frontend
HTML/CSS: Basic structure and styling for the web pages.
JavaScript: Used for client-side interactivity and form handling.
Chart.js: Library for rendering data charts.
Backend
Python (Flask): Backend framework for server-side logic and routing.
Flask-Bcrypt: For secure password hashing.
Flask-CORS: To handle cross-origin requests.
SQLite: Database for storing user data and work records.
Setup and Installation
Clone the Repository:

bash
Code kopieren
git clone https://github.com/tostrauss/TimeRecordingProject.git
cd TimeRecordingProject
Set Up a Virtual Environment:

bash
Code kopieren
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
Install Dependencies:

bash
Code kopieren
pip install -r requirements.txt
Set Up the Database:

Run the app.py file to initialize the database schema automatically.
Run the Application:

bash
Code kopieren
python app.py
Access the Application:

Open your web browser and go to http://127.0.0.1:5000.
Project Structure
sql
Code kopieren
TimeRecordingProject/
│
├── static/
│   ├── styles.css
│   └── login-styles.css
│
├── templates/
│   ├── login.html
│   ├── time-recording.html
│   └── graph.html
│
├── .env
├── app.py
├── requirements.txt
└── time_recording.db
Usage Guide
User Authentication
Register: New users can register by providing a unique username and password.
Login: Registered users can log in to access the time recording and graph visualization pages.
Time Recording
Add Work Hours: Users can log their work hours, task details, and date via a form on the time-recording.html page.
Submit and Redirect: Once a record is submitted, users are redirected to the graph page.
Data Visualization
Graph Display: Work records are visualized in an interactive line chart on graph.html, showing hours worked over time.
Filters:
Date Filter: Users can filter records by a specific date.
User Filter: Admins or users with access can filter data by different users to view their work records.
API Endpoints
/get_users: Returns a list of users for filtering purposes.
/get_records: Fetches work records for the logged-in user.
/add_record: Adds a new work record for the logged-in user.
