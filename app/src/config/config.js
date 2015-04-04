'use strict';

angular.module('myFanPageApp').constant('FanPageConfig', {

	fanPageId: 'myfanpageapp',
	template: 'default',
	coverPicture: true,

	menu: {
		statics: {
			aboutPage: {
				active: true,
				name: 'About us',
				location: true
			},
			photoPage: {
				active: true,
				name: 'Photos',
				album: "Website"
			},
			blogPage: {
				active: true,
				tweetsActive: false,
				name: 'Blog',
				hashtag: '#blog'
			}
		},
		dynamics: [

			{
				name: 'Services',
				title: 'Our Services',
				hashtag: '#ourservices'
			}

		]
	}

});
