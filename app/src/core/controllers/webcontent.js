'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function (
    $scope,
    $rootScope,
    $q,
    WatchService,
    FanPageConfig,
    PageDetailService,
    PhotoService,
    FeedService,
    ModuleLoader,
    FanPageContent
  ) {

    var arrPromises = [];
    var promise;
    var pageDetailService = new PageDetailService();
    var photoService = new PhotoService();
    var feedService = new FeedService();

    // TODO: decide whow to organize the watches blocks
    WatchService.watchRoutes($scope);

    $scope.templatePath = 'src/webcontent/views/templates/'+FanPageConfig.template;

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

    function makeCache() {
      
        var fanPageContentCache = {
          dateCriation: moment().format(),
          data: FanPageContent
        };

        try{
          fanPageContentCache = JSON.stringify(fanPageContentCache);
        }catch(err){
          console.log('Error generating cache: ', err);
        }

        localStorage.setItem('fanPageContentCache', fanPageContentCache);

    };

    $q.all(arrPromises).then(function (data) {

      // handling cache
      if(typeof Storage !== 'undefined'){

        if(localStorage.getItem('fanPageContentCache') != null){

          try{

            var cache = JSON.parse(localStorage.getItem('fanPageContentCache'));

            if (moment().diff(moment(cache.dateCriation), 'days') >= 1) {
              localStorage.removeItem('fanPageContentCache');
              makeCache();
            };

          }catch(err){
            console.log('Error in cache: ', err);
          }

        }else{
          makeCache();
        }

      }

    }, function(err){

    });

    // plugin test
    // $scope.list = [
    //   {name: 'test 111', age: 33},
    //   {name: 'test 222', age: 44},
    //   {name: 'test 333', age: 55}
    // ]

  });
