// Service worker "self-uninstalling": registra la PWA come installabile
// ma non fa caching attivo, per evitare i 404 causati dal subpath di
// GitHub Pages quando il service worker intercetta le richieste.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    })
  );
});
