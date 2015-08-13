'use strict';

angular.module('myFanPageApp').factory('PageDetailService', function ($q, $log, $http, FanPageConfig, FanPageContent) {

	// Private API
	var publicApi = undefined;
	var URLAPI = 'http://graph.facebook.com';
	var sURLAPI = 'https://graph.facebook.com';

	var getOriginalCoverPicture = function (coverId) {

		var d = $q.defer();
		publicApi.isError = false;

		if (!FanPageConfig.menu.aboutFanPage.active) {
			publicApi.isError = true;
			d.reject('Content not active.');
			return d.promise;
		};

		$http.get(sURLAPI+'/'+coverId+'/?access_token='+FanPageConfig.token).then(function (res){

			if(!res.data){

				publicApi.isError = true;
				d.reject('No Data Found.');

			}else {

				if (FanPageConfig.coverPicture) {
					FanPageContent.pageDetails.cover.original = res.data.images[0].source;
				};

				publicApi.isError = false;
				d.resolve(res);

			};


		}, function(res) {
			publicApi.isError = true;
			d.reject(res);
		});

		return d.promise

	};

	// Public API
	var PageDetailService = function() { // constructor

		// properties
		publicApi = this;

		// methods ###
		this.getPageInfos = function() {

			var d = $q.defer();
			publicApi.isError = false;

			if (!FanPageConfig.menu.aboutFanPage.active) {
				publicApi.isError = true;
				d.reject('Content not active.');
				return d.promise;
			};

			$http.get(sURLAPI+'/'+FanPageConfig.fanPageId+'/?access_token='+FanPageConfig.token).then(function (res){

				if(!res.data){

					publicApi.isError = true;
					d.reject('No Data Found.');

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
					d.resolve(res);

				};


			}, function(res) {
				publicApi.isError = true;
				d.reject(res);
			});

			return d.promise

		}

		this.getProfilePicture = function() {

			var d = $q.defer();
			publicApi.isError = false;

			if (!FanPageConfig.profilePicture) {
				publicApi.isError = true;
				d.reject('Content not active.');
				return d.promise;
			};

			$http.get(sURLAPI+'/'+FanPageConfig.fanPageId+'/photos/?access_token='+FanPageConfig.token).then(function (res){

				if(!res.data.data){

					publicApi.isError = true;
					d.reject('No Data Found.');

				}else {

					FanPageContent.pageDetails.profilePicture.small = res.data.data[0].picture;
					FanPageContent.pageDetails.profilePicture.big = res.data.data[0].source;

					publicApi.isError = false;
					d.resolve(res);

				};

			}, function(res) {
				publicApi.isError = true;
				d.reject(res);
			});

			return d.promise

		}
		//###		


	};

	return PageDetailService;

});
