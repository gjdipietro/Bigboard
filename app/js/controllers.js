'use strict';

/* Controllers */

var bigboardControllers = angular.module('bigboardControllers', []);
var pickcount = 1;

bigboardControllers.controller('PlayerListCtrl', ['$scope', '$firebase',
  function($scope, $firebase) {
    var ref = new Firebase("https://big-board.firebaseio.com/players")
    var sync = $firebase(ref);
    

    // create a synchronized array for use in our HTML code 
    $scope.players = sync.$asArray();
    $scope.selectedPos = {};
    $scope.selectedPos.pos = ''; 
        

    $scope.setSelectedPos = function(pos) {
      $scope.selectedPos.pos = pos;
    }

    
    $scope.draftPlayer = function(player, id) {
      var playerRef = new Firebase(ref + '/' + id);
      playerRef.child('taken').transaction(function(currentValue) {
        return pickcount;
      });
      pickcount++; 
    }  

    $scope.reset = function() {
      for (var i=0; i < 199; i++) {
        var playerRef = new Firebase(ref + '/' + i);
        playerRef.child('taken').transaction(function(currentValue) {
          pickcount = 1;
          return 0;
        });
      }
    }


    $scope.undraftPlayer = function(player, id) {
      var playerRef = new Firebase(ref + '/' + id);
      playerRef.child('taken').transaction(function(currentValue) {
        pickcount--; 
        return 0;
      });
      
    }
}]);

    


