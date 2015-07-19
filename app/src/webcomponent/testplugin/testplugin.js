'use strict';

angular.module('testplugin', [])
.config(function () {})
.run(function() {})
.controller('TestPlugin', function ($scope, FanPageContent) {
  $scope.numOfLikes = FanPageContent.pageDetails.likes;
})
.directive('myTestPlugin', function () {
  return {
    scope: true,
    replace: true,
    restrict: 'E',
    template: function(element, attrs){
      return '<div ng-controller="TestPlugin">My fanpage is {{age}} has {{numOfLikes}} likes and a test property {{test}} :)</div>'
    },
    link: {
      post: function (scope, element, attrs) {
        scope.age = attrs.age;
        scope.test = attrs.test;
      }
    }


  };
})

  .directive('myCustomDirectivePlugin', function () {
    return {
      scope: true,
      replace: true,
      restrict: 'E',
      template: '<span>My Name is {{name}} Im {{age}} years old.</span>',
      link: {
        post: function (scope, element, attrs) {
          scope.age = attrs.age;
          scope.name = attrs.name;
        }
      }


    };
  })
