'use strict';

angular.module('myFanPageApp')
	.directive('pageDetails', function (FanPageContent, FanPageConfig) {
		return {
			//template: function(element, attrs) {
            //
			//	var pageDetailsProp = (attrs.value||'').toLowerCase();
			//	var responsive = (attrs.responsive||'false');
            //
			//	if (pageDetailsProp == 'profilepicture' || pageDetailsProp == 'picture' || pageDetailsProp == 'logo') {
            //
			//		return '<img class=" logo" ng-src="{{valueProp}}" />';
            //
			//	}else if (pageDetailsProp == 'cover') {
            //
			//		if (responsive === 'true') {
			//			return '<div class="myfp__pagedetails cover-wrapper"><img class="cover" ng-src="{{valueProp}}" /></div>';
			//		}else{
			//			return '<img class="myfp__pagedetails" ng-src="{{valueProp}}" />';
			//		};
            //
			//	}else{
			//		return '<p class="myfp__pagedetails title" ng-bind-html="valueProp"></p>';
			//	};
            //
			//},
      templateUrl: 'src/core/views/page-details.html',
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
            var responsive = (attrs.responsive||'false');

            scope.pageDetailsProp = pageDetailsProp;
            scope.original = original;
            scope.responsive = responsive;

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
