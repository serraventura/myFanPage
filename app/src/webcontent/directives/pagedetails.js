'use strict';

angular.module('myFanPageApp')
	.directive('pageDetails', function (FanPageContent) {
		return {
			//template: '<pre>{{valueProp}}</pre>',
			template: function(element, attrs) {

				var pageDetailsProp = (attrs.value||'').toLowerCase();
				var responsive = (attrs.responsive||'false');

				if (pageDetailsProp == 'profilepicture' || pageDetailsProp == 'picture' || pageDetailsProp == 'logo') {

					return '<img src="{{valueProp}}" />';

				}else if (pageDetailsProp == 'cover') {

					if (responsive === 'true') {
						return '<img class="myfp--responsive-image" src="{{valueProp}}" />';
					}else{
						return '<img src="{{valueProp}}" />';
					};

				}else{
					return '<p ng-bind-html="valueProp"></p>';
				};

			},
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
						var original = (attrs.original||'false');

						if (pageDetailsProp == 'profilepicture' || (pageDetailsProp == 'picture' || pageDetailsProp == 'logo') ) {
							pageDetailsProp = 'profilePicture';
						};

						if (FanPageContent.pageDetails.hasOwnProperty(pageDetailsProp)) {

							if (pageDetailsProp == 'profilePicture') {

								if (original === 'true') {
									scope.valueProp = FanPageContent.pageDetails[pageDetailsProp].big;
								}else{
									scope.valueProp = FanPageContent.pageDetails[pageDetailsProp].small;
								};

							}else{
								scope.valueProp = FanPageContent.pageDetails[pageDetailsProp];
							};

						}else{
							scope.valueProp = pageDetailsProp+' details not found.';
						};

					}, true);

				}
			}
		};
	});
