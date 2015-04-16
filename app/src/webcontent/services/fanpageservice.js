'use strict';

angular.module('myFanPageApp').factory('FanPageService', function ($q, $log, $http, FanPageConfig, FanPageContent) {

	// Private API
	var publicApi = undefined;
	var URLAPI = 'http://graph.facebook.com';
	var sURLAPI = 'https://graph.facebook.com';

	var getAlbum = function() {

		var d = $q.defer();
		publicApi.isError = false;

		$http.get(URLAPI+'/'+FanPageConfig.fanPageId+'/albums').then(function (res){

			if(res.error){

				publicApi.isError = res.message;
				return d.reject(res.message);

			}else {
				return d.resolve(res);
			};


		});

		return d.promise

	};

	var getMenuContentByHashtag = function(res) {

		var arrHashtag = [];
		var prop;

		for (prop in FanPageConfig.menu){

			if(FanPageConfig.menu[prop].hasOwnProperty('hashtag')){
				arrHashtag.push(FanPageConfig.menu[prop].hashtag);
			}

		};
	
		//x.filter(function(item){return item.hashtag=='#ourservices'}).length
		if (res.data.data) {

			var hashtagFound;

			for (var i = 0; i < res.data.data.length; i++) {

				if (res.data.data[i].message) {

					hashtagFound = arrHashtag.filter(function(item){
						return (res.data.data[i].message.indexOf(item)!=-1);
					});

					if (hashtagFound.length>0) {

						FanPageContent.pages.push(
							{
							  hashtag: hashtagFound[0],
							  text: res.data.data[i].message,
							  pictures: []
							}
						);

					};


				};

				console.log(res.data.data[i].message);
			};

			console.log(FanPageContent);

		};

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

		var d = $q.defer();
		publicApi.isError = false;

		$http.get(URLAPI+'/'+idAlbum+'/photos').then(function (res){

			if(res.error){

				publicApi.isError = res.message;
				return d.reject(res.message);

			}else {
				return d.resolve(res);
			};


		});

		return d.promise

	}

	// Public API
	var FanPageService = function() { // constructor

		// properties
		publicApi = this;
		this.pageContent = FanPageContent;
		this.menuOptions = FanPageConfig.menu;

		// methods ###
		this.getPageInfos = function() {

			var d = $q.defer();
			publicApi.isError = false;

			$http.get(URLAPI+'/'+FanPageConfig.fanPageId).then(function (res){

				if(res.error){

					publicApi.isError = res.message;
					return d.reject(res.message);

				}else {

					FanPageContent.pageDetails.name = res.data.name;
					FanPageContent.pageDetails.about = res.data.about;
					FanPageContent.pageDetails.description = res.data.description;
					FanPageContent.pageDetails.likes = res.data.likes;

					return d.resolve(res);

				};


			});

			return d.promise

		}

		this.getMenuContent = function() {

			var d = $q.defer();
			publicApi.isError = false;

			$http.get(sURLAPI+'/'+FanPageConfig.fanPageId+'/feed/?access_token='+FanPageConfig.token).then(function (res){

				if(res.error){

					publicApi.isError = res.message;
					return d.reject(res.message);

				}else {

					getMenuContentByHashtag(res);

					return d.resolve(res);
				};


			});

			return d.promise

		}

		this.getPhotoPage = function() {

			var that = this;

			return getAlbum()
			.then(function(d) {
				var idAlbum = getWebsiteAlbumId(d.data.data);
				return getPictures(idAlbum);
			})
			.then(function(d) {

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

			});

		};
		//###		


	};

	return FanPageService;

});
