'use strict';

angular.module('myFanPageApp').constant('FanPageConfig', {

	fanPageId: 'myfanpageapp',
	template: 'default',
	coverPicture: true,
	profilePicture: true,
	token: '809855312442090|MUv2SpoA7I3TCbsljWe1mDJy_Jg',

	menu: {

		aboutFanPage: {
			active: true,
			name: 'About us',
			location: true
		},
		photoFanPage: {
			active: true,
			name: 'Photos',
			album: 'Website'
		},
		blogFanPage: {
			active: true,
			tweet: true,
			name: 'Blog',
			hashtag: '#blog'
		},
		service: {
			active: true,
			name: 'Services',
			hashtag: '#ourservices'
		}

	}

});
