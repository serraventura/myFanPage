(function($){

    $.util = {

		includeScript: function(file, callback) {
	        var template = angular.element('[ng-view]').scope().templatePath;
	        return $.getScript(template+'/assets/js/'+file, callback);
	    },

		includeFile: function(file, type, rel) {

			file = (file||'').toLowerCase();

			var ext = file.substring(file.length-4);

			if ( file.indexOf('https') != -1 || file.indexOf('http') != -1 ) {

				if ( ext.indexOf('.js') != -1 || (type||'').indexOf('js') != -1 ) {
					MYFP.util.loadJS(file);
				}else if ( ext.indexOf('.css') != 1 || (type||'').indexOf('css') != -1 || (!rel) ) {
					MYFP.util.loadCSS(file, rel);
				}else{
					console.log('File not loaded: ', file);
				};

			}else{

				var template = angular.element('[ng-view]').scope().templatePath;

				if ( ext.indexOf('.js') != -1 || (type||'').indexOf('js') != -1 ) {
					MYFP.util.loadJS(template+'/assets/js/'+file);
				}else if ( ext.indexOf('.css') != -1  || (type||'').indexOf('css') != -1 || (!rel) ) {
					MYFP.util.loadCSS(template+'/assets/styles/'+file, rel);
				}else{
					console.log('File not loaded: ', file);
				};

			};


	    }

    }

})(jQuery);