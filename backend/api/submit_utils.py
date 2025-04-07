from flask import Flask, request, jsonify
import mysql.connector.pooling
import os
from functools import wraps

# Initialize Flask app
app = Flask(__name__)

# Database configuration
DB_CONFIG = {
    'user': 'admin',
    'password': 'admin5683!',
    'host': os.getenv('DATABASE_HOST', 'mysql-container'),
    'port': '3306',
    'database': 'quran_info',
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}

SETTINGS = {
    'table_name': 'isms',
    'quran_table': 'quran',
    'corpus_table': 'morphology'
}

# Create a connection pool
connection_pool = mysql.connector.pooling.MySQLConnectionPool(**DB_CONFIG)

# Decorator for database connection handling
def with_db_connection(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        connection = connection_pool.get_connection()
        cursor = connection.cursor(dictionary=True)  # Use dictionary cursor for named columns
        try:
            result = f(cursor, connection, *args, **kwargs)
            return result
        except mysql.connector.Error as err:
            connection.rollback()
            return jsonify({'error': f"Database error: {str(err)}"}), 500
        except Exception as e:
            connection.rollback()
            return jsonify({'error': f"Unexpected error: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()
    return wrapper

# Helper function for request validation
def validate_request_data(data, required_fields, field_types=None):
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return {'error': 'Missing required fields', 'missing_fields': missing_fields}
    
    if field_types:
        type_errors = []
        for field, expected_type in field_types.items():
            if field in data and not isinstance(data[field], expected_type):
                type_errors.append(f"{field} should be {expected_type.__name__}")
        if type_errors:
            return {'error': 'Type validation failed', 'invalid_fields': type_errors}
    
    return None

@app.route('/submit', methods=['POST'])
@with_db_connection
def submit_data(cursor, connection):
    data = request.json
    
    # Validate request
    required_fields = ['chapter', 'verse', 'word_num', 'token', 'word', 'tag', 
                      'status', 'gender', 'number', 'type', 'lem']
    field_types = {
        'chapter': int, 'verse': int, 'word_num': int, 'token': int
    }
    
    if validation := validate_request_data(data, required_fields, field_types):
        return jsonify(validation), 400

    # Prepare data for insertion
    insert_data = {
        'chapter': data['chapter'],
        'verse': data['verse'],
        'word_num': data['word_num'],
        'token': data['token'],
        'word': data['word'],
        'tag': data['tag'],
        'status': data['status'],
        'gender': data['gender'],
        'number': data['number'],
        'type': data['type'],
        'root': data.get('root'),
        'lem': data['lem'],
        'heaviness': data.get('heaviness'),
        'flexibility': data.get('flexibility')
    }

    # Build and execute query
    columns = ', '.join(insert_data.keys())
    placeholders = ', '.join(['%s'] * len(insert_data))
    query = f"INSERT INTO {SETTINGS['table_name']} ({columns}) VALUES ({placeholders})"
    
    cursor.execute(query, tuple(insert_data.values()))
    connection.commit()
    
    return jsonify({'message': 'Data inserted successfully'}), 201

@app.route('/delete_all', methods=['DELETE'])
@with_db_connection
def delete_all_data(cursor, connection):
    cursor.execute(f"DELETE FROM {SETTINGS['table_name']}")
    connection.commit()
    return jsonify({'message': 'All data deleted successfully'}), 200

@app.route('/delete_row', methods=['DELETE'])
@with_db_connection
def delete_row(cursor, connection):
    if not request.json or 'word' not in request.json:
        return jsonify({'error': 'Missing word parameter'}), 400
    
    word = request.json['word']
    cursor.execute(f"DELETE FROM {SETTINGS['table_name']} WHERE word = %s", (word,))
    connection.commit()
    
    if cursor.rowcount > 0:
        return jsonify({'message': f'Row with word "{word}" deleted successfully'}), 200
    return jsonify({'message': f'No row found with word "{word}"'}), 404

@app.route('/print_table', methods=['GET'])
@with_db_connection
def print_table(cursor, connection):
    cursor.execute(f"SELECT * FROM {SETTINGS['table_name']}")
    rows = cursor.fetchall()
    return jsonify(rows), 200

@app.route('/get_chapter', methods=['GET'])
@with_db_connection
def get_chapter(cursor, connection):
    if not request.json or 'chapter' not in request.json:
        return jsonify({'error': 'Missing chapter parameter'}), 400
    
    chapter = request.json['chapter']
    cursor.execute(
        f"SELECT * FROM {SETTINGS['quran_table']} WHERE sura = %s", 
        (chapter,)
    )
    verses = [row['aya'] for row in cursor.fetchall()]
    return jsonify({'chapter': chapter, 'verses': verses}), 200

@app.route('/submit_corpus_data', methods=['POST'])
@with_db_connection
def submit_corpus_data(cursor, connection):
    data = request.json
    
    required_fields = ['chapter', 'verse', 'word_num', 'token', 'tag', 'info']
    field_types = {
        'chapter': int, 'verse': int, 'word_num': int, 'token': int
    }
    
    if validation := validate_request_data(data, required_fields, field_types):
        return jsonify(validation), 400

    insert_data = {
        'chapter': data['chapter'],
        'verse': data['verse'],
        'word_num': data['word_num'],
        'token': data['token'],
        'word': data.get('word', ''),
        'tag': data['tag'],
        'info': data['info']
    }

    columns = ', '.join(insert_data.keys())
    placeholders = ', '.join(['%s'] * len(insert_data))
    query = f"INSERT INTO {SETTINGS['corpus_table']} ({columns}) VALUES ({placeholders})"
    
    cursor.execute(query, tuple(insert_data.values()))
    connection.commit()
    return jsonify({'message': 'Data inserted successfully'}), 201

@app.route('/corpus_count_words_in_chapter', methods=['GET'])
@with_db_connection
def corpus_count_words_in_chapter(cursor, connection):
    if not request.json or 'chapter' not in request.json:
        return jsonify({'error': 'Missing chapter parameter'}), 400
    
    chapter = request.json['chapter']
    query = f"""
        SELECT verse, word_num, 
               GROUP_CONCAT(word ORDER BY token SEPARATOR '') AS combined_word
        FROM {SETTINGS['corpus_table']}
        WHERE chapter = %s
        GROUP BY verse, word_num
        ORDER BY verse, word_num;
    """
    cursor.execute(query, (chapter,))
    words = [row['combined_word'] for row in cursor.fetchall()]
    return jsonify(words), 200

@app.route('/add_page_info', methods=["POST"])
@with_db_connection
def add_page_info(cursor, connection):
    if not request.json or not isinstance(request.json, list):
        return jsonify({'error': 'Invalid page info format'}), 400
    
    page_info = request.json
    start_idx = 1 if not page_info[0] else 0
    total_pages = len(page_info) - start_idx
    
    for i in range(start_idx, len(page_info)):
        if not page_info[i]:
            continue
            
        page_num = i - start_idx + 1
        current_sura, current_aya = page_info[i]
        
        if i < len(page_info) - 1 and page_info[i+1]:
            next_sura, next_aya = page_info[i+1]
            
            if current_sura == next_sura:
                query = f"""
                    UPDATE {SETTINGS['quran_table']}
                    SET page_num = %s
                    WHERE sura = %s AND aya >= %s AND aya < %s
                """
                params = (page_num, current_sura, current_aya, next_aya)
            else:
                query = f"""
                    UPDATE {SETTINGS['quran_table']}
                    SET page_num = %s
                    WHERE 
                        (sura = %s AND aya >= %s) OR
                        (sura > %s AND sura < %s) OR
                        (sura = %s AND aya < %s)
                """
                params = (page_num, current_sura, current_aya,
                         current_sura, next_sura, next_sura, next_aya)
        else:
            query = f"""
                UPDATE {SETTINGS['quran_table']}
                SET page_num = %s
                WHERE sura = %s AND aya >= %s
            """
            params = (page_num, current_sura, current_aya)
        
        cursor.execute(query, params)
    
    connection.commit()
    return jsonify({
        'status': 'success',
        'pages_processed': total_pages,
        'first_page': page_info[start_idx],
        'last_page': page_info[-1]
    }), 200

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Test endpoint is working'}), 200

if __name__ == '__main__':
    app.run(debug=True)