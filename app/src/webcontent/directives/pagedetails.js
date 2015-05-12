'use strict';

angular.module('myFanPageApp')
	.directive('pageDetails', function (FanPageContent) {
		return {
			template: '<pre>{{valueProp}}</pre>',
			restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

					scope.valueProp = null;

					scope.$watch(function() {
						return FanPageContent.pageDetails;
					}, function(newVal, oldVal) {

						var pageDetailsProp = (attrs.value||'').toLowerCase();

						if (FanPageContent.pageDetails.hasOwnProperty(pageDetailsProp)) {
							scope.valueProp = FanPageContent.pageDetails[pageDetailsProp];
						}else{
							scope.valueProp = pageDetailsProp+' details not found.';
						};


					}, true);

				}
			}
		};
	});
