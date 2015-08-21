'use strict';

angular.module('myFanPageApp').factory('PageDetailService', function ($q, $log, $http, FanPageConfig, FanPageContent, API) {

	// Private API
	var publicApi = undefined;

	var getOriginalCoverPicture = function (coverId) {

		var defer = $q.defer();
		publicApi.isError = false;

		if (!FanPageConfig.menu.aboutFanPage.active) {
			publicApi.isError = true;
			defer.reject('Content not active.');
			return defer.promise;
		};

		$http.get( API.get('identifier', coverId) ).then(function (res){

			if(!res.data){

				publicApi.isError = true;
				defer.reject('No Data Found.');

			}else {

				if ( FanPageConfig.coverPicture && _.has(res.data, 'images') ) {
					FanPageContent.pageDetails.cover.original = res.data.images[0].source;
				};

				publicApi.isError = false;
				defer.resolve(res);

			};


		}, function(res) {
			publicApi.isError = true;
			defer.reject(res);
		});

		return defer.promise

	};

	// Public API
	var PageDetailService = function() { // constructor

		// properties
		publicApi = this;

		// methods ###
		this.getPageInfos = function() {

			var defer = $q.defer();
			publicApi.isError = false;

			if (FanPageContent.isCached) {
				defer.resolve();
				return defer.promise;
			};

			if (!FanPageConfig.menu.aboutFanPage.active) {
				publicApi.isError = true;
				defer.reject('Content not active.');
				return defer.promise;
			};

			$http.get( API.get('identifier', FanPageConfig.fanPageId) ).then(function (res){

				if(!res.data){

					publicApi.isError = true;
					defer.reject('No Data Found.');

				}else {

					FanPageContent.pageDetails.name = res.data.name;
					FanPageContent.pageDetails.about = res.data.about;
					FanPageContent.pageDetails.description = res.data.description;
					FanPageContent.pageDetails.likes = res.data.likes;

					if (res.data.cover && FanPageConfig.coverPicture) {
						FanPageContent.pageDetails.cover = {};
						FanPageContent.pageDetails.cover.picture = res.data.cover.source;
						getOriginalCoverPicture(res.data.cover.id);
					};

					publicApi.isError = false;
					defer.resolve(res);

				};


			}, function(res) {
				publicApi.isError = true;
				defer.reject(res);
			});

			return defer.promise

		}

		this.getProfilePicture = function() {

			var defer = $q.defer();
			publicApi.isError = false;

			if (FanPageContent.isCached) {
				defer.resolve();
				return defer.promise;
			};

			if (!FanPageConfig.profilePicture) {
				publicApi.isError = true;
				defer.reject('Content not active.');
				return defer.promise;
			};

			$http.get( API.get('photos', FanPageConfig.fanPageId) ).then(function (res){

				if(!res.data.data){

					publicApi.isError = true;
					defer.reject('No Data Found.');

				}else {

					FanPageContent.pageDetails.profilePicture.small = res.data.data[0].picture;
					FanPageContent.pageDetails.profilePicture.big = res.data.data[0].source;

					publicApi.isError = false;
					defer.resolve(res);

				};

			}, function(res) {
				publicApi.isError = true;
				defer.reject(res);
			});

			return defer.promise

		}
		//###

	};

	return PageDetailService;

});
