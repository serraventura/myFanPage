'use strict';

angular.module('myFanPageApp').service('FanPageContent', function FanPageContent(FanPageConfig) {

  var self = this;

  var FanPageContent = {};

  FanPageContent.isCached = false;

  FanPageContent.pageDetails = {
  	name: undefined,
  	about: undefined,
  	description: undefined,
  	likes: undefined,
    cover: {
      original: undefined,
      picture: undefined
    },
    profilePicture: {
      small: undefined,
      big: undefined
    }
  };

  FanPageContent.pictures = [

    {
      small: undefined,
      big: undefined,
      description: undefined
    }

  ];

  FanPageContent.menuOptions = FanPageConfig.menu;

  FanPageContent.pages = [

    {
      id: '0300303030',
      pictureId: '999399393',
      hashtag: '#anyhashtag',
      text: 'test test test...',
      picture: 'http://img.youtube.com/vi/BLqxR1YXZj4/0.jpg',
      type: 'youtube',
      externalLink: 'https://www.youtube.com/watch?v=BLqxR1YXZj4'
    }

  ];

  (function(){

      //TODO: maybe the cache checking should be isolated
      if(typeof Storage !== 'undefined'){

        if(localStorage.getItem('fanPageContentCache') != null){

          try{

            var cache = JSON.parse(localStorage.getItem('fanPageContentCache'));

            if (moment().diff(moment(cache.dateCriation), 'days') < 1) {

              FanPageContent.isCached = true;
              FanPageContent.pageDetails = cache.data.pageDetails;
              FanPageContent.pictures = cache.data.pictures;
              FanPageContent.menuOptions = cache.data.menuOptions;
              FanPageContent.pages = cache.data.pages;

            };

          }catch(err){
            console.log('Error in cache: ', err);
          }

        }

      }

  })()

  return FanPageContent;

});