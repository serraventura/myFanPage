'use strict';

angular.module('myFanPageApp')
	.filter('enableLink', function () {

		return function(content){
			return MYFP.util.replaceURLWithHTMLLinks(content||'');
		}

	});
