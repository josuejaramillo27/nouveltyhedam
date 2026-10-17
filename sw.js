importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// 1. Inicializar Firebase en Segundo Plano
firebase.initializeApp({
  apiKey: "AIzaSyBmM0YUumjsEo0ApyJ78ah1OQPxcMzFcNY",
  projectId: "nouveltyhedam",
  messagingSenderId: "518596302149",
  appId: "1:518596302149:web:10b3e91c765dfc65841a2c"
});

const messaging = firebase.messaging();

// 2. Escuchar Notificaciones Push cuando la web está cerrada (Enviadas desde Render)
messaging.onBackgroundMessage((payload) => {
  console.log('[FCM] Notificación recibida en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'assets/icon-192.png',
    badge: 'assets/badge-96.png',
    data: { url: './index.html' }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 3. Service Worker para HEDAM Novedades PWA (Caché normal)
const CACHE_NAME = 'hedam-cache-v11';
const ASSETS_TO_CACHE = [
  './', './index.html', './style.css', './app.js', './manifest.json',
  './assets/icon-192.png', './assets/icon-512.png', './assets/logohedam.png', './assets/mascot-pink.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((key) => {
    if (key !== CACHE_NAME) return caches.delete(key);
  }))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return; 
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes('index.html') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
