'use strict';

angular.module('myFanPageApp')
	.directive('pageMenu', function (FanPageContent) {
		return {
			templateUrl: 'src/core/views/page-menu.html',
      restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {
					scope.menuOptions = FanPageContent.menuOptions;
				}
			}
		};
	});
