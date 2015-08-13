'use strict';

angular.module('myFanPageApp').factory('PhotoService', function ($q, $log, $http, FanPageConfig, FanPageContent) {

	// Private API
	var publicApi = undefined;
	var URLAPI = 'http://graph.facebook.com';
	var sURLAPI = 'https://graph.facebook.com';

	var getAlbum = function() {

		var defer = $q.defer();
		publicApi.isError = false;

		$http.get(sURLAPI+'/'+FanPageConfig.fanPageId+'/albums/?access_token='+FanPageConfig.token).then(function (res){

			if(!res.data.data){

				publicApi.isError = true;
				defer.reject('No Data Found.');

			}else {
				defer.resolve(res);
			};


		}, function (res) {
			publicApi.isError = true;
			defer.reject(res);
		});

		return defer.promise

	};

	var getWebsiteAlbumId = function(data) {

		var albumId = undefined;
		var len = data.length;

		for (var i = 0; i < len; i++) {

			if ( data[i].name.toLowerCase() == FanPageConfig.menu.photoFanPage.album.toLowerCase() ) {

				albumId = data[i].id;
				break;

			};

		};

		return albumId;

	}

	var getPictures = function(idAlbum) {

		var defer = $q.defer();
		publicApi.isError = false;

		$http.get(sURLAPI+'/'+idAlbum+'/photos/?access_token='+FanPageConfig.token).then(function (res){

			if(!res.data.data){

				publicApi.isError = true;
				defer.reject('No Data Found.');

			}else {
				publicApi.isError = false;
				defer.resolve(res);
			};


		}, function (res) {
			publicApi.isError = true;
			defer.reject(res);
		});

		return defer.promise

	}

	// Public API
	var PhotoService = function() { // constructor

		// properties
		publicApi = this;

		// methods ###
		this.getPhotoPage = function() {

			var defer = $q.defer();
			var that = this;
			publicApi.isError = false;

			if (!FanPageConfig.menu.photoFanPage.active) {
				publicApi.isError = true;
				defer.reject('Content not active.');
				return defer.promise;
			};

			return getAlbum()
			.then(function(d) {
				var idAlbum = getWebsiteAlbumId(d.data.data);
				return getPictures(idAlbum);
			}, function(err){
				defer.reject(err);
			})
			.then(function(d) {

				if (d.data.data) {

					var len = d.data.data.length;
					var pictures = [];

					for (var i = 0; i < len; i++) {
						
						pictures.push({
							small: d.data.data[i].picture,
							big: d.data.data[i].source,
							description: d.data.data[i].name
						});

					};

					FanPageContent.pictures = pictures;
					defer.resolve(d);

				}else{
					defer.reject('Content Not Found.');
				}

			}, function(err) {
				defer.reject(err);
			});

			return defer.promise

		};
		//###		


	};

	return PhotoService;

});
