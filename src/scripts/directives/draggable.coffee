'use strict'

###*
 # @ngdoc directive
 # @name ilyazub.dragndrop-object.directive:draggable
 # @description
 # # draggable
###
angular.module('ilyazub.dragndrop-object')
  .directive('draggable', ->
    require: '?ngModel'
    restrict: 'EA'
    scope:
      jsonData: '=?'
      ngModel: '=?'
    link: ($scope, element, attrs) ->
      handleDragStart = (e) ->
        dataTransfer = e.dataTransfer || e.originalEvent.dataTransfer

        dataTransfer.effectAllowed = 'copy'

        if $scope.jsonData?
          dataTransfer.setData('dataType', 'json')

          dataTransfer.setData('json', $scope.jsonData)
        else if $scope.ngModel?
          dataTransfer.setData('dataType', 'object')

          obj = JSON.stringify($scope.ngModel)
          dataTransfer.setData('object', obj)

      element.on('dragstart', handleDragStart)
  )