const OFFLINE_CACHE = 'offline';
const MAX_CACHE_STACK = 40;

const pushToCache = (request, response) => {
    return caches.open(OFFLINE_CACHE)
        .then(cache => {
            cache.put(request, response);
            return emptyCacheStack(OFFLINE_CACHE, MAX_CACHE_STACK);
        });
};

const emptyCacheStack = (cacheName, maxCacheStack) => {
    return caches.open(cacheName)
        .then(cache => {
            return cache.keys()
                .then(requests => {
                    for (; requests.length >= maxCacheStack;) {
                        cache.delete(requests.shift());
                    }

                    return requests;
                });
        })
};

self.addEventListener('fetch', (e) => {
    return e.respondWith(caches.match(e.request)
        .then(res => {
            if (!res) {
                return fetch(e.request)
                    .then(res => {
                        pushToCache(e.request, res.clone())
                        return res;
                    });
            }

            fetch(e.request)
                .then(res => {
                    pushToCache(e.request, res.clone())
                    return res;
                });

            return res;
        }));
});