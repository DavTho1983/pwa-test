var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [ '/', '/completed' ];

// Install a service worker
self.addEventListener('install', (event) => {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});

// Update a service worker
self.addEventListener('activate', (event) => {
	var cacheWhitelist = [ 'pwa-task-manager' ];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI notify the user they can add to home screen
	showInstallPromotion();
});
