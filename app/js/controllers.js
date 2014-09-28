(function () {
  'use strict';
  angular.module('myApp.controllers', [])
    .controller('AlertDemoCtrl', ['$scope', '$http', function ($scope, $http) {
        var url = 'http://restcountries.eu/rest/v1';
        $scope.titulo = "Wold map";
        $scope.loadCountries = function(){
            $http.get(url)
            .success(function (data){
                $scope.data = data;
            })

        };
    }]);  
})();
