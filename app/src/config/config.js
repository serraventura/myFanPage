'use strict';

angular.module('myFanPageApp').constant('FanPageConfig', {

	fanPageId: 'myfanpageapp',
	template: 'default',
	coverPicture: false,
	profilePicture: true,
	token: '390919341102414|M7umyjZFedSGfPhQ4QXnOvhMXX4',
  anchorContent: false,

	 //server: {
	 //	api: 'http://localhost:3001/api'
	 //},

	menu: {

		aboutFanPage: {
			active: true,
			name: 'About us',
			location: true,
      initialPage: false
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
			hashtag: '#blog',
			pagination: {
				active: true,
				itemsPerPage: 100
			}
		},
		service: {
			active: true,
			name: 'Services',
			hashtag: '#ourservices'
		}

	},

	plugin: {
		testPlugin: true
	}

});
