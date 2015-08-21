'use strict';

angular.module('myFanPageApp').service('WatchService', function WatchService(FanPageConfig, $route, $routeParams, $http, $compile) {

  var th = this;

  this.watchRoutes = function ($scope) {

    var flAnchorContent = false;

    $scope.$watch(function() {
      return $routeParams.name
    }, function(newVal, oldVal) {

      if (newVal !== oldVal && !flAnchorContent) {

        $route.current.templateUrl = 'src/webcontent/views/templates/'+FanPageConfig.template+'/'+$routeParams.name+'.html';

        $http.get($route.current.templateUrl).then(function (msg) {
          angular.element('[ng-view]').eq(0).html($compile(msg.data)($scope));
          flAnchorContent = FanPageConfig.anchorContent;
        });

      };

    }, false);

  };

});
