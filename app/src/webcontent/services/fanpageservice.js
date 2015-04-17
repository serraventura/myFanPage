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

			if(!res.data.data){

				publicApi.isError = true;
				return d.reject('No Data Found.');

			}else {
				return d.resolve(res);
			};


		}, function (res) {
			publicApi.isError = true;
			return d.reject(res);
		});

		return d.promise

	};

	var getMenuContentByHashtag = function(res) {

		var arrConfigProp = [];
		var prop;
		var	hashtagProp;
		var	tweetProp;

		for (prop in FanPageConfig.menu){

			hashtagProp = undefined;
			tweetProp = undefined;

			if(FanPageConfig.menu[prop].hasOwnProperty('hashtag')){
				hashtagProp = FanPageConfig.menu[prop].hashtag;
			};

			if(FanPageConfig.menu[prop].hasOwnProperty('tweet')){
				tweetProp = FanPageConfig.menu[prop].tweet;
			};

			if (hashtagProp || tweetProp) {

				arrConfigProp.push({
					hashtag: hashtagProp,
					tweet: tweetProp
				});

			};

		};
	
		if (res.data) {

			var hashtagFound;
			var pageContentFound = 0;

			for (var i = 0; i < res.data.length; i++) {

				if (res.data[i].message) {

					hashtagFound = arrConfigProp.filter(function(item){
						return (res.data[i].message.indexOf(item.hashtag)!=-1);
					});

					if (hashtagFound.length>0) {

						// check if content is already saved
						pageContentFound = FanPageContent.pages.filter(function(item){
							return item.hashtag==hashtagFound[0].hashtag
						}).length;

						if ( ((pageContentFound>0 && hashtagFound[0].tweet) || pageContentFound==0) ) {

							FanPageContent.pages.push({
								id: res.data[i].id,
								hashtag: hashtagFound[0].hashtag,
								text: res.data[i].message,
								pictures: []
							});

						};

					};

				};

				console.log(res.data[i].message);
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

			if(!res.data.data){

				publicApi.isError = true;
				return d.reject('No Data Found.');

			}else {
				publicApi.isError = false;
				return d.resolve(res);
			};


		}, function (res) {
			publicApi.isError = true;
			return d.reject(res);
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

				if(!res.data){

					publicApi.isError = true;
					return d.reject('No Data Found.');

				}else {

					FanPageContent.pageDetails.name = res.data.name;
					FanPageContent.pageDetails.about = res.data.about;
					FanPageContent.pageDetails.description = res.data.description;
					FanPageContent.pageDetails.likes = res.data.likes;

					publicApi.isError = false;
					return d.resolve(res);

				};


			}, function(res) {
				publicApi.isError = true;
				return d.reject(res);
			});

			return d.promise

		}

		this.getMenuContent = function() {

			var d = $q.defer();
			publicApi.isError = false;

			$http.get(sURLAPI+'/'+FanPageConfig.fanPageId+'/feed/?access_token='+FanPageConfig.token+'&limit=250').then(function (res){

				if(!res.data.data){

					publicApi.isError = true;
					return d.reject('No Data Found.');

				}else {

					publicApi.isError = false;
					getMenuContentByHashtag(res.data);

					return d.resolve(res);
				};


			}, function(res) {

				publicApi.isError = true;
				return d.reject(res);

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
