(function($){

    $.util = {

		includeScript: function(file) {
	        var template = angular.element('[ng-view]').scope().templatePath;
	        return $.getScript(template+'/assets/js/'+file);
	    }
    }

})(jQuery);