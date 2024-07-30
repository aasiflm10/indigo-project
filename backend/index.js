const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Adjust the path as necessary
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const twilio = require("twilio");
const cuid = require('cuid');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(express.json());

const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_AUTH_SID;
const accounttoken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, accounttoken);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Use body-parser middleware
// app.use(bodyParser.json());

app.get("/test-connection", async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ message: "Prisma connected successfully!" });
  } catch (e) {
    console.error("Prisma connection error:", e);
    res
      .status(500)
      .json({ error: "Prisma connection error", details: e.message });
  }
});

app.get("/allFlight", async (req, res) => {
  const allFlight = await prisma.flight.findMany();

  return res.json(allFlight);
});

// Add Flight Endpoint
app.post("/add-Data", async (req, res) => {
  try {
    const flight = await prisma.flight.create({
      data: {
        flightId: "6E2094",
        airline: "Indigo",
        status: "On Time",
        departureGate: "A12",
        arrivalGate: "B7",
        scheduledDeparture: new Date("2024-07-26T14:00:00Z"),
        scheduledArrival: new Date("2024-07-26T18:00:00Z"),
        actualDeparture: null,
        actualArrival: null,
      },
    });

    console.log("Flight created:", flight);
    return res.json(flight);
  } catch (e) {
    console.error("Error during flight creation:", e);
    res.status(403);
    return res.json({
      error: "Error while creating flight",
      details: e.message,
    });
  }
});

app.get('/flight/:id', async (req,res) => {
    
  const id = req.params.id

  try {
    const flight = await prisma.flight.findUnique({
      where: {
         id:id
      },select:{
        flightId: true,
        airline: true,
       status: true,
       departureGate: true,
       arrivalGate: true,
       scheduledDeparture: true,
       scheduledArrival: true,
       actualDeparture: true,
       actualArrival: true,
      }
    });
   if(flight){
      return res.json({flight})
   }else{
      res.status(400).json({error:'FLight not found'})
   }
  } catch (e) {
    console.error('Error fetching flight data:', e);
    res.status(500);
    return res.json({ error: 'Error fetching flight data', details: e.message });
  }
});


// Fetch Flight Endpoint
app.get("/find-my-flight/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log("Fetching flight with ID:", id);
  try {
    const flight = await prisma.flight.findFirst({
      where: {
        flightId: id,
      },
      select: {
        flightId: true,
        airline: true,
        status: true,
        departureGate: true,
        arrivalGate: true,
        scheduledDeparture: true,
        scheduledArrival: true,
        actualDeparture: true,
        actualArrival: true,
      },
    });

    if (flight) {
      console.log("Flight found:", flight);
      return res.json(flight);
    } else {
      console.warn("Flight not found with ID:", id);
      return res.status(400).json({ error: "Flight not found", details: null });
    }
  } catch (e) {
    console.error("Error fetching flight data:", e);
    res.status(500);
    return res.json({
      error: "Error fetching flight data",
      details: e.message,
    });
  }
});


app.post('/flight-check', async (req,res) => {

  const body = await req.body;

  try {
    const flight = await prisma.flight.findFirst({
      where: {
        flightId: body.flightId,
      },
    });

    if (!flight) {
      console.log('Flight not found for ID:', body.flightId);
      res.status(404);
      return res.json({ error: 'Flight not found' });
    }

    return res.json(flight);
  } catch (e) {
    console.error('Error fetching flight data:', e);
    res.status(500);
    return res.json({ error: 'Error fetching flight data', details: e.message });
  }
})

app.post('/flightUpdate', async (req, res) => {
  const { flightId, status, departureGate, arrivalGate, scheduledDeparture, scheduledArrival, actualDeparture, actualArrival } = req.body;

  try {
    // Update flight details in the database
    const updatedFlight = await prisma.flight.update({
      where: { flightId },
      data: {
        status,
        departureGate,
        arrivalGate,
        scheduledDeparture: new Date("2024-07-26T14:00:00Z"),
        scheduledArrival: new Date("2024-07-26T18:00:00Z"),
        actualDeparture : null,
        actualArrival : null,
      },
    });

    // Trigger the /notification endpoint
    const notificationResponse = await axios.post('http://localhost:3000/notification', {
      flightId,
      message: `Flight ${flightId} has been updated. New status: ${status}. Departure gate: ${departureGate}.`,
      method: "Email", // Or "SMS", depending on your requirement
      recipient: "example@example.com", // The recipient's email or phone number
    });

    res.json({ updatedFlight, notificationResponse: notificationResponse.data });
  } catch (e) {
    console.error("Error updating flight details:", e);
    res.status(500).json({ error: "Error updating flight details", details: e.message });
  }
});

app.post("/notification", async (req, res) => {
  try {
    const { flightId, message, method, recipient } = req.body;

    const flight = await prisma.flight.findFirst({
      where: { flightId },
    });

    console.log(flight);

    if (!flight) {
      return res.status(404).json({"error" : "Flight not found"});
    }

    
    const methods = ["SMS", "Email", "InApp"];

    function getRandomMethod(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }

    const notification = await prisma.notification.create({
      data: {
        notificationId : cuid(),
        flightId: flight.id,
        message,
        timestamp: new Date().toISOString(),
        method: getRandomMethod(methods),
        recipient: "Hardcoded_value",
      },
    });


    console.log(notification);

    // async..await is not allowed in global scope, must use a wrapper
    if (notification.method === "Email") {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: 'genevieve74@ethereal.email',
          pass: 'eF5SjMs67uHqaJ5aJT'
        },
      });

      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Indigo"  <noreply@indigo.com>',
          to: "aasifcoc@gmail.com",
          subject: "Flight status",
          text: notification.message,
        });
        console.log("Message sent: %s", info.messageId);
        res.json(info);
      }
      main().catch(console.error);
    } else if (notification.method === "SMS") {
      async function createMessage() {
        const message = await client.messages.create({
          body: notification.message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: "+918708641899",
        });
        console.log(message.body);
        res.json(message);
      }

      createMessage();
    } else {
      //send inApp notification using firebase cloud messaging
      const fcmToken = 
            "fHtbJowsExvim36cM4zDz_:APA91bHPXAFB0yZOcaQqr-S7zbs26Y4_Q08IVaca1sVVE-K65k_VLRqN4x7ElRAPbSydodumk_7Sfky58uxG__xJPX-YeLR8MWnpvvvQce9fOZVYGG-X-0ALR0K_NFZtqKrKDUqvgd15";
      // const { notification } = req.body;

      const message = {
        notification: {
          title: "Flight Update",
          body: notification.message
        },
        token: fcmToken,
      };

      try {
        const response = await admin.messaging().send(message);
        res.status(200).send("Successfully sent message: " + response);
      } catch (error) {
        res.status(500).send("Error sending message: " + error);
      }
    }
  } catch (e) {
    return res.json({ error: "Error adding notification", details: e.message });
  }
});

// Define a route to send push notifications
// app.post('/send-notification', async (req, res) => {
//   const fcmToken = "dCADDU5yelN-a3V0uklkEL:APA91bEDCFN1CCUQmMMn4maHzmCV6RtGJ6-cdYnxWt58hpU_isYb9MOwnZpJ2Y3vezJop1Tembs9YNRSaBDQxNEGtYm6en0v19JJ6-fMxUc82p_M-HbdhSbaDX4PF9BR9amTYZnNHjwc";
//   const { notification } = req.body;

//   const message = {
//     notification: {
//       title: notification.title || 'Hello!',
//       body: notification.body || 'This is a push notification sent from a Node.js backend.'
//     },
//     token: fcmToken
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     res.status(200).send('Successfully sent message: ' + response);
//   } catch (error) {
//     res.status(500).send('Error sending message: ' + error);
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
