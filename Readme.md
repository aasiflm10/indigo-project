# Aasif Ali's Submission for Hack to Hire 2024

# Project working Video Link  https://youtu.be/m-yMs9LB4FE
## Project Structure

This project consists of three main folders:

1. **backend**: Contains all the routes for creating a flight, updating the flight, fetching flight details, and sending notifications to the user.
2. **frontend**: The user frontend that can fetch flight details and receive notifications.
3. **frontendAdmin**: The admin frontend which has the rights to create or update flights.

## Tech Stack

### Backend
- **Node.js**
- **JavaScript**
- **Express**
- **Firebase Cloud Messaging**: For sending in-app notifications.
- **Twilio**: For sending SMS.
- **Nodemailer**: For sending emails.
- **PostgreSQL**: Database.
- **Prisma**: ORM.

### Frontend
- **React**
- **Tailwind CSS**

## Backend Configuration

### Environment Variables
The `.env` file and `serviceAccountKey.json` are not uploaded to GitHub. 

The `.env` file should include the following variables:
- `DATABASE_URL`: Your PostgreSQL Database URL.
- `TWILIO_AUTH_SID`: Your Twilio Auth SID.
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token.
- `TWILIO_PHONE_NUMBER`: Your Twilio Phone Number.

### Firebase Service Account Key
The `serviceAccountKey.json` file can be obtained from the Firebase console. This file is required for Firebase Admin SDK to authenticate and send notifications.

### Setting Up project
1. Clone the repository.
2. Navigate to the `backend` folder.
3. Create a `.env` file in the `backend` folder with the required environment variables.
4. Obtain the `serviceAccountKey.json` from Firebase console and place it in the `backend` folder.
5. Install dependencies:
   ```bash
   
   cd backend
   npm install
   node index.js

    cd ..
    cd frontend
    npm install
    npm run dev

    cd ..
    cd frontendAdmin
    npm install
    npm run dev

# Case Study Solution

## Description
Develop a system to provide real-time flight status updates and notifications to passengers.

## Features
- **Real-time Updates**: Display current flight status (delays, cancellations, gate changes).
- **Push Notifications**: Send notifications for flight status changes via SMS, email, or app notifications.
- **Create and Update Flight API**: Pull data from  databases for accurate information and update flights.

## Technologies Used
- **Frontend**: HTML, CSS, React.js, Tailwindcss.
- **Backend**: Node.js, TypeScript, Express.
- **Database**: PostgreSQL, Prisma.
- **Notifications**: Firebase Cloud Messaging for in-app notifications, Twilio for SMS, Nodemailer for emails.

## Implementation Details

### Backend
- **Real-time Updates**: The backend provides endpoints to create, update, and fetch flight details. Real-time status updates are handled through these endpoints.
- **Push Notifications**: Notifications are sent using Firebase Cloud Messaging for in-app notifications, Twilio for SMS, and Nodemailer for email notifications. Kafka or RabbitMQ can be integrated for message brokering to handle high-throughput notifications, but this project uses Firebase Cloud Messaging for simplicity.
- **Integration with Airport Systems**: Developed backend API to create or update the flight and fetch real time flight details from the backend.

### Frontend
- **User Frontend**: Developed using React.js and styled with Tailwind CSS. It fetches flight details and displays real-time updates. It also receives notifications through Firebase Cloud Messaging.
- **Admin Frontend**: Also developed using React.js and styled with Tailwind CSS. It provides functionalities to create and update flight details. When you update the flight details you can send notification to the user via SMS, EMail or InApp notifications.

## Summary
This project demonstrates a full-stack application with backend routes for managing flight data and sending notifications, along with user and admin frontends built with React and styled with Tailwind CSS. The backend leverages Firebase Cloud Messaging for in-app notifications, Twilio for SMS, and Nodemailer for email notifications, with PostgreSQL and Prisma managing the database.

Thank you for reviewing my submission for Hack to Hire 2024!

