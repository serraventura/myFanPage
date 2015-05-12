'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function ($scope, $rootScope, FanPageService, WatchService, FanPageConfig) {

    WatchService.watchRoutes($scope);

    $scope.templatePath = 'src/webcontent/views/templates/'+FanPageConfig.template;

  	var fanPageService = new FanPageService();

  	fanPageService.getPageInfos().then(function(res) {
      $rootScope.$broadcast('page-infos-ready');
  	});

    fanPageService.getProfilePicture().then(function(res) {
      $rootScope.$broadcast('page-profile-picture-ready');
    });

  	fanPageService.getPhotoPage().then(function(res) {
      $rootScope.$broadcast('page-photo-ready');
  	});

    fanPageService.getMenuContent().then(function(res) {
      $rootScope.$broadcast('menu-content-ready');
    });

  });