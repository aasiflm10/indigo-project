const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path as necessary

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Use body-parser middleware
app.use(bodyParser.json());

// Define a route to send push notifications
app.post('/send-notification', async (req, res) => {
  const fcmToken = "dCADDU5yelN-a3V0uklkEL:APA91bEDCFN1CCUQmMMn4maHzmCV6RtGJ6-cdYnxWt58hpU_isYb9MOwnZpJ2Y3vezJop1Tembs9YNRSaBDQxNEGtYm6en0v19JJ6-fMxUc82p_M-HbdhSbaDX4PF9BR9amTYZnNHjwc";
  const { notification } = req.body;

  const message = {
    notification: {
      title: notification.title || 'Hello!',
      body: notification.body || 'This is a push notification sent from a Node.js backend.'
    },
    token: fcmToken
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send('Successfully sent message: ' + response);
  } catch (error) {
    res.status(500).send('Error sending message: ' + error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
