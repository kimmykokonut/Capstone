# Set the base image to Python 3.11.7
FROM python:3.11.7

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy the remaining source code
COPY . .

# Expose the port Django will run on
EXPOSE 8000

# Run Django migrations and start the server
CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
