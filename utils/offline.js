import * as firebase from 'firebase'
import localforage from 'localforage'

const config = {
  apiKey: 'AIzaSyBTTry2JqI1WJHdtcmYpKHXHXfjJglgvgo',
  authDomain: 'komuto-dcd83.firebaseapp.com',
  databaseURL: 'https://komuto-dcd83.firebaseio.com',
  projectId: 'komuto-dcd83',
  storageBucket: 'komuto-dcd83.appspot.com',
  messagingSenderId: '163364818536'
}

firebase.initializeApp(config)
const messaging = firebase.messaging()

if (
  process.env.NODE_ENV === 'production' &&
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator
  ) {
    // On load register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
          // Successfully registers service worker
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
        messaging.useServiceWorker(registration)
      })
        .then(() => {
          // Requests user browser permission
          return requestPermission()
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed: ', err)
        })
    })
  }
}

function requestPermission () {
  return messaging.requestPermission().then(function () {
    return getToken()
  })
}

function getToken () {
  return messaging.getToken().then(function (token) {
    console.log('TOKEN: ', token)

    if (token) {
      updatedToken(token)
    } else {
      requestPermission()
    }
  })
}

function updatedToken (token) {
  localforage.setItem('FCM_TOKEN', token).then(function () {
    return localforage.getItem('FCM_TOKEN')
  }).then(function (value) {
    // we got our value
    console.log('SUCESS TOKEN', token)
  }).catch(function (err) {
    // we got an error
    console.log('ERROR TOKEN', err)
  })
}

// if (
// process.env.NODE_ENV === 'production' &&
// typeof window !== 'undefined' &&
// 'serviceWorker' in navigator
// ) {
//   navigator.serviceWorker.register('/sw.js', {scope: './'}).then(function (reg) {
//     reg.onupdatefound = function () {
//       const installingWorker = reg.installing
//       // Successfully registers service worker

//       console.log('ServiceWorker registration successful with scope: ', reg.scope);
//       messaging.useServiceWorker(reg);

//       installingWorker.onstatechange = function () {
//         switch (installingWorker.state) {
//           case 'installed':
//             if (navigator.serviceWorker.controller) {
//               console.log('New or updated content is available.')
//             } else {
//               console.log('Content is now available offline!')
//             }
//             break
//           case 'redundant':
//             console.log('The installing serviceWorker became redundant.')
//             break
//         }
//       }
//     }

//   })
//   .then(() => {
//     // Requests user browser permission
//     return messaging.requestPermission();
//   })
//   .then(() => {
//     // Gets token
//     return messaging.getToken();
//   })
//   .then((token) => {
//     // Simple ajax call to send user token to server for saving
//     $.ajax({
//       type: 'POST',
//       url: '/api/setToken',
//       dataType: 'json',
//       data: JSON.stringify({token: token}),
//       contentType: 'application/json',
//       success: (data) => {
//         console.log('Success ', data);
//       },
//       error: (err) => {
//         console.log('Error ', err);
//       }
//     })
//   })
//   .catch(function (e) {
//     console.error('Error during service worker registration:', e)
//   })
// }
