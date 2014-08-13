'use strict';

/* Controllers */

var bigboardControllers = angular.module('bigboardControllers', []);


bigboardControllers.controller('PlayerListCtrl', ['$scope', '$firebase',
  function($scope, $firebase) {
    
    var ref = new Firebase("https://big-board.firebaseio.com/players");
    var sync = $firebase(ref);
    var pickcount = 1;

    // create a synchronized array for use in our HTML code
    $scope.players = sync.$asArray();
    $scope.selectedPos = {};
    $scope.selectedPos.position = ''; 
    $scope.setSelectedPos = function(pos) {
      $scope.selectedPos.position = pos;
    }

    
    $scope.draftPlayer = function(player, id) {
      var playerRef = new Firebase(ref + '/' + id);
      playerRef.child('taken').transaction(function(currentValue) {
        return 1;
      });
      pickcount++; 
    }  

    $scope.reset = function() {
      for (var i=0; i < 500; i++) {
        var playerRef = new Firebase(ref + '/' + i);
        playerRef.child('taken').transaction(function(currentValue) {
          return 0;
        });
      }
      pickcount = 1;
    }
  }]);

  

