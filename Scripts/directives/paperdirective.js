app.directive('pager', function($window, advancepagingservice) {
	var directive = {
		restrict: 'E',
		// replace: true,
		templateUrl: "/Scripts/views/pager.html",
		scope: {
			totalPages: "=",
			currentPage: "=",
			pageAction: "&"
		}
	};
	directive.createPageArray = function(pages, totalPages) {
		var i;
		pages.length = 0;

		for (i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
	}
	directive.link = function(scope, element, attrs) {
		scope.pages = [];
		scope.$watch('totalPages', function() {
			directive.createPageArray(scope.pages, scope.totalPages);
		});
		scope.gotoPage = function(p) {
			scope.pageAction({
				pageNumber: p
			});
		};
	}


	return directive;
});