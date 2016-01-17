app.factory('advancepagingservice', function($q, mainService) {
	var initialOptions = {
		size: 1,
	};
	// var pages = [];
	// var paging = {
	// 	options: angular.copy(initialOptions),
	// 	info: {
	// 		totalItems: 0,
	// 		totalPages: 1,
	// 		currentPage: 0
	// 	}
	// };
	var service = {
		// initialize: initialize,
		// navigate: navigage,
		pages: [],
		paging: {
			options: angular.copy(initialOptions),
			info: {
				totalItems: 0,
				totalPages: 1,
				currentPage: 0
			}
		}
	};


	service.initialize = function() {
		var queryArgs = {
			pageNumber: service.paging.info.currentPage
		};
		service.paging.info.currentPage = 1;
		return mainService.query(queryArgs).$promise.then(function(result) {
			var newPage = {
				number: pageNumber,
				ListContact: []
			};
			result.ListContact.forEach(function(ListContact) {
				newPage.ListContact.push(club);
			});
			service.pages.push(newPage);
			service.paging.info.currentPage = 1;
			service.paging.info.totalPages = result.totalPages;
			return result.$promise;
		}, function(result) {
			return $q.reject(result);
		});
	}

	service.load = function(pageNumber) {
		var queryArgs = {
			pageNumber: pageNumber,
		};
		return mainService.query(queryArgs).$promise.then(function(result) {
			var newPage = {
				number: service.paging.info.pageNumber,
				ListContact: []
			};
			result.ListContact.forEach(function(contact) {
				newPage.ListContact.push(contact);
			});
			service.pages[pageNumber] = newPage;
			service.paging.info.currentPage = pageNumber;
			service.paging.info.totalPages = result.TotalPages;
			service.paging.info.totalItems = result.TotalCount;
			return result.$promise;
		}, function(result) {
			return $q.reject(result);
		});
	}

	service.navigate = function(pageNumber) {
		var dfd = $q.defer();
		if (pageNumber > service.paging.info.totalPages) {
			return dfd.reject({
				error: "page number out of range"
			});
		};
		if (service.pages[pageNumber]) {
			service.paging.info.currentpage = pageNumber;
			dfd.resolve();
		} else {
			return service.load(pageNumber);
		};
	}

	service.clear = function() {
		service.pages.length = 0;
		service.paging.info.totalItems = 0;
		service.paging.info.currentPage = 0;
		service.paging.info.totalPages = 1;
	}
	return service;
})