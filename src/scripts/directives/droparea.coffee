'use strict'

###*
 # @ngdoc directive
 # @name ilyazub.dragndrop-object.directive:droparea
 # @description
 # # droparea
###
angular.module('ilyazub.dragndrop-object')
  .directive('droparea', ->
    restrict: 'EA'
    scope:
      handleDrop: '&drop'
      highlightClass: '@'
    link: ($scope, element, attrs) ->
      handleDrop = (e) ->
        element.removeClass('highlight')

        $scope.$apply(
          (scope) ->
            if typeof scope.handleDrop is 'function'
              handleDrop = scope.handleDrop()

              dataTransfer = e.dataTransfer || e.originalEvent.dataTransfer

              dataType = dataTransfer.getData('dataType')
              obj = JSON.parse(dataTransfer.getData(dataType))

              handleDrop(obj)
        )

        e.preventDefault()

      handleDragEnter = (e) ->
        element.addClass($scope.highlightClass)

        e.preventDefault()

      handleDragLeave = (e) ->
        element.removeClass($scope.highlightClass)

        e.preventDefault()

      handleDragOver = (e) ->
        dataTransfer = e.dataTransfer || e.originalEvent.dataTransfer
        dataTransfer.dropEffect = 'copy'

        e.preventDefault()

      element.on('drop', handleDrop)
      element.on('dragenter', handleDragEnter)
      element.on('dragleave', handleDragLeave)
      element.on('dragover', handleDragOver)
  )