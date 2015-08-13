'use strict';

angular.module('myFanPageApp').factory('FeedService', function ($q, $log, $http, FanPageConfig, FanPageContent) {

	// Private API
	var publicApi = undefined;
	var URLAPI = 'http://graph.facebook.com';
	var sURLAPI = 'https://graph.facebook.com';

	var setContentByType = function(data, hashtag) {

		var page = angular.copy(FanPageContent.pages);

    switch((data.caption||'').toLowerCase()){
      case 'soundcloud.com':
        page[0].picture = undefined;
        break;

      case 'youtube.com':
        var template = 'http://img.youtube.com/vi/{ID}/mqdefault.jpg';
        page[0].picture = template.replace('{ID}', MYFP.util.getYoutubeIdFromURL(data.link));
        break;

      default:

        if (data.type == 'link') {
          page[0].picture = data.picture;
        }else{
          page[0].picture = undefined;
        }

        break;

    };

		page[0].id = data.id;
		page[0].pictureId = data.object_id;
		page[0].hashtag = hashtag;
		page[0].text = data.message;
		page[0].type = data.caption||data.type;
		page[0].externalLink = data.link;

		return page[0];

	};

	var setMenuContentByHashtag = function(res) {

    var d = $q.defer();

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
							arrFanPageContentPages.push(setContentByType(res.data[i], hashtagFound[0].hashtag));
						};

					};

				};

			};

			FanPageContent.pages = arrFanPageContentPages;
      console.log('FanPageContent: ', FanPageContent);

      d.resolve(FanPageContent);

		}else{
      d.reject('Data not found');
    }

    return d.promise;

	};

  var getPicturesByFeedId = function(id, field) {

    var d = $q.defer();
    publicApi.isError = false;

    $http.get(sURLAPI+'/'+id+'/?access_token='+FanPageConfig.token+'&fields='+field).then(function (res){

      if(!res.data){

        publicApi.isError = true;
        d.reject('No Data Found.');

      }else{

        publicApi.isError = false;
        d.resolve(res);

      };


    }, function(res) {

      publicApi.isError = true;
      d.reject(res);

    });

    return d.promise

  };

  var requestMenuContent = function() {

    var d = $q.defer();
    publicApi.isError = false;

    $http.get(sURLAPI+'/'+FanPageConfig.fanPageId+'/feed/?access_token='+FanPageConfig.token+'&limit=250').then(function (res){

      if(!res.data.data){

        publicApi.isError = true;
        d.reject('No Data Found.');

      }else{

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
	var FeedService = function() { // constructor

		// properties
		publicApi = this;

		// methods ###
		this.getMenuContent = function() {

      var d = $q.defer();

      return requestMenuContent()
        .then(function(res) {
          return setMenuContentByHashtag(res.data);
        }, function(err){
          d.reject(err);
        })
        .then(function(res) {

          // getting big picture ###
          var promisesAttachments = [];

          // check all contents type "photo" and retrieve them
          for (var i = 0; i < FanPageContent.pages.length; i++) {

            if(FanPageContent.pages[i].type.toLowerCase() == 'photo'){
              promisesAttachments.push(getPicturesByFeedId(FanPageContent.pages[i].id, 'attachments'));
            }

          }

          $q.all(promisesAttachments).then(function (data) {

            if (!data) {
              d.reject('No Data Found.');
              return false;
            };

            var subattachments, idx;

            for (var i = 0; i < data.length; i++) {

              if( data[i].data.attachments.data[0].hasOwnProperty('subattachments') ){

                subattachments = [];

                for (var j = 0; j < data[i].data.attachments.data[0].subattachments.data.length; j++) {

                  subattachments.push({
                    big: data[i].data.attachments.data[0].subattachments.data[j].media.image.src,
                    small: data[i].data.attachments.data[0].subattachments.data[j].target.id
                  });

                };

                idx = _.findIndex(FanPageContent.pages, function(item) {
                  return item.id == data[i].data.id;
                });

                FanPageContent.pages[idx].picture = subattachments;

              }else{

                idx = _.findIndex(FanPageContent.pages, function(item) {
                  return item.id == data[i].data.id;
                });

                FanPageContent.pages[idx].picture = {
                  big: data[i].data.attachments.data[0].media.image.src,
                  small: data[i].data.attachments.data[0].target.id
                };

              }

            }

            // ############
            // TODO: find a way to improve performance for this code (maybe lodash)

            var promisesPicture = [];

            var arrPics = _.flatten(_.map(FanPageContent.pages, function(item){
              if(item.type == 'photo') {
                return item.picture
              }
            }));

            // check all contents type "photo" and retrieve them
            for (var i = 0; i < arrPics.length; i++) {

              if(arrPics[i]){
                promisesPicture.push(getPicturesByFeedId(arrPics[i].small, 'picture'));
              }

            }

            $q.all(promisesPicture).then(function (data) {

              for (var c = 0; c < data.length; c++) {

                for (var i = 0; i < FanPageContent.pages.length; i++) {

                  if(FanPageContent.pages[i].type.toLowerCase() == 'photo'){

                    if(FanPageContent.pages[i].picture && (_.isObject(FanPageContent.pages[i].picture) || _.isArray(FanPageContent.pages[i].picture)) ){


                      if( _.isArray(FanPageContent.pages[i].picture) ){

                        for (var j = 0; j < FanPageContent.pages[i].picture.length; j++) {

                          if(FanPageContent.pages[i].picture[j].small == data[c].data.id){
                            FanPageContent.pages[i].picture[j].small = data[c].data.picture;
                          }

                        }

                      }else{

                        if(FanPageContent.pages[i].picture.small == data[c].data.id){
                          FanPageContent.pages[i].picture.small = data[c].data.picture;
                        }

                      }

                    }

                  }

                }

              }

            }, function(err){
              d.reject(err);
            });

            d.resolve(data);

          }, function(err){
            d.reject(err);
          });

        }, function(err){
          d.reject(err);
        });

        return d.promise;

		};

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
					d.reject('No Data Found.');

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

					d.resolve(pageContentFound);
				};


			}, function(res) {

				publicApi.isError = true;
				return d.reject(res);

			});

			return d.promise

		};
		//###


	};

	return FeedService;

});
