/**
 * Safei Muslim
 * Yogyakarta , 10 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

// curl -X POST --header "Authorization: key=AAAAhmWcgyI:APA91bGC7jtDxaH7tQsFH-zwjiNlwosbDPrvjuFBOlMTiyS60PbIq0aNy_I0-GwPWgVSQvQW2TesbgQdmAqvzr5dtLhE1dgfNMeGR4ijM1pidzNS_0TVifqpAI0PWN77LOSxZMOwvtem" --Header "Content-Type:application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"ftNQTdCWHEk:APA91bFkAp3T_8xtAPr2MWcnZOUN_2B6Uhe74oMD8xGtYgzZ9lsm7S4S6dTWY_YmnjO5Wo7auTtIkTtb0XBqQNrHoYdnbBIGYZMZQbB4gvrLUs49m9jCYveWzMpBwIhIV5QHkriomgVX\",\"data\":{\"notification\":{\"body\":\"Are you coming to our party?\",\"title\":\"This is a tester tester\",\"confirm\":\"https://developers.google.com/web/\",\"decline\":\"https://www.yahoo.com/\"}},\"priority\":10}"

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

self.addEventListener('message', function(event){
  console.log("SW Received Message: " + event.data);
});

/**
 * import firebase
 * import firebase message
 */

importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase-messaging.js');

/**
 * Initialize the Firebase app in the service worker by passing in the
 * [messagingSenderId]
 */

firebase.initializeApp({
  'messagingSenderId': '577230373666'
});

/**
 * define message const
 */

const messaging = firebase.messaging();

/**
 * --- Installs service worker ---
 */

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

/**
 * --- user click notification ---
 * --- get notification object ---
 * use event.notification.data
 */

self.addEventListener('notificationclick', (event) => {
  console.log('event: ', event);
  // Event actions derived from event.notification.data from data received
  var eventURL = event.notification.data;
  event.notification.close();
  if (event.action === 'confirmAttendance') {
    clients.openWindow(eventURL.confirm);
  } else if (event.action === 'cancel') {
    clients.openWindow(eventURL.decline);
  } else {
    clients.openWindow(eventURL.click_action);
  }
}, false);

/**
 * --- received message(Background) ---
 * [CUSTOM] dont put notification element in payload
 * --- payload must be like this ---
 * payload : {
 *  data: {
 *    ...
 *    notification: {
 *      title: ''
 *      body: ''
 *    }
 *    ...
 *  }
 * }
 */

messaging.setBackgroundMessageHandler((payload) => {
  console.log('payload: ', payload);
  let data = JSON.parse(payload.data.custom_notification);
  let notificationTitle = `${data.title}`;
  let notificationOptions = {
    body: data.body,
    icon: 'https://image.flaticon.com/icons/png/128/107/107822.png',
    // options event
    // actions: [
    //   {action: 'confirmAttendance', title: '👍 Confirm attendance'},
    //   {action: 'cancel', title: '👎 Not coming'}
    // ],
    // For additional data to be sent to event listeners, needs to be set in this data {}
    // data: {confirm: data.confirm, decline: data.decline, open: data.open}
    data: { click_action: data.click_action }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// export const sellerNotification = {
//   MESSAGE: {
//     body: 'Anda memiliki pesan baru',
//     type: 'SELLER_MESSAGE',
//   },
//   CREATE_DISCUSSION: {
//     body: 'Anda memiliki diskusi baru',
//     type: 'SELLER_CREATE_DISCUSSION',
//   },
//   COMMENT_DISCUSSION: {
//     body: 'Anda memiliki komentar baru',
//     type: 'SELLER_COMMENT_DISCUSSION',
//   },
//   REVIEW: {
//     body: 'Anda memiliki review baru',
//     type: 'SELLER_REVIEW',
//   },
//   TRANSACTION: {
//     body: 'Anda memiliki pesanan baru',
//     type: 'SELLER_TRANSACTION',
//   },
//   ORDER_RECEIVED: {
//     body: 'Pesanan telah diterima oleh pembeli',
//     type: 'SELLER_ORDER_RECEIVED',
//   },
//   ORDER_COMPLAINED_REFUND: {
//     body: 'Pembeli mengajukan refund',
//     type: 'SELLER_ORDER_COMPLAINED_REFUND',
//   },
//   ORDER_COMPLAINED_EXCHANGE: {
//     body: 'Pembeli mengajukan tukar barang baru',
//     type: 'SELLER_ORDER_COMPLAINED_EXCHANGE',
//   },
// };

// export const buyerNotification = {
//   MESSAGE: {
//     body: 'Anda memiliki pesan baru',
//     type: 'BUYER_MESSAGE',
//   },
//   COMMENT_DISCUSSION: {
//     body: 'Penjual mengomentari diskusi Anda',
//     type: 'BUYER_COMMENT_DISCUSSION',
//   },
//   ORDER_PROCEED: {
//     body: 'Pesanan Anda sedang diproses',
//     type: 'BUYER_ORDER_PROCEED',
//   },
//   ORDER_SENT: {
//     body: 'Pesanan Anda telah dikirim',
//     type: 'BUYER_ORDER_SENT',
//   },
//   ORDER_REJECTED: {
//     body: 'Pesanan Anda ditolak oleh penjual',
//     type: 'BUYER_ORDER_REJECTED',
//   },
// };

// - SELLER_MESSAGE = message_id
// - SELLER_CREATE_DISCUSSION = discussion_id, product_id
// - SELLER_COMMENT_DISCUSSION = discussion_id, product_id
// - SELLER_REVIEW = product_id
// - SELLER_TRANSACTION = invoice_id
// - SELLER_ORDER_RECEIVED = invoice_id
// - SELLER_ORDER_COMPLAINED_REFUND = dispute_id
// - SELLER_ORDER_COMPLAINED_EXCHANGE = dispute_id

// - BUYER_MESSAGE = message_id
// - BUYER_COMMENT_DISCUSSION = discussion_id, product_id
// - BUYER_ORDER_PROCEED = bucket_id, invoice_id
// - BUYER_ORDER_SENT = bucket_id, invoice_id
// - BUYER_ORDER_REJECTED = bucket_id, invoice_id
