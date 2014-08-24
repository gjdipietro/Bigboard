'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'bigboardControllers',
  'firebase'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/players', {
        templateUrl: 'partials/player-list.html',
        controller: 'PlayerListCtrl'
      }).
      when('/taken', {
        templateUrl: 'partials/player-taken.html',
        controller: 'PlayerListCtrl'
      }).
      when('/players/:playerId', {
        templateUrl: 'partials/player-detail.html',
        controller: 'PlayerDetailCtrl'
      }).
      otherwise({
        redirectTo: '/players'
      });
  }]);
