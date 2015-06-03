# myFanPage

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