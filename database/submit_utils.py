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

@app.route('/delete_all', methods=['DELETE'])
def delete_all_data():
    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        # Delete all rows from the `isms` table
        delete_query = "DELETE FROM isms"
        cursor.execute(delete_query)
        connection.commit()
        return jsonify({'message': 'All data deleted successfully'}), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()

@app.route('/delete_row', methods=['DELETE'])
def delete_row():
    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        # Get the word from the request
        word = request.args.get('word')

        # Delete the row with the specified word from the `isms` table
        delete_query = "DELETE FROM isms WHERE word = %s"
        cursor.execute(delete_query, (word,))
        connection.commit()

        if cursor.rowcount > 0:
            return jsonify({'message': f'Row with word "{word}" deleted successfully'}), 200
        else:
            return jsonify({'message': f'No row found with word "{word}"'}), 404

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()

@app.route('/print_table', methods=['GET'])
def print_table():
    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        # Fetch all rows from the `isms` table
        select_query = "SELECT * FROM isms"
        cursor.execute(select_query)
        rows = cursor.fetchall()

        # Convert rows to a list of dictionaries
        result = []
        for row in rows:
            result.append({
                'word': row[0],
                'case': row[1],
                'heaviness': row[2],
                'flexibility': row[3],
                'number': row[4],
                'gender': row[5],
                'type': row[6]
            })

        return jsonify(result), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()