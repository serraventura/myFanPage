'use strict';

angular.module('myFanPageApp')
  .controller('WebContentCtrl', function ($scope, Facebook) {

  	$scope.test = 'Hello World';

// testing Facebook module

	Facebook.api('/myfanpageapp', function(response) {
		$scope.test = response;
	});


  });
