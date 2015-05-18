'use strict';

angular.module('myFanPageApp')
	.directive('pageInclude', function ($compile) {
		return {
			restrict: 'E',
			scope: false,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

					scope.filePath = scope.templatePath+'/'+attrs.value;

					var DOM = angular.element("<div ng-include src='filePath'></div>");
					var el = $compile(DOM)(scope);
					element.replaceWith(el);

				}
			}
		};
	});
