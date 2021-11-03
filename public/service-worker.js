self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			var url = new URL(event.request.url);
			if (!(url.pathname.indexOf("/static/") === 0)) {
				return fetch(event.request);
			}


			if (isValid(response)) {
				return response;
			}

			return fetch(event.request).then(function (response) {
				var copy = response.clone();
				event.waitUntil(
					caches.open("v1").then(function (cache) {
						var headers = new Headers(copy.headers);
						headers.append("sw-fetched-on", new Date().getTime());

						return copy.blob().then(function (blob) {
							return cache.put(
								event.request,
								new Response(blob, {
									status: copy.status,
									statusText: copy.statusText,
									headers: headers,
								})
							);
						});
					})
				);
				return response;
			});
		})
	);
});

const isValid = (response) => {
	if (!response) { return false; }
	var fetched = response.headers.get("sw-fetched-on");
	if (!fetched) { return false; }
	var fetchedOn = parseInt(fetched);
	var now = new Date().getTime();
	var diff = now - fetchedOn;
	return diff < 60 * 60 * 1000;
}

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function (cacheName) {
						// Return true if you want to remove this cache,
						// but remember that caches are shared across
						// the whole origin
						return true;
					})
					.map(function (cacheName) {
						return caches.delete(cacheName);
					})
			);
		})
	);
});
