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
- **TypeScript**
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


