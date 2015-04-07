'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function ($scope, FanPageService) {

  	var fanPageService = new FanPageService();

	$scope.pageContent = fanPageService.pageContent;
	$scope.menuOptions = fanPageService.menuOptions;

  	fanPageService.getPageInfos().then(function(res) {

  	});

  	fanPageService.getPhotoPage().then(function(res) {
  		
  	});

  });