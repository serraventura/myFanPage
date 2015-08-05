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
    FeedService,
    ModuleLoader
  ) {

    WatchService.watchRoutes($scope);

    $scope.templatePath = 'src/webcontent/views/templates/'+FanPageConfig.template;

  	// var fanPageService = new FanPageService();

    var pageDetailService = new PageDetailService();
    var photoService = new PhotoService();
    var feedService = new FeedService();

  	pageDetailService.getPageInfos().then(function(res) {
      $rootScope.$broadcast('page-infos-ready');
      ModuleLoader.loadAll();
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


    $scope.list = [
      {name: 'test 111', age: 33},
      {name: 'test 222', age: 44},
      {name: 'test 333', age: 55}
    ]



  });
