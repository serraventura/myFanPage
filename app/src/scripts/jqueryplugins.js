(function($){

    $.util = {

		includeScript: function(file, callback) {
	        var template = angular.element('[ng-view]').scope().templatePath;
	        return $.getScript(template+'/assets/js/'+file, callback);
	    }
    }

})(jQuery);