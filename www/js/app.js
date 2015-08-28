// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://ionic-fb-demo.firebaseio.com/items');
  return $firebaseArray(itemsRef);
}])

.controller('ListCtrl', ['$scope', '$ionicListDelegate', '$ionicPopup', 'Items', function($scope, $ionicListDelegate, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    var itemName = $scope.getItemFromPopup().then(function(name){
      if (name) {
        console.log(name);
        $scope.items.$add({
          'name': $scope.data.newItem
        });
      }
    });
  };

  $scope.purchaseItem = function(item) {
    var itemRef = new Firebase('https://ionic-fb-demo.firebaseio.com/items/' + item.$id);
    itemRef.child('status').set('purchased');
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.getItemFromPopup = function() {
    $scope.data = {};
    return $ionicPopup.show({
      template: '<input type="text" ng-model="data.newItem">',
      title: 'What do you need to buy?',
      subTitle: 'Enter the name of an item',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.data.newItem;
          }
        }
      ]
    });
  };

}]);
