
var CACHE_NAME = 'paperwork-api-cache-v1';
var urlsToCache = [
    '/',
    '/activities/',
    '/js/_app.js',
    '/js/_init.js',
    '/images/',
    '../../shared/images/icons/',
    '../../shared/css/icons/',
    '../../shared/css/paper-bundle.css',
    '../../shared/js/jquery.min.js',
    '../../shared/js/paper-bundle.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', function(event) {
    console.log("fetch: " + event.request);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have 2 stream.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            }
        )
    );
});


// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
//console.log("SW startup");
//
//self.addEventListener('install', function(event) {
//    console.log("SW installed");
//});
//
//self.addEventListener('activate', function(event) {
//    console.log("SW activated");
//});
//
//self.addEventListener('fetch', function(event) {
//    console.log("Caught a fetch!");
//    event.respondWith(new Response("Hello world!"));
//});