# myFanPageApp
A 100% client APP to create flexible websites based in a Facebook fanpage. The APP aim to provide dynamic content using the basics client technologies such as HTML, CSS and Javascript.

myFanPageApp is AngularJS based.

## Running locally

> Requires NPM, GIT
```bash
git clone https://github.com/serraventura/myFanPage
npm install
npm install -g bower
bower install
grunt serve
# open in a browse http://127.0.0.1:9000/
```

## Config file
```javascript
{
	fanPageId: 'myfanpageapp',
	template: 'default',
	coverPicture: true,
	profilePicture: true,
	token: '',
	anchorContent: false,
	enableCache: true,
	menu: {
		aboutFanPage: {
			active: true,
			name: 'About us',
			location: true,
			initialPage: false
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
	},
	plugin: {
		myCustomPluginName: true
	}
}
```

### Config.js file properties

 - **fanPageId**: fanpage's name or ID - It allows the APP to know what fanpage it should retrieve the data.

 - **template**: the template folder's name choosed to be used. If a custom template was created the name of its folder must be specified on this propertie.

 - **coverPicture**: true|false - If true will retrieve the fanpage's cover picture otherwise it's gonna use the default cover picture provided in your template folder's asset images.

 - **profilePicture**: true|false - If true will retrieve the fanpage's profile picture otherwise the default profile picture/logo provided in your template folder's asset images is gonna be used.

 - **token**: APP Access token - The token is supposed to be used only on development environment. This is a convenient way to develop your website faster without need any server dependency. There are tokens available on the file **token.dev** on the root of the APP. **See more details below**.
 
 - **anchorContent**: Enable/Disable content based on classic HTML anchors. To make it works the whole content must be in a single HTML file (**main.html**) in your template. The anchor id must match the menu options. Ex: #aboutFanPage, #photoFanPage, etc...

 - **enableCache**: true|false - local cache for data coming from facebook page.    

 - **menu**: Following the example above each menu option is gonna be explained. It's important to point that every menu name(ex: aboutFanPage) must reflect its respective HTML file. It means, if there's a menu option "aboutFanPage" one "aboutFanPage.html" must exist. The best way to understand is checking out the "default" template.

```javascript
		aboutFanPage: {
			active: true, // 
			name: 'About us',
			location: true,
			initialPage: false
		},
```
* **aboutFanPage**: Is a hardcoded menu. You must use the same property name to be able to enable a menu option which is gonna show the description about your fanpage/website.
   * **active**: true|false - the option menu is gonna be shown if true.
   * **name**: The menu option label to be displayed on menu.
   * **location**: The map location based on the address provided to the fanpage.
   * **initialPage**: Make the option menu the initial page.


```javascript
		photoFanPage: {
			active: true,
			name: 'Photos',
			album: 'Website'
		},
```
* **photoFanPage**: Is a hardcoded menu. You must use the same property name to be able to enable a menu option which is gonna show the picture gallery of your fanpage/website.
    * **active**: true|false - the option menu is gonna be shown if true.
    * **name**: The menu option label to be displayed on menu.
    * **album**: The name of the album choosed to be shown on the website

```javascript
		blogFanPage: {
			active: true,
			tweet: true,
			name: 'Blog',
			hashtag: '#blog',
			pagination: {
				active: true,
				itemsPerPage: 100
			}
		},
```
* **blogFanPage**: Is NOT a hardcoded menu. You can use any name to enable a menu option.
    * **active**: true|false - the option menu is gonna be shown if true.
    * **tweet**: true|false - if true returns all the content based on the hashtag defined.
    * **name**: The menu option label to be displayed on menu.
    * **hashtag**: Creates a target to retrieve only content based on the hashtag defined.
    * **pagination**: This is an option property if not defined the default pagination configuration will be used. It can be used in any menu with hashtag and tweet(true) properties defined.

 ```javascript
		service: {
			active: true,
			name: 'Services',
			hashtag: '#ourservices'
		}
```
* **service**: Is NOT a hardcoded menu. You can use any name to enable a menu option.
    * **active**: true|false - the option menu is gonna be shown if true.
    * **name**: The menu option label to be displayed on menu.
    * **hashtag**: Creates a target to retrieve only content based on the hashtag defined. The example above will retrieve only one content, the latest post with the hashtag '#ourservices'.

### Token details:

For security propurses an APP Access token must not be used on the front-end side in a production environment. You can find out more details and participate [here](http://stackoverflow.com/questions/30654961/facebook-app-token-from-a-placebo-app).

In a production environment you must do authenticated requests from the server side to avoid expose your token. To do so, a server side files are provided on the folder "server" on the root of the APP.

The server-side files provided in Node.js and PHP must be hosted in your own server and to make the app recognize it a new node must be used on config.js as below.

```javascript
// NodeJS/Express
server: {
	api: 'http://www.mydomain.com/api'
}
```

```javascript
// PHP/Slim
server: {
	api: 'http://www.mydomain.com/yourfolder'
}
```

## Built-in directives

### Page Details:

```html
<page-details value="about"></page-details>
```
> The example above display the fanpage's short description

```html
<page-details value="description"></page-details>
```
> Display the fanpage's long description

```html
<page-details value="name"></page-details>
```
> Display the fanpage's name

```html
<page-details value="cover" original="true" responsive="true"></page-details>
```
> Display the fanpage's cover picture

> **original**: true|false - Retrieves the original picture size if true

> **responsive**: true|false - Makes cover picture "liquid" adjusting itself in 100% in a container.

```html
<div fix-header></div>
```
> Fix container outside of dynamic container. It avoids blink/refresh effects in fixed contents.

```html
<div fix-footer></div>
```
> Fix container outside of dynamic container. It avoids blink/refresh effects in fixed contents.

```html
<page-details value="logo" original="false"></page-details>
```
> Display the fanpage's profile picture (value could be: logo, picture or profilepicture)

> **original**: true|false - Retrieves the original picture size if true

### Page Menu:

```html
<page-menu></page-menu>
```
> Dipslay web site menu based on config.js file settings


### Page Include:

```html
<page-include value="header.html"></page-include>
```
> Includes HTML parts based on template path

> Ex: If you are working in a template called "myGreenTemplate" all the HTML parts added as a value must be inside the template folder "myGreenTemplate".

### Page Content:

```html
<page-content></page-content>
```
> Display page's content based on current active menu.

> The directive uses the config.js file to know what hashtag the current page is targeting.

```html
<page-content hashtag="#blog" tweet="false" item="0"></page-content>
```
> Display page's content based on hashtag specified on attribute.

> **hashtag**: #anyhashtag

> **tweet**: true|false - Returns just one post(latest) if false
 
> **item**: 0,1,2,3...n - Returns a specific post among all retrieved when tweet equals true

### Page Photo:

```html
<page-photos></page-photos>
```
> Display pictures from fanpage's album setup on config.js file on pinned menu photoFanPage.

# How to build a template

Templates can be found at **app/src/webcontent/views/templates/**. An easy way to find out how the templates works is checking out our "default" template.

### Basic folder structure for a template:

```
-- mytemplate               (Main folder)
---- _blank.html            (System file)
---- main.html              (Main HTML file)
---- assets                 (Folder)
------ js                   (Folder)
-------- mytemplate.js      (Main javascript file. Must have same name as template)
------ styles               (Folder)
-------- mytemplate.css     (Main CSS file. Must have same name as template)
```

### Main basic rules to create a new template:

 1. A template must be under **app/src/webcontent/views/templates/**.
 2. Chosen the template name the same must be used as the main javascript file name and the main css file name as exemple above.
 3. The basic folder strucuture shown above must be provided.
 4. The _blank.html cannot be removed.
 5. The first HTML file loaded is gonna be always main.html and the name cannot be changed.
 6. HTML tags such as: ```<html></html>```, ```<head></head>```, ```<body></body>``` must not be used. Every HTML page reflects the content of a main ```<body></body>``` tag.
 7. Only one root element must exist for every HTML page.

### Creating new pages:

On main.html file the page-menu directive can be used ```<page-menu></page-menu>``` to show the menu options setup on **config.js**.

Every page related to a menu option must have the same name, following the config.js file shown in the begin of the documentation we would have:

 - aboutFanPage = aboutFanPage.html
 - photoFanPage = photoFanPage.html
 - blogFanPage = blogFanPage.html
 - service = service.html

Any extra HTML part can be included by ```<page-include></page-include>``` directive.

### Using third party resources in a template:

To use third party resources a JQuery helper method is available over the namespace ```$.util```.

 ```javascript
// Including bootstrap CSS and JS remote files
$.util.includeFile('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css');
$.util.includeFile('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js');

// Including remote file specifying the type
$.util.includeFile('http://any-url...', 'css');

// Including remote file specifying REL attribute
$.util.includeFile('http://any-url...', undefined, 'import');

// Including local files based on template path
$.util.includeFile('test.css'); // css file at **styles** folder
$.util.includeFile('test.js'); // js file at **js** folder
```

# How to build a plugin

Plugins can be built to extend the APP. Basically a supported plugin is an external AngularJS module which can be attached to the main APP by the **config.js** file on the section **plugin**.

### Restrictions

For the current version of the plugin support there are still some restriction as following:

 - The external AngularJS module must be in a single file.
 - The internal plugin's directives must be type element (**restrict: 'E'**).
 
### Main basic rules

 - The plugin must be inside the folder **webcomponent** (app/src/webcomponent).
 - Must be in a single file.
 - Directives must be type element.
 - Must be inside a folder with the same name. Ex: **app/src/webcomponent/mycustompluginname/mycustompluginname.js**.
 - Must be defined on **config.js** file, section **plugin**. You can see the above example **"mycustompluginname"** on the top of the documentation on **config.js** section.
 
 ### Simple plugin example
 
 ```javascript
 'use strict';
 
 angular.module('myCustomPluginName', [])
 .config(function () {})
 .run(function() {})
 .controller('TestPlugin', function ($scope) {
     $scope.smile = ' :) ';
 })
 .directive('myCustomDirectivePlugin', function () {
   return {
     scope: true,
     replace: true,
     restrict: 'E',
     template: '<span>My Name is {{name}} Im {{age}} years old {{smile}}</span>',
     link: {
       post: function (scope, element, attrs) {
         scope.age = attrs.age;
         scope.name = attrs.name;
       }
     }
 
 
   };
 })
 ```
