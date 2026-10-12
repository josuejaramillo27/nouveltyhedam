// Firebase Messaging Service Worker para segundo plano (App cerrada / Teléfono bloqueado)
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBmM0YUumjsEo0ApyJ78ah1OQPxcMzFcNY",
  authDomain: "nouveltyhedam.firebaseapp.com",
  projectId: "nouveltyhedam",
  storageBucket: "nouveltyhedam.firebasestorage.app",
  messagingSenderId: "518596302149",
  appId: "1:518596302149:web:10b3e91c765dfc65841a2c"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[Firebase SW] Notificación recibida en segundo plano:', payload);

  const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || 'HEDAMPRO | Nueva Novedad';
  const options = {
    body: (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || 'Hay una nueva novedad oficial disponible en la plataforma.',
    icon: 'assets/icon-192.png',
    badge: 'assets/badge-96.png',
    vibrate: [200, 100, 200],
    data: {
      url: (payload.data && payload.data.url) || './index.html'
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : './index.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
