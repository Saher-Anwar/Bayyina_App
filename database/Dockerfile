FROM python:latest

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY requirements.txt .
COPY wait-for-it.sh .

RUN pip install --no-cache-dir -r requirements.txt

# set env variables
ENV FLASK_APP=submit_utils.py
ENV DATABASE_HOST=mysql-container

# Expose port 5000 for the Flask app
EXPOSE 5000

# Run the Flask app
CMD ["./wait-for-it.sh", "mysql:3306", "--", "flask", "--debug", "run", "--host=0.0.0.0", "--port=5000"]