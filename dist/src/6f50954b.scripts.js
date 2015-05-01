"use strict";angular.module("myFanPageApp",["ngRoute"]).config(function($routeProvider,FanPageConfig){$routeProvider.when("/",{templateUrl:"src/webcontent/views/templates/"+FanPageConfig.template+"/main.html"}).when("/:name",{templateUrl:"src/webcontent/views/templates/"+FanPageConfig.template+"/_blank.html"}).otherwise({redirectTo:"/"})}).run(function(FanPageConfig){namespace.scriptloader.loadJS("src/webcontent/views/templates/"+FanPageConfig.template+"/assets/js/"+FanPageConfig.template+".js"),namespace.scriptloader.loadCSS("src/webcontent/views/templates/"+FanPageConfig.template+"/assets/styles/"+FanPageConfig.template+".css")});var namespace=window.namespace||{};namespace.scriptloader=namespace.scriptloader||{},namespace.scriptloader=function(){return{loadJS:function(file){var js=document.createElement("script");js.type="text/javascript",js.src=file,document.body.appendChild(js)},loadCSS:function(file){var css=document.createElement("LINK");css.setAttribute("rel","import"),css.setAttribute("href",file),document.body.appendChild(css)}}}(),angular.module("myFanPageApp").controller("WebContentCtrl",function($scope,FanPageService,WatchService){WatchService.watchRoutes($scope);var fanPageService=new FanPageService;$scope.pageContent=fanPageService.pageContent,$scope.menuOptions=fanPageService.menuOptions,fanPageService.getPageInfos().then(function(){}),fanPageService.getPhotoPage().then(function(){}),fanPageService.getMenuContent().then(function(){})}),angular.module("myFanPageApp").factory("FanPageService",function($q,$log,$http,FanPageConfig,FanPageContent){var publicApi=void 0,URLAPI="http://graph.facebook.com",sURLAPI="https://graph.facebook.com",getAlbum=function(){var d=$q.defer();return publicApi.isError=!1,$http.get(URLAPI+"/"+FanPageConfig.fanPageId+"/albums").then(function(res){return res.data.data?d.resolve(res):(publicApi.isError=!0,d.reject("No Data Found."))},function(res){return publicApi.isError=!0,d.reject(res)}),d.promise},getMenuContentByHashtag=function(res){var prop,hashtagProp,tweetProp,arrConfigProp=[];for(prop in FanPageConfig.menu)hashtagProp=void 0,tweetProp=void 0,FanPageConfig.menu[prop].hasOwnProperty("active")&&FanPageConfig.menu[prop].active&&(FanPageConfig.menu[prop].hasOwnProperty("hashtag")&&-1!=FanPageConfig.menu[prop].hashtag.indexOf("#")&&(hashtagProp=FanPageConfig.menu[prop].hashtag),FanPageConfig.menu[prop].hasOwnProperty("tweet")&&(tweetProp=FanPageConfig.menu[prop].tweet)),(hashtagProp||tweetProp)&&arrConfigProp.push({hashtag:hashtagProp,tweet:tweetProp});if(res.data){for(var hashtagFound,pageContentFound=0,arrFanPageContentPages=[],i=0;i<res.data.length;i++)res.data[i].message&&(hashtagFound=arrConfigProp.filter(function(item){return-1!=res.data[i].message.indexOf(item.hashtag)}),hashtagFound.length>0&&(pageContentFound=FanPageContent.pages.filter(function(item){return item.hashtag==hashtagFound[0].hashtag}).length,(pageContentFound>0&&hashtagFound[0].tweet||0==pageContentFound)&&arrFanPageContentPages.push({id:res.data[i].id,pictureId:res.data[i].object_id,hashtag:hashtagFound[0].hashtag,text:res.data[i].message,picture:void 0}))),console.log(res.data[i]);FanPageContent.pages=arrFanPageContentPages,console.log(FanPageContent)}},getWebsiteAlbumId=function(data){for(var albumId=void 0,len=data.length,i=0;len>i;i++)if(data[i].name.toLowerCase()==FanPageConfig.menu.photoFanPage.album.toLowerCase()){albumId=data[i].id;break}return albumId},getPictures=function(idAlbum){var d=$q.defer();return publicApi.isError=!1,$http.get(URLAPI+"/"+idAlbum+"/photos").then(function(res){return res.data.data?(publicApi.isError=!1,d.resolve(res)):(publicApi.isError=!0,d.reject("No Data Found."))},function(res){return publicApi.isError=!0,d.reject(res)}),d.promise},FanPageService=function(){publicApi=this,this.pageContent=FanPageContent,this.menuOptions=FanPageConfig.menu,this.getPageInfos=function(){var d=$q.defer();return publicApi.isError=!1,FanPageConfig.menu.aboutFanPage.active?($http.get(URLAPI+"/"+FanPageConfig.fanPageId).then(function(res){return res.data?(FanPageContent.pageDetails.name=res.data.name,FanPageContent.pageDetails.about=res.data.about,FanPageContent.pageDetails.description=res.data.description,FanPageContent.pageDetails.likes=res.data.likes,publicApi.isError=!1,d.resolve(res)):(publicApi.isError=!0,d.reject("No Data Found."))},function(res){return publicApi.isError=!0,d.reject(res)}),d.promise):(publicApi.isError=!0,d.reject("Content not active."),d.promise)},this.getMenuContent=function(){var d=$q.defer();return publicApi.isError=!1,$http.get(sURLAPI+"/"+FanPageConfig.fanPageId+"/feed/?access_token="+FanPageConfig.token+"&limit=250").then(function(res){return res.data.data?(publicApi.isError=!1,getMenuContentByHashtag(res.data),d.resolve(res)):(publicApi.isError=!0,d.reject("No Data Found."))},function(res){return publicApi.isError=!0,d.reject(res)}),d.promise},this.getPhotoPage=function(){if(publicApi.isError=!1,!FanPageConfig.menu.photoFanPage.active){var d=$q.defer();return publicApi.isError=!0,d.reject("Content not active."),d.promise}return getAlbum().then(function(d){var idAlbum=getWebsiteAlbumId(d.data.data);return getPictures(idAlbum)}).then(function(d){for(var len=d.data.data.length,pictures=[],i=0;len>i;i++)pictures.push({small:d.data.data[i].picture,big:d.data.data[i].source,description:d.data.data[i].name});FanPageContent.pictures=pictures})}};return FanPageService}),angular.module("myFanPageApp").service("WatchService",function(FanPageConfig,$route,$routeParams,$http,$compile){this.watchRoutes=function($scope){$scope.$watch(function(){return $routeParams.name},function(newVal,oldVal){newVal!==oldVal&&($route.current.templateUrl="src/webcontent/views/templates/"+FanPageConfig.template+"/"+$routeParams.name+".html",$http.get($route.current.templateUrl).then(function(msg){angular.element("[ng-view]").eq(0).html($compile(msg.data)($scope))}))},!1)}}),angular.module("myFanPageApp").service("FanPageContent",function(){this.pageDetails={name:void 0,about:void 0,description:void 0,likes:void 0},this.pictures=[{small:void 0,big:void 0,description:void 0}],this.pages=[{id:"0300303030",pictureId:"999399393",hashtag:"#anyhashtag",text:"test test test...",picture:"http://..."}]});