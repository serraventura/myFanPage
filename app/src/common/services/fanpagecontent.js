'use strict';

angular.module('myFanPageApp').service('FanPageContent', function FanPageContent() {

  var th = this;

  this.pageDetails = {
  	name: undefined,
  	about: undefined,
  	description: undefined,
  	likes: undefined
  };

  this.pictures = [

    {
      small: undefined,
      big: undefined,
      description: undefined
    }

  ];

  this.pages = [

    {
      hashtag: '#ourservices',
      title: '',
      text: '',
      pictures: []
    }

  ];


});