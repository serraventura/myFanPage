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

			if(FanPageConfig.menu[prop].hasOwnProperty('active') && FanPageConfig.menu[prop].active){

				if( FanPageConfig.menu[prop].hasOwnProperty('hashtag') && (FanPageConfig.menu[prop].hashtag.indexOf('#')!=-1) ){
					hashtagProp = FanPageConfig.menu[prop].hashtag;
				};

				if(FanPageConfig.menu[prop].hasOwnProperty('tweet')){
					tweetProp = FanPageConfig.menu[prop].tweet;
				};

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
			var arrFanPageContentPages = [];

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

							arrFanPageContentPages.push({
								id: res.data[i].id,
								pictureId: res.data[i].object_id,
								hashtag: hashtagFound[0].hashtag,
								text: res.data[i].message,
								picture: undefined
							});

						};

					};

				};

			};

			FanPageContent.pages = arrFanPageContentPages;

			console.log('FanPageContent: ', FanPageContent);

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

		// methods ###
		this.getPageInfos = function() {

			var d = $q.defer();
			publicApi.isError = false;

			if (!FanPageConfig.menu.aboutFanPage.active) {
				publicApi.isError = true;
				d.reject('Content not active.');
				return d.promise;
			};

			$http.get(URLAPI+'/'+FanPageConfig.fanPageId).then(function (res){

				if(!res.data){

					publicApi.isError = true;
					return d.reject('No Data Found.');

				}else {

					FanPageContent.pageDetails.name = res.data.name;
					FanPageContent.pageDetails.about = res.data.about;
					FanPageContent.pageDetails.description = res.data.description;
					FanPageContent.pageDetails.likes = res.data.likes;

					if (res.data.cover) {
						FanPageContent.pageDetails.cover = res.data.cover.source;
					};

					publicApi.isError = false;
					return d.resolve(res);

				};


			}, function(res) {
				publicApi.isError = true;
				return d.reject(res);
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

			$http.get(URLAPI+'/'+FanPageConfig.fanPageId+'/photos').then(function (res){

				if(!res.data.data){

					publicApi.isError = true;
					return d.reject('No Data Found.');

				}else {

					FanPageContent.pageDetails.profilePicture.small = res.data.data[0].picture;
					FanPageContent.pageDetails.profilePicture.big = res.data.data[0].source;

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

		this.getContentByHashtag = function(hashtag) {

			var pageContentFound = undefined;
			var d = $q.defer();
			publicApi.isError = false;

			// check if content is already saved
			pageContentFound = FanPageContent.pages.filter(function(item){
				return item.hashtag==hashtag
			});

			if (pageContentFound.length>0) {
				d.resolve(pageContentFound);
				return d.promise;
			};

			$http.get(sURLAPI+'/'+FanPageConfig.fanPageId+'/feed/?access_token='+FanPageConfig.token+'&limit=250').then(function (res){

				if(!res.data.data){

					publicApi.isError = true;
					return d.reject('No Data Found.');

				}else {

					publicApi.isError = false;

					for (var i = 0; i < res.data.data.length; i++) {

						if (res.data.data[i].message) {

							if (res.data.data[i].message.indexOf(hashtag)!=-1) {

								FanPageContent.pages.push({
									id: res.data.data[i].id,
									pictureId: res.data.data[i].object_id,
									hashtag: hashtag,
									text: res.data.data[i].message,
									picture: undefined
								});

							};


						};

					};

					pageContentFound = FanPageContent.pages.filter(function(item){
						return item.hashtag==hashtag
					});

					return d.resolve(pageContentFound);
				};


			}, function(res) {

				publicApi.isError = true;
				return d.reject(res);

			});

			return d.promise

		}

		this.getPhotoPage = function() {

			var that = this;
			publicApi.isError = false;

			if (!FanPageConfig.menu.photoFanPage.active) {
				var d = $q.defer();
				publicApi.isError = true;
				d.reject('Content not active.');
				return d.promise;
			};

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
