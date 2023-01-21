const staticCacheName = 'flappy-bird-cache-v2'
const fetchCacheName = 'flappy-bird-fetch-cache-v2'

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
      .filter(name => name !== staticCacheName)
      .filter(name => name !== fetchCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', async event => {
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request)
      if (cachedResponse) {
        return cachedResponse
      }
      const response = await fetch(event.request)
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response
      }
      if (event.request.url.match('^(http|https)://')) {
        const responseToCache = response.clone()
        const cache = await caches.open(fetchCacheName)
        await cache.put(event.request, responseToCache)
      }
      return response
    })()
  )
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? (await fetch(request))
}
