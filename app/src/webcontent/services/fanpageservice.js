'use strict';

angular.module('myFanPageApp').factory('FanPageService', function ($q, $log, $http) {

	// Private API
	var publicApi = null;

	var getAlbum = function() {

		var d = $q.defer();
		publicApi.isError = false;

		$http.get('http://graph.facebook.com/myfanpageapp').then(function (res){

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

		// methods ###

		this.getAboutPage = function() {
			// body...
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
