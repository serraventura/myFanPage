'use strict';

angular.module('myFanPageApp')
	.directive('pageDetails', function (FanPageContent, FanPageConfig) {
		return {
			template: function(element, attrs) {

				var pageDetailsProp = (attrs.value||'').toLowerCase();
				var responsive = (attrs.responsive||'false');

				if (pageDetailsProp == 'profilepicture' || pageDetailsProp == 'picture' || pageDetailsProp == 'logo') {

					return '<img ng-src="{{valueProp}}" />';

				}else if (pageDetailsProp == 'cover') {

					if (responsive === 'true') {
						return '<img class="myfp__image--responsive" ng-src="{{valueProp}}" />';
					}else{
						return '<img ng-src="{{valueProp}}" />';
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
									scope.valueProp = (FanPageContent.pageDetails[pageDetailsProp]|'').big;
								}else{
									scope.valueProp = (FanPageContent.pageDetails[pageDetailsProp]||'').small;
								};

							}else{

								if (pageDetailsProp === 'about' || pageDetailsProp === 'description') {
									scope.valueProp = MYFP.util.replaceURLWithHTMLLinks(FanPageContent.pageDetails[pageDetailsProp]||'');
								}else if (pageDetailsProp === 'cover') {

                  var defaultCoverPicture = scope.templatePath + '/cover.jpg';

                  if(FanPageConfig.coverPicture){

                    if (original === 'true') {
                      scope.valueProp = _.get(FanPageContent, ['pageDetails', pageDetailsProp, 'original'], defaultCoverPicture);
                    }else{
                      scope.valueProp = _.get(FanPageContent, ['pageDetails', pageDetailsProp, 'picture'], defaultCoverPicture);
                    };

                  }else{
                    scope.valueProp = defaultCoverPicture;
                  }

								}else{
									scope.valueProp = FanPageContent.pageDetails[pageDetailsProp];
								};

							};

						}else{
							scope.valueProp = pageDetailsProp+' details not found.';
						};

					}, true);

				}
			}
		};
	});
