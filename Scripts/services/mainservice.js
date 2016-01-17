app.factory('mainService', function($resource) {
	return $resource("api/contact/:id", {
		id: "@id"
	}, {
		'query': {
			method: 'GET',
			url: 'http://localhost:34718/api/contact/:pageNumber',
			params: {
				page: '@pageNumber'
			}
		}
	});
});