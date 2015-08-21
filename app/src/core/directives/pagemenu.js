'use strict';

angular.module('myFanPageApp')
	.directive('pageMenu', function (FanPageContent, FanPageConfig, $timeout) {
		return {
			templateUrl: 'src/core/views/page-menu.html',
      restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

          $timeout(function () {

            $(element.find('a')).bind('click', function () {

              var anchor = $(angular.element(this).attr('href'));

              if( FanPageConfig.anchorContent && anchor.length > 0 ){
                anchor[0].scrollIntoView();
              }

            });

          });

					scope.menuOptions = FanPageContent.menuOptions;

				}
			}
		};
	});
