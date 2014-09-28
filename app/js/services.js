(function () {
	'use strict';
	angular.module('myApp.services', [])
	.factory('appService', ['$http', '$q', function ($http,  $q){
      function all () {
      	var url = 'http://restcountries.eu/rest/v1';
        $http.get(url)
          .success(function (data) {
          	console.log(data);
          });      	
      }

      return {
        all: all
      };

	}]);
})();