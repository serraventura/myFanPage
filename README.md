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

<page-content hashtag="#blog"></page-content>
```

Page Photo:
-------------------------
```html
<page-photos></page-photos>
```