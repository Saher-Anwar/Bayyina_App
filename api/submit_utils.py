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

settings = {
    'table_name': 'corpus_isms',
    'quran_table': 'quran_text',
    'corpus_table': 'corpus'
}

# Create a connection pool
connection_pool = mysql.connector.pooling.MySQLConnectionPool(**db_config)

@app.route('/submit', methods=['POST'])
def submit_data():
    # Get JSON data from the request
    data = request.json

    # Validate required fields
    required_fields = ['chapter', 'verse', 'character', 'token', 'word', 'tag', 'status', 'gender', 'number', 'type', 'root', 'lem']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    # Validate data types
    if not isinstance(data['chapter'], int) or not isinstance(data['verse'], int) or not isinstance(data['token'], int):
        return jsonify({'error': 'Fields chapter, verse, and token must be integers'}), 400

    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        # Insert data into the `isms` table, handle optional fields
        insert_query = f"""
        INSERT INTO {settings['table_name']} (
            chapter, verse, `character`, token, word, tag, `status`, gender, `number`, `type`, root, lem, heaviness, flexibility
        ) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        # Set `heaviness` and `flexibility` to NULL if not provided in data
        heaviness = data.get('heaviness', None)
        flexibility = data.get('flexibility', None)

        cursor.execute(insert_query, (
            data['chapter'],
            data['verse'],
            data['character'],
            data['token'],
            data['word'],
            data['tag'],
            data['status'],
            data['gender'],
            data['number'],
            data['type'],
            data['root'],
            data['lem'],
            heaviness,
            flexibility
        ))
        
        connection.commit()
        return jsonify({'message': 'Data inserted successfully'}), 201

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    except Exception as e:
        # Catch any other exceptions and log them
        return jsonify({'error': str(e)}), 500

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
        delete_query = f"DELETE FROM {settings['table_name']}"
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
        word = request.json.get('word')

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
        select_query = f"SELECT * FROM {settings['table_name']}"
        cursor.execute(select_query)
        rows = cursor.fetchall()

        # Convert rows to a list of dictionaries
        result = []
        for row in rows:
            result.append({
                'chapter': row[0],
                'verse': row[1],
                'character': row[2],
                'token': row[3],
                'word': row[4],
                'tag': row[5],
                'status': row[6],
                'gender': row[7],
                'number': row[8],
                'type': row[9],
                'heaviness': row[10],
                'flexibility': row[11],
                'root': row[12],
                'lem': row[13]
            })

        return jsonify(result), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()

@app.route('/get_chapter', methods=['GET'])
def get_chapter():
    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        # Get the chapter from the request
        chapter = request.json['chapter']

        # Fetch all rows from the `isms` table for the specified chapter
        select_query = f"SELECT * FROM {settings['quran_table']} WHERE sura = %s"
        cursor.execute(select_query, (chapter, ))

        # Fetch all verses
        verses = [row[3] for row in cursor.fetchall()]

        return jsonify({'chapter': chapter, 'verses': verses}), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()

@app.route('/submit_corpus_data', methods=['POST'])
def submit_corpus_data():
    # Get JSON data from the request
    data = request.json

    # Validate required fields
    required_fields = ['chapter', 'verse', 'word_num', 'token', 'tag', 'info']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    # Validate data types
    if not isinstance(data['chapter'], int) or not isinstance(data['verse'], int) or not isinstance(data['word_num'], int) or not isinstance(data['token'], int):
        return jsonify({'error': 'Fields chapter and verse must be integers'}), 400
    
    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        # Insert data into the `corpus` table
        insert_query = f"""
        INSERT INTO {settings['corpus_table']} (
            chapter, verse, word_num, token, word, tag, info
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(insert_query, (
            data['chapter'],
            data['verse'],
            data['word_num'],
            data['token'],
            data.get('word', ''),
            data['tag'],
            data['info']
        ))

        connection.commit()
        return jsonify({'message': 'Data inserted successfully'}), 201

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()

@app.route('/corpus_count_words_in_chapter', methods=['GET'])
def corpus_count_words_in_chapter():
    # Get a connection from the pool
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    chapter = request.json['chapter']
    try:
        # Fetch all rows from the `corpus` table
        select_query = f"SELECT COUNT(*) FROM {settings['corpus_table']} WHERE chapter = %s AND token = 1"
        cursor.execute(select_query, (chapter,))
        res = cursor.fetchone()[0]

        return jsonify({"count": res}), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        # Release the connection back to the pool
        cursor.close()
        connection.close()

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Test endpoint is working'}), 200