// Integración oficial OneSignal Web Push SDK
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Service Worker para HEDAM Novedades PWA
const CACHE_NAME = 'hedam-cache-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-maskable-192.png',
  './assets/icon-maskable-512.png',
  './assets/logohedam-app.png',
  './assets/logohedam.png',
  './assets/mascot-pink.png',
  './assets/badge-96.png'
];

// Instalación rápida sin bloquear por timeouts
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activación y limpieza de cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia Network First con fallback a Cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // AÑADIDO PARA EVITAR EL ERROR DE EXTENSIONES DE CHROME
  if (!event.request.url.startsWith('http')) return; 

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// Nota importante: Eliminamos los eventos de recepción de notificaciones ('push' y 'notificationclick') 
// que tenías antes en este archivo. OneSignal ahora los manejará automáticamente gracias 
// a la primera línea importScripts.
