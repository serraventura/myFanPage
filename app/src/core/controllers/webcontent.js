'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function (
    $scope,
    $rootScope,
    $q,
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

    var arrPromises = [];
    var promise;

  	// var fanPageService = new FanPageService();

    var pageDetailService = new PageDetailService();
    var photoService = new PhotoService();
    var feedService = new FeedService();

  	promise = pageDetailService.getPageInfos().then(function(res) {
      $rootScope.$broadcast('page-infos-ready');
      ModuleLoader.loadAll();
  	});
    arrPromises.push(promise);

    promise = pageDetailService.getProfilePicture().then(function(res) {
      $rootScope.$broadcast('page-profile-picture-ready');
    });
    arrPromises.push(promise);

  	promise = photoService.getPhotoPage().then(function(res) {
      $rootScope.$broadcast('page-photo-ready');
  	});
    arrPromises.push(promise);

    promise = feedService.getMenuContent().then(function(res) {
      $rootScope.$broadcast('menu-content-ready');
    });
    arrPromises.push(promise);

    $q.all(arrPromises).then(function (data) {

    }, function(err){

    });

    // plugin test
    // $scope.list = [
    //   {name: 'test 111', age: 33},
    //   {name: 'test 222', age: 44},
    //   {name: 'test 333', age: 55}
    // ]



  });
