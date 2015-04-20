namespace = window.namespace || {};
namespace.scriptloader = namespace.scriptloader || {};
namespace.scriptloader = (function(){

	return{

		loadJS: function(file){

			var js = document.createElement('script');
			js.type = 'text/javascript';
			js.src = file;
			document.body.appendChild(js)

		},

		loadCSS: function(file){

			var css = document.createElement('LINK');
			css.setAttribute('rel', 'import');
			css.setAttribute('href', file);
			document.body.appendChild(css);

		}

	}

})();