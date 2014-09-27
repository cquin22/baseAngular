(function () {

  var app = angular.module('myApp', [
    //'ngRoute',
    'ui.bootstrap',
    'myApp.controllers',

  ]);
/*
  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/pokedex.html',
        controller: 'PokedexController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);
*/
})();
