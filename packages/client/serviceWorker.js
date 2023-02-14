const staticCacheName = 'flappy-bird-cache-v3'
const fetchCacheName = 'flappy-bird-fetch-cache-v3'
const URLS = ['/src/index.css', '/src/main.tsx', '/index.html']

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)

  await cache.addAll(URLS)
})

self.addEventListener('activate', async event => {
  self.clients.claim()

  const cacheNames = await caches.keys()

  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName || name !== fetchCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', async event => {
  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  const response = await fetch(request)

  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response
  }

  if (request.url.match('^(http|https)://')) {
    const responseToCache = response.clone()
    const cache = await caches.open(fetchCacheName)

    await cache.put(request, responseToCache)
  }

  return response
}
