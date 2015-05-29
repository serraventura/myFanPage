'use strict';

angular.module('myFanPageApp').service('FanPageContent', function FanPageContent(FanPageConfig) {

  var self = this;

  this.pageDetails = {
  	name: undefined,
  	about: undefined,
  	description: undefined,
  	likes: undefined,
    cover: undefined,
    profilePicture: {
      small: undefined,
      big: undefined
    }
  };

  this.pictures = [

    {
      small: undefined,
      big: undefined,
      description: undefined
    }

  ];

  this.menuOptions = FanPageConfig.menu;

  this.pages = [

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


});