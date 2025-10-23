/**
 * Service Worker pro PWA
 * Umožňuje offline režim a cache statických souborů
 */

const CACHE_NAME = 'ts-zamereni-v1'
const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell')
      return cache.addAll(CACHE_URLS)
    }).catch(err => {
      console.warn('[SW] Cache install failed:', err)
    })
  )

  // Force waiting service worker to become active
  self.skipWaiting()
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )

  // Take control of all pages immediately
  self.clients.claim()
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip Power Automate requests (always try network)
  if (request.url.includes('powerplatform.com')) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version
        return cachedResponse
      }

      // Try network
      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Clone response (can only be consumed once)
        const responseToCache = response.clone()

        // Cache successful responses
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache)
        })

        return response
      }).catch((error) => {
        console.warn('[SW] Fetch failed:', error)

        // Return offline fallback if available
        return caches.match('/index.html')
      })
    })
  )
})

// Message event - allow manual cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
