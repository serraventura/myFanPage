'use strict';

angular.module('myFanPageApp')
	.directive('pageContent', function (FanPageContent, FeedService, $routeParams, limitToFilter) {
    //TODO: enable contents with multiple pictures. The property "page.picture" could be a single link or an array of links
		return {
			templateUrl: 'src/core/views/page-content.html',
      restrict: 'E',
			scope: true,
			replace: true,
			controller: function ($scope) {

				$scope.infinitePage = 0;
				$scope.loadMore = function() {

					// if($scope.infinitePage < ($scope.getItemsPerPage+1) ){
					if($scope.infinitePage < $scope.pageContent.length){
						$scope.infinitePage += parseInt($scope.getItemsPerPage/2);
						$scope.lazyPageContent = limitToFilter($scope.pageContent, $scope.infinitePage);
					};

				};

			},
			link: {
				post: function(scope, element, attrs) {

					var _itemsPerPage = 100;
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
										scope.active = true;
										scope.getItemsPerPage = _itemsPerPage;
										scope.pageContent = itemProp?[item[itemProp]]:item;
										scope.lazyPageContent = limitToFilter(scope.pageContent, parseInt(scope.getItemsPerPage/2));
									}else{
										scope.active = false;
										scope.getItemsPerPage = _infiniteItemsPerPage;
										scope.pageContent = [item[itemProp||0]];
										scope.lazyPageContent = limitToFilter(scope.pageContent, parseInt(scope.getItemsPerPage/2));
									};

								});

							}else{

								if (tweetProp === 'true') {
									scope.active = true;
									scope.getItemsPerPage = _itemsPerPage;
									scope.pageContent = itemProp?[itemFound[itemProp]]:itemFound;
									scope.lazyPageContent = limitToFilter(scope.pageContent, parseInt(scope.getItemsPerPage/2));
								}else{
									scope.active = false;
									scope.getItemsPerPage = _infiniteItemsPerPage;
									scope.pageContent = [itemFound[itemProp||0]];
									scope.lazyPageContent = limitToFilter(scope.pageContent, parseInt(scope.getItemsPerPage/2));
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
										scope.lazyPageContent = limitToFilter(scope.pageContent, parseInt(scope.getItemsPerPage/2));

									}else{

										scope.active = false;
										scope.getItemsPerPage = _infiniteItemsPerPage;
										scope.pageContent = [itemFound[itemProp||0]];
										scope.lazyPageContent = limitToFilter(scope.pageContent, parseInt(scope.getItemsPerPage/2));

									};

								};

							};

						};

					}, true);

				}
			}
		};
	});
