'use strict';

angular.module('example', [
  'ilyazub.dragndrop-object'
]);

angular
  .module('example')
  .controller('ExampleCtrl', function ($scope) {
    $scope.stringify = function (obj) {
      return JSON.stringify(obj);
    };

    $scope.addToCart = function (fruit) {
      $scope.basket.push(fruit);
    }

    $scope.basket = []

    $scope.fruits = [
      {
        id: 1,
        title: 'Apple'
      },
      {
        id: 2,
        title: 'Chokeberry'
      },
      {
        id: 3,
        title: 'Hawthorn'
      },
      {
        id: 4,
        title: 'Serviceberry'
      }
    ]
  });