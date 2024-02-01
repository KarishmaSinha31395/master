**Overview**
This README provides an overview of the Todo application, detailing its features, functionalities, and instructions for setting up and using the application. The Todo application is built using Node.js for the backend(javascript), MongoDB for data storage, and React for the frontend. It incorporates basic API authentication and Auth0 authentication to enhance the security of the application. Unit tests using Chai and Mocha ensure the reliability of the implemented functionalities.

**Table of Contents**
Features
Tech Stack
Prerequisites
Setup
Usage
API Endpoints
Authentication
Unit Tests
Acknowledgments

**Features**
The Todo application is designed to manage tasks with deadlines and status. Key features include:
    Create tasks with deadlines and status.
    Retrieve task details.
    Update task information including deadline and status.
    Delete tasks.
    Basic API authentication.
    Auth0 authentication for application login.
    Responsive frontend built with React.
    
**Tech Stack**
**Backend:**
Node.js
Express.js
MongoDB

**Frontend:**
React
Axios for API requests

**Authentication:**
Auth0 for enhanced security
Basic API authentication

**Testing:**
Chai
Mocha
Axios for API requests


**Prerequisites**
Before setting up the application, make sure you have the following prerequisites installed:
Node.js
npm (Node Package Manager)
MongoDB
React
Setup
Backend Setup:

Clone the backend repository:
git clone <repository-url>
cd backend-main
npm install

Set up backend environment variables:
Create a .env file in the backend root directory and add the following variables:
PORT=5000
MONGO_URI=<mongo_db_uri>
BASIC_AUTH_USERNAME=<username>
BASIC_AUTH_PASSWORD=<password>
Frontend Setup:
cd frontend-main
npm install
Set up frontend environment variables:
Create a .env file in the frontend root directory and add the following variable:
VITE_AUTH_USERNAME=<username>
VITE_AUTH_PASSWORD=<password>

**Usage**
Start the backend server:
cd backend-main
npm run dev

Run the Frontend:
Open Another Terminal in the same IDE
cd frontend-main
npm run dev
Access the Application:
Open your browser and go to http://localhost:5173 to access the Todo application.

**API Endpoints**
POST /api/save: Create a new task.
GET /api/get Retrieve task details.
PUT /api/update/:id: Update task information.
DELETE /api/delete/:id: Delete a task.

**Authentication**
Basic API Authentication
To use basic API authentication, include the Authorization header in your requests with basic-auth and add the username and password 
**Auth0 Authentication**
To use Auth0 authentication, follow the login process by clicking the login button and will redirect to Auth0 website and willbe asked to sign up and then will be able to access the application

**Unit Tests**
The application includes unit tests using Chai, Mocha, and Axios for the backend.
Run the tests using the following command:
Open Another terminal 
cd backend-main
npm test
Note: The api server must run in another server parallely to run the unit test cases as unit test case use axios to call the api's 

**Acknowledgments**
Special thanks to the developers of Node.js, MongoDB, React, Auth0, Chai, and Mocha for their valuable tools and services.

Feel free to reach out for any issues or further assistance.

