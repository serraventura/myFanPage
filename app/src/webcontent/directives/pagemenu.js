'use strict';

angular.module('myFanPageApp')
	.directive('pageMenu', function (FanPageContent) {
		return {
			template: '<ul><li ng-repeat="(id, menu) in menuOptions track by $index"><a href="#{{id}}">{{menu.name}}</a></li></ul>',
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
