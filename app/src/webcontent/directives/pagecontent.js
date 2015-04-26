'use strict';

angular.module('myFanPageApp')
	.directive('pageContent', function (FanPageContent, FanPageService, $routeParams) {
		return {
			template: '<p ng-repeat="page in pageContent track by $index">{{page.text}}</p>',
			restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

					scope.pageContent = [];

					scope.$watch(function() {
						return FanPageContent.pages;
					}, function(newVal, oldVal) {

						var hashtagProp = (attrs.hashtag||'').toLowerCase();
						var itemProp = attrs.item;

						// if property hashtag is provided do the search directly on pages array by hashtag
						if (hashtagProp!='') {

							var tweetProp = (attrs.tweet||'false');

							var itemFound = FanPageContent.pages.filter(function(item) {
								return item.hashtag == hashtagProp;
							});

							if (itemFound.length==0) {

								var fanPageService = new FanPageService();
								fanPageService.getContentByHashtag(hashtagProp).then(function (item) {

									if (tweetProp === 'true') {
										scope.pageContent = itemProp?[item[itemProp]]:item;
									}else{
										scope.pageContent = [item[itemProp||0]];
									};

								});

							}else{

								if (tweetProp === 'true') {
									scope.pageContent = itemProp?[itemFound[itemProp]]:itemFound;
								}else{
									scope.pageContent = [itemFound[itemProp||0]];
								};

							};

						}else{ //if property hashtag is NOT provided, first do the search by route to find the right hashtag

							if (FanPageContent.menuOptions.hasOwnProperty($routeParams.name||'')) {

								if (FanPageContent.menuOptions[$routeParams.name].hasOwnProperty('hashtag')) {

									var hashtag = FanPageContent.menuOptions[$routeParams.name].hashtag;
									var itemFound = FanPageContent.pages.filter(function(item) {
										return item.hashtag == hashtag;
									});

									var tweetProp = (FanPageContent.menuOptions[$routeParams.name].hasOwnProperty('tweet') && FanPageContent.menuOptions[$routeParams.name].tweet);

									if (tweetProp) {
										scope.pageContent = itemProp?[itemFound[itemProp]]:itemFound;
									}else{
										scope.pageContent = [itemFound[itemProp||0]];
									};

								};

							};

						};

					}, true);

				}
			}
		};
	});
