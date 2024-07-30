// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyDaEPV62t9dN16jsBhtlRSX5b9HJ9lQoB4",
  authDomain: "indigo-notify.firebaseapp.com",
  projectId: "indigo-notify",
  storageBucket: "indigo-notify.appspot.com",
  messagingSenderId: "302344112773",
  appId: "1:302344112773:web:222fc73f46e60dc35c37ec",
  measurementId: "G-E7Z0ZEPVBK"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging(app);
getToken(messaging, { vapidKey: 'BFCDZX7ZYCDJCm2ZJkzrqVS3XBzFfmotpuVvU6XU6KU_teR7xf9RMKQo_B34VRHcgG19M_gHUfTyRq5K-iUoaKg' }).then((currentToken) => {
  if (currentToken) {
    console.log(currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});