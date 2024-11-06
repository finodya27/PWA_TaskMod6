/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Caching search API responses
registerRoute(
  ({ url }) => url.origin === 'https://imdb8.p.rapidapi.com',
  async ({ request }) => {
    const cache = await caches.open('search-results-cache');
    try {
      const response = await fetch(request);
      
      // Cache the response
      cache.put(request, response.clone());
      return response;
    } catch (error) {
      // Jika gagal mengambil, ambil dari cache
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse; // Kembalikan data dari cache jika tersedia
      }
      throw error; // Jika tidak ada, lanjutkan dengan error
    }
  }
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});