'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function ($scope, FanPageService) {

  	$scope.test = 'Hello World';

  	var fanPageService = new FanPageService();

	$scope.pageContent = fanPageService.pageContent;

  	fanPageService.getPageInfos().then(function(res) {
  		
  		$scope.test = res.data;

  	});


  });
