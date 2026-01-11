const CACHE_NAME = 'v1-offline-cache';
// Lista de arquivos para salvar
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação: Salva os arquivos no celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Interceptação: Se não tiver internet, busca no cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
