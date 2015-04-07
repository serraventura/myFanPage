'use strict';

angular.module('myFanPageApp').constant('FanPageConfig', {

	fanPageId: 'myfanpageapp',
	template: 'default',
	coverPicture: true,

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
			tweetsActive: false,
			name: 'Blog',
			hashtag: '#blog'
		},
		services: {
			active: true,
			name: 'Services',
			hashtag: '#ourservices'
		}

	}

});
