'use strict';

angular.module('myFanPageApp')
	.directive('pageContent', function (FanPageContent, FeedService, $routeParams) {
		return {
			template: '<div><div class="myfp--feeds-post" dir-paginate="page in pageContent|itemsPerPage:getItemsPerPage track by $index"><div class="myfp--wrap-text-image"><img ng-if="page.picture" src="{{page.picture}}" /></div><p ng-bind-html="page.text|enableLink"></p></div><dir-pagination-controls ng-if="active"></dir-pagination-controls></div>',
			restrict: 'E',
			scope: true,
			replace: true,
			link: {
				post: function(scope, element, attrs) {

					var _itemsPerPage = 2;
					var _infiniteItemsPerPage = 999999;

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

								// var fanPageService = new FanPageService();
								var feedService = new FeedService();
								feedService.getContentByHashtag(hashtagProp).then(function (item) {

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

								var tweetProp = (FanPageContent.menuOptions[$routeParams.name].hasOwnProperty('tweet') && FanPageContent.menuOptions[$routeParams.name].tweet);

								if (FanPageContent.menuOptions[$routeParams.name].hasOwnProperty('hashtag')) {

									var hashtag = FanPageContent.menuOptions[$routeParams.name].hashtag;
									var itemFound = FanPageContent.pages.filter(function(item) {
										return item.hashtag == hashtag;
									});

									if (tweetProp) {

										if (FanPageContent.menuOptions[$routeParams.name].hasOwnProperty('pagination')) {

											scope.active = FanPageContent.menuOptions[$routeParams.name].pagination.active;

											if (!scope.active) {
												scope.getItemsPerPage = _infiniteItemsPerPage;
											}else{
												scope.getItemsPerPage = FanPageContent.menuOptions[$routeParams.name].pagination.itemsPerPage;
											};

										}else{
											scope.active = true;
											scope.getItemsPerPage = _itemsPerPage;
										};

										scope.pageContent = itemProp?[itemFound[itemProp]]:itemFound;

									}else{

										scope.active = false;
										scope.getItemsPerPage = _infiniteItemsPerPage;
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
