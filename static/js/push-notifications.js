/**
 * Safei Muslim
 * Yogyakarta , 10 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '163364818536'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

self.addEventListener('push', function(event) {
  
    console.info('Event: Push');
  
    var title = 'New commit on Github Repo: RIL';
  
    var body = {
      'body': 'Click to see the latest commit',
      'tag': 'pwa',
      'icon': './images/48x48.png'
    };
  
    event.waitUntil(
      self.registration.showNotification(title, body)
    );
  });

  self.addEventListener('notificationclick', function(event) {
    
      var url = 'http://facebook.com';
    
      event.notification.close(); //Close the notification
    
      // Open the app and navigate to latest.html after clicking the notification
      event.waitUntil(
        clients.openWindow(url)
      );
    });