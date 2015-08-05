'use strict';

angular.module('myFanPageApp')
	.filter('sanitize', function ($sce) {

		return function(htmlCode){
			return $sce.trustAsHtml(htmlCode);
		}

	});
