// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')


firebase.initializeApp({
  apiKey: "AIzaSyDaEPV62t9dN16jsBhtlRSX5b9HJ9lQoB4",
  authDomain: "indigo-notify.firebaseapp.com",
  projectId: "indigo-notify",
  storageBucket: "indigo-notify.appspot.com",
  messagingSenderId: "302344112773",
  appId: "1:302344112773:web:222fc73f46e60dc35c37ec",
  measurementId: "G-E7Z0ZEPVBK"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
