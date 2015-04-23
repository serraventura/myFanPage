'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function ($scope, $rootScope, FanPageService, WatchService) {

    WatchService.watchRoutes($scope);

  	var fanPageService = new FanPageService();

  	fanPageService.getPageInfos().then(function(res) {
      $rootScope.$broadcast('page-infos-ready');
  	});

  	fanPageService.getPhotoPage().then(function(res) {
      $rootScope.$broadcast('page-photo-ready');
  	});

    fanPageService.getMenuContent().then(function(res) {
      $rootScope.$broadcast('menu-content-ready');
    });

  });