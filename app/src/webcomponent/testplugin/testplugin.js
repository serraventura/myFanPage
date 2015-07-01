'use strict';

angular.module('testplugin', [])
.config(function () {})
.run(function() {})
.controller('TestPlugin', function ($scope, FanPageContent) {
  $scope.numOfLikes = FanPageContent.pageDetails.likes;
})
.directive('myTestPlugin', function () {
  return {
    restrict: 'E',
    template: '<div ng-controller="TestPlugin">My fanpage has {{numOfLikes}} likes :)</div>'
  };
})