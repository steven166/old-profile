//Install service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw4.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ',    registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

//Check for internet connection
var isOffline = false;
function hostReachable() {

    // Handle IE and more capable browsers
    var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
    var status;

    // Open new request as a HEAD to the root hostname with a random param to bust the cache
    xhr.open( "HEAD", "//" + window.location.hostname + "/?rand=" + Math.floor((1 + Math.random()) * 0x10000), false );

    // Issue request and handle response
    try {
        xhr.send();
        return ( xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) );
    } catch (error) {
        return false;
    }
}

setInterval(function(){
    var isReachable = hostReachable();
    if(isReachable !== isOffline){
        isOffline = isReachable;
        if(isOffline){
            paper.snackbar("This site is always available, even when you are working offline");
        }else{
            paper.snackbar("Seems we're back online!");
        }
    }
}, 5000);

var app = paper.app.create("Paperwork", "blue-gray");