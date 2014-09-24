'use strict'

###*
 # @ngdoc directive
 # @name ilyazub.dragndrop-object.directive:draggable
 # @description
 # # draggable
###
angular.module('ilyazub.dragndrop-object')
  .directive('draggable', ->
    require: 'ngModel'
    restrict: 'EA'
    scope:
      jsonData: '='
      ngModel: '='
      transferredDataType: '@'
    link: ($scope, element, attrs) ->
      handleDragStart = (e) ->
        dataTransfer = e.dataTransfer || e.originalEvent.dataTransfer

        dataTransfer.effectAllowed = 'copy'

        dataTransfer.setData('dataType', $scope.transferredDataType)

        switch $scope.transferredDataType
          when 'json'
            dataTransfer.setData($scope.transferredDataType, $scope.jsonData)
          when 'object'
            json = JSON.stringify($scope.ngModel)
            dataTransfer.setData($scope.transferredDataType, json)

      element.on('dragstart', handleDragStart)

    controller: [ '$scope', 'defaultTransferredDataType', ($scope, transferredDataType) ->
      $scope.transferredDataType ||= transferredDataType
    ]
  )