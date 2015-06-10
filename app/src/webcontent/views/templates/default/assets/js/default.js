$.util.includeFile('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css', undefined, 'import');
// $.util.includeFile('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css');
//$.util.includeFile('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js');

//$.util.includeFile('test.css');
//$.util.includeFile('test.js');

$(document).ready(function(){

	$.util.includeScript('lib.js', function() {
	    helloWorld();
	});
	
	// use your javascript/jquery stuff
	
});