# myFanPageApp
A 100% client APP to create flexible websites based in a Facebook fanpage. The APP aims provide dynamic content using the basics client technologies such as HTML, CSS and Javascript.

myFanPageApp is AngularJS based.

# Config file
```javascript
{

	fanPageId: 'myfanpageapp',
	template: 'default',
	coverPicture: true,
	profilePicture: true,
	token: '',

	menu: {

		aboutFanPage: {
			active: true,
			name: 'About us',
			location: true
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
			hashtag: '#blog'
		},
		service: {
			active: true,
			name: 'Services',
			hashtag: '#ourservices'
		}

	}

}
```

# Config.js file properties

 - fanPageId: fanpage's name or ID - It allows the APP to know what fanpage it should retrieve the data.

 - template: the template folder's name choosed to be used. If a custom template was created the name of its folder must be specified on this propertie.

 - coverPicture: true|false - If true will retrieve the fanpage's cover picture otherwise it's gonna use the default cover picture provided in your template folder's asset images.

 - profilePicture: true|false - If true will retrieve the fanpage's profile picture otherwise the default profile picture/logo provided in your template folder's asset images is gonna be used.

 - token: APP Access token - The token is supposed to be used only on development envriroment. This is a convenient way to develop your website faster without need any server dependency. There are tokens available on the file xxxxxxxx on the root of the APP. See more details below.

 - menu: Following the example above each menu option is gonna be explained. It's important to point that every menu name(ex: aboutFanPage) must reflect its respective HTML file. It means, if there's a menu option "aboutFanPage" one "aboutFanPage.html" must exist. The best way to understand is checking out the "default" template.

```javascript
		aboutFanPage: {
			active: true, // 
			name: 'About us',
			location: true
		},
```
 - aboutFanPage: Is a hardcoded menu. You must use the same property name to be able to enable a menu option which is gonna show the description about your fanpage/website.
 - - active: true|false - the option menu is gonna be shown if true.
 - - name: The menu option label to be displayed on menu.
 - - location: The map location based on the address provided to the fanpage.


```javascript
		photoFanPage: {
			active: true,
			name: 'Photos',
			album: 'Website'
		},
```
 - photoFanPage: Is a hardcoded menu. You must use the same property name to be able to enable a menu option which is gonna show the picture gallery of your fanpage/website.
 - - active: true|false - the option menu is gonna be shown if true.
 - - name: The menu option label to be displayed on menu.
 - - album: The name of the album choosed to be shown on the website

```javascript
		blogFanPage: {
			active: true,
			tweet: true,
			name: 'Blog',
			hashtag: '#blog'
		},
```
 - blogFanPage: Is NOT a hardcoded menu. You can use any name to enable a menu option.
 - - active: true|false - the option menu is gonna be shown if true.
 - - tweet: true|false - if true returns all the content based on the hashtag defined.
 - - name: The menu option label to be displayed on menu.
 - - hashtag: Creates a target to retrieve only content based on the hashtag defined.

 ```javascript
		service: {
			active: true,
			name: 'Services',
			hashtag: '#ourservices'
		}
```
 - service: Is NOT a hardcoded menu. You can use any name to enable a menu option.
 - - active: true|false - the option menu is gonna be shown if true.
 - - name: The menu option label to be displayed on menu.
 - - hashtag: Creates a target to retrieve only content based on the hashtag defined. The example above will retrieve only one content, the latest post with the hashtag '#ourservices'.


 Token details:

 For security propurses an APP Access token must not be used in a production envriroment. You can find out more details here#link#.

 In a production envriroment you must do authenticated requests from the server side to avoid expose your token. To do so, a server side files are provided on the folder "server" on the root of the APP.

 The server-side files provided in Node.js and PHP must be hosted in your own server and to make the app recognize it a new node must be used on config.js as below.

 ```javascript
server: {
	api: 'http://www.mydomain.com/api.php'
}
 ```



# Built-in directives

Page Details:
-------------------------
```html
<page-details value="about"></page-details>
The example above display the fanpage's short description

<page-details value="description"></page-details>
Display the fanpage's long description

<page-details value="name"></page-details>
Display the fanpage's name

<page-details value="cover" responsive="true"></page-details>
Display the fanpage's cover picture
responsive: true|false - Retrieves the original picture size if true

<page-details value="logo" original="false"></page-details>
Display the fanpage's profile picture (value could be: logo, picture or profilepicture)
original: true|false - Retrieves the original picture size if true
```

Page Menu:
-------------------------
```html
<page-menu></page-menu>
Dipslay web site menu based on config.js file settings

```

Page Include:
-------------------------
```html
<page-include value="header.html"></page-include>
Includes HTML parts based on template path
Ex: If you are working in a template called "myGreenTemplate" all the HTML parts added as a value must be inside the template folder "myGreenTemplate".
```

Page Content:
-------------------------
```html
<page-content></page-content>
Display page's content based on current active menu.
The directive uses the config.js file to know what hashtag the current page is targeting.

<page-content hashtag="#blog" tweet="false" item="0"></page-content>
Display page's content based on hashtag specified on attribute.
hashtag: #anyhashtag
tweet: true|false - Returns just one post(latest) if false
item: 0,1,2,3...n - Returns a specific post among all retrieved when tweet equals true
```

Page Photo:
-------------------------
```html
<page-photos></page-photos>
Display pictures from fanpage's album setup on config.js file on pinned menu photoFanPage.
```