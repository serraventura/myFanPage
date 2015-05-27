'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function (
    $scope, 
    $rootScope, 
    // FanPageService, 
    WatchService, 
    FanPageConfig,
    PageDetailService,
    PhotoService,
    FeedService
  ) {

    WatchService.watchRoutes($scope);

    $scope.templatePath = 'src/webcontent/views/templates/'+FanPageConfig.template;

  	// var fanPageService = new FanPageService();

    var pageDetailService = new PageDetailService();
    var photoService = new PhotoService();
    var feedService = new FeedService();

  	pageDetailService.getPageInfos().then(function(res) {
      $rootScope.$broadcast('page-infos-ready');
  	});

    pageDetailService.getProfilePicture().then(function(res) {
      $rootScope.$broadcast('page-profile-picture-ready');
    });

  	photoService.getPhotoPage().then(function(res) {
      $rootScope.$broadcast('page-photo-ready');
  	});

    feedService.getMenuContent().then(function(res) {
      $rootScope.$broadcast('menu-content-ready');
    });

  });