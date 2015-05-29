var MYFP = window.MYFP || {};
MYFP.util = MYFP.util || {};
MYFP.util = (function(){

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
		},

		replaceURLWithHTMLLinks: function(text) {
			var exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
			return text.replace(exp, "<a href='$1' target='_blank'>$3</a>");
		},

		getYoutubeIdFromURL: function (url) {
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match&&match[7].length==11){
			    return match[7];
			}else{
			    console.log('youtube URL not match');
			};
		}

	}

})();