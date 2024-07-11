FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
# Upgrade pip to the latest version
RUN pip install --no-cache-dir --upgrade pip

# Install dependencies with an increased timeout
RUN pip install --no-cache-dir -r requirements.txt --default-timeout=100

COPY . .

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]
