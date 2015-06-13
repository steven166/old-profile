//Install service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw2.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ',    registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

var app = paper.app.create("Paperwork", "blue-gray");