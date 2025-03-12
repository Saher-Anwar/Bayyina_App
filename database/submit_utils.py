from flask import Flask, request, jsonify
import mysql.connector.pooling
import os

# Initialize Flask app
app = Flask(__name__)

# Database configuration
db_config = {
    'user': 'admin',          # MySQL username
    'password': 'admin5683!',  # MySQL password
    'host': os.getenv('DATABASE_HOST', 'mysql-container'),         # MySQL host (localhost)
    'port': '3306',              # MySQL port
    'database': 'quran_info',  # Database name
    'charset': 'utf8mb4',        # Character set for Arabic support
    'collation': 'utf8mb4_unicode_ci'  # Collation for Arabic support
}

# Create a connection pool
connection_pool = mysql.connector.pooling.MySQLConnectionPool(**db_config)

# Endpoint to submit data to the `isms` table
@app.route('/submit', methods=['POST'])
def submit_data():
    # Get JSON data from the request
    data = request.json

    # Validate required fields
    required_fields = ['word', 'case', 'heaviness', 'flexibility', 'number', 'gender', 'type']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        # Insert data into the `isms` table
        insert_query = """
        INSERT INTO isms (word, `case`, heaviness, flexibility, `number`, gender, `type`)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (
            data['word'],
            data['case'],
            data['heaviness'],
            data['flexibility'],
            data['number'],
            data['gender'],
            data['type']
        ))
        connection.commit()
        return jsonify({'message': 'Data inserted successfully'}), 201

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()