# TimeRecordingProject

**TimeRecordingProject** is a comprehensive web application designed to help users track work hours, clock in and out, and visualize their data in charts. The app integrates a database for storing user sessions, work records, and user notes. This project includes a fully functional frontend and backend, built with Flask, SQLite, HTML/CSS, and JavaScript.

## Features

### Frontend
- **User Authentication**: Login and registration forms with validation and secure password handling.
- **Responsive Design**: Fully responsive design to adapt to various screen sizes, built with standard HTML and CSS.
- **Time Recording Form**: Input form for users to log task details, hours worked, and date.
- **Data Visualization**: Interactive charts using Chart.js to display work hours over time.
- **Filters**: Filter data by date and user to view specific work records.

### Backend
- **Flask Framework**: Python-based web server for handling HTTP requests and serving frontend templates.
- **User Management**: User authentication with session handling for secure login and logout.
- **Data Storage**: SQLite database to store user information, session data, and work records.
- **APIs**: Backend routes for adding and retrieving work records and user data.
- **Error Handling**: Comprehensive error handling and logging for smoother debugging.

## Tech Stack

### Frontend
- **HTML/CSS**: Basic structure and styling for the web pages.
- **JavaScript**: Used for client-side interactivity and form handling.
- **Chart.js**: Library for rendering data charts.

### Backend
- **Python (Flask)**: Backend framework for server-side logic and routing.
- **Flask-Bcrypt**: For secure password hashing.
- **Flask-CORS**: To handle cross-origin requests.
- **SQLite**: Database for storing user data and work records.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tostrauss/TimeRecordingProject.git
   cd TimeRecordingProject
