app.factory('ContactService', function($http) {
	var contactAPI = {};
	contactAPI.getAllContacts = function() {
		return $http.get('http://localhost:34718/api/Contact/GetAllContatcs');
	}
	return contactAPI;
})