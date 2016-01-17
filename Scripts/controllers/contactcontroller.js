app.controller('ContactController', function($scope, advancepagingservice) {
	$scope.title = 'full paging';
	$scope.description = 'A fully paged list of clubs.The pager directive manages the page navigation.The fullClubService only loads a page when it clicked onfor the first times';
	$scope.pages = advancepagingservice.pages;
	$scope.info = advancepagingservice.paging.info;
	$scope.options = advancepagingservice.paging.options;
	$scope.navigate = navigate;
	$scope.status = {
		type: "info",
		message: "ready",
		busy: false
	}
	var navigate = function(pageNumber) {
		$scope.status.busy = true;
		$scope.status.message = "loading records";
		advancepagingservice.navigate(pageNumber)
			.then(function() {
				$scope.status.message = "ready";
			}, function(result) {
				$scope.status.message = "something went wrong: " + (result.error || result.statusText);
			})['finally'](function() {
				$scope.status.busy = false;
			});
	}

	var activate = function() {
		if (advancepagingservice.paging.info.currentPage === 0) {
			navigate(1);
		};
	}
	activate();
	var optionsChanged = function() {
		advancepagingservice.clear();
		activate();
	}

})