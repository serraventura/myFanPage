'use strict';

angular.module('myFanPageApp')
	.directive('pagePhotos', function (FanPageContent) {
		return {
			template: '<ul><li ng-repeat="picture in pictures track by $index"><a href="{{picture.big}}" target="_blank"><img src="{{picture.small}}" /></a><span>{{picture.description}}</span></li></ul>',
			restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

					scope.pictures = null;

					scope.$on('page-photo-ready', function(event, args) {

						scope.pictures = FanPageContent.pictures;

					});

				}
			}
		};
	});
