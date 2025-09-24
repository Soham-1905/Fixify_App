from flask import Flask, render_template, request, jsonify
import mysql.connector
from datetime import datetime

# --- Database Connection Configuration ---
db_config = {
    'host': 'localhost',
    'user': 'root',  # Replace with your MySQL username
    'password': '',  # Replace with your MySQL password
    'database': 'fixify_db'
}

def get_db_connection():
    """Establishes a connection to the database."""
    conn = mysql.connector.connect(**db_config)
    return conn

# --- Flask App Initialization ---
app = Flask(__name__)

# --- Routes ---
@app.route('/')
def home():
    """Renders the main page and fetches professionals from the DB."""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM professionals")
    professionals = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('index.html', professionals=professionals)

@app.route('/book', methods=['POST'])
def book_service():
    """Handles the booking form submission."""
    try:
        data = request.get_json()
        professional_id = data['professional_id']
        name = data['name']
        email = data['email']
        # Use today's date for simplicity in this prototype
        booking_date = datetime.today().strftime('%Y-%m-%d')

        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO bookings (professional_id, customer_name, customer_email, booking_date) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (professional_id, name, email, booking_date))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'success': True, 'message': 'Booking successful!'})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'message': 'An error occurred.'}), 500

# --- Main execution ---
if __name__ == '__main__':
    app.run(debug=True)