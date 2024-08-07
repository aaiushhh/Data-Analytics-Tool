# Data Analytics Tool

A comprehensive data analytics tool providing functionalities for data manipulation, visualization, and transformation.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Docker Setup](#docker-setup)
  - [Angular Frontend Setup](#angular-frontend-setup)
  - [Flask Backend Setup](#flask-backend-setup)
  - [Node.js Authentication Server Setup](#nodejs-authentication-server-setup)
- [Usage Instructions](#usage-instructions)
- [Contact](#contact)

## Features

- Upload and manage CSV files
- Perform data transformations including sorting, filtering, grouping, and aggregation
- Visualize data using Syncfusion EJ2 charts
- User authentication and profile management

## Technologies Used

- **Frontend**: Angular, Syncfusion EJ2 Charts
- **Backend**: Flask for data manipulation
- **Authentication**: Node.js with Express and MongoDB
- **Containerization**: Docker
- **Hosting**: Render

## Prerequisites

- Docker
- Node.js
- Angular CLI
- Python

## Setup Instructions
## Docker Setup
Build and run the Docker containers for the entire application:

docker-compose up --build

## Angular Frontend Setup
If you prefer to run the Angular frontend separately, follow these steps:
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Start the Angular development server:
ng serve

## Flask Backend Setup
If you prefer to run the Flask backend separately, follow these steps:
Navigate to the backend directory:
cd backend

Create a virtual environment:
python -m venv venv

Activate the virtual environment:
On Windows:
venv\Scripts\activate
On macOS/Linux:
source venv/bin/activate

Install dependencies:
pip install -r requirements.txt

Start the Flask server:
flask run

## Node.js Authentication Server Setup
If you prefer to run the Node.js authentication server separately, follow these steps:
Navigate to the Node.js server directory:
cd auth-server

Install dependencies:
npm install

Start the Node.js server:
node server.js

### Usage Instructions
Open the Angular frontend in your browser at http://localhost:4200.
Use the login/signup feature to authenticate.
Upload a CSV file using the drag-and-drop feature.
Perform data transformations and visualizations using the provided tools.
View and manage your profile.

## Contact
For any queries or issues, please contact eyushhonhisway@gmail.com.
```bash
git clone https://github.com/eyu.shh/data-analytics-tool.git
cd data-analytics-tool
