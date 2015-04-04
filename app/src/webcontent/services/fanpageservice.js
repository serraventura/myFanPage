'use strict';

angular.module('myFanPageApp').factory('FanPageService', function ($q, $log, $http, FanPageConfig, FanPageContent) {

	// Private API
	var publicApi = null;
	var URLAPI = 'http://graph.facebook.com';

	var getAlbum = function() {

		var d = $q.defer();
		publicApi.isError = false;

		$http.get(URLAPI+'/xxxx').then(function (res){

			if(res.error){

				publicApi.isError = res.message;
				return d.reject(res.message);

			}else if (Object.keys(res).length == 0) {

				publicApi.isError = 'No Data Available';
				return d.reject(publicApi.isError);

			}else {
				return d.resolve(res);
			};


		});

		return d.promise

	};

	// Public API
	var FanPageService = function() { // constructor

		// properties
		publicApi = this;
		this.pageContent = FanPageContent;

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

		this.getFeeds = function() {
			// body...
		}

		this.getPhotoPage = function() {

			var that = this;

			return getAlbum()
			.then(function(d) {
				var idAlbum = d.id;
				return getPictures();
			})
			.then(function(d) {

				d.listOfPicture;

			});

		};
		//###		


	};

	return FanPageService;

});
