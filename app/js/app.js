(function () {
  'use strict';
  var app = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.controllers',
    'myApp.services',

  ]);

  app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/new', {
        templateUrl: 'views/tmp.html',
        controller: 'AlertDemoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });



  }]);

})();
