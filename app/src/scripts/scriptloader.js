var myFanPageApp1 = window.myFanPageApp1 || {};
myFanPageApp1.scriptloader = myFanPageApp1.scriptloader || {};
myFanPageApp1.scriptloader = (function(){

	return{

		loadJS: function(file){

			var js = document.createElement('script');
			js.type = 'text/javascript';
			js.src = file;
			document.body.appendChild(js)

		},

		loadCSS: function(file){

			var css = document.createElement('LINK');
			css.setAttribute('rel', 'stylesheet');
			css.setAttribute('href', file);
			document.body.appendChild(css);

		}

	}

})();