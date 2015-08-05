'use strict';

angular.module('myFanPageApp')
	.directive('pagePhotos', function (FanPageContent) {
		return {
			templateUrl: 'src/core/views/page-photos.html',
      restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

					scope.pictures = null;

					scope.$watch(function() {
						return FanPageContent.pictures;
					}, function(newVal, oldVal) {

						scope.pictures = FanPageContent.pictures;

					}, true);

				}
			}
		};
	});
