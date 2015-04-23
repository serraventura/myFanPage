'use strict';

angular.module('myFanPageApp')
	.directive('pageDetails', function (FanPageContent) {
		return {
			template: '<span>{{valueProp}}</span>',
			restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

					scope.valueProp = null;

					scope.$on('page-infos-ready', function(event, args) {

						var pageDetailsProp = (attrs.value||'').toLowerCase();

						if (FanPageContent.pageDetails.hasOwnProperty(pageDetailsProp)) {
							scope.valueProp = FanPageContent.pageDetails[pageDetailsProp];
						}else{
							scope.valueProp = pageDetailsProp+' details not found.';
						};

					});

				}
			}
		};
	});
