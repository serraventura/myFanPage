"use strict";angular.module("myFanPageApp",["ngRoute","ngSanitize","angularUtils.directives.dirPagination","infinite-scroll","oc.lazyLoad"]).config(function($routeProvider,FanPageConfig){var prefixAbsoluteTemplateUrl=_.get(FanPageConfig,["prefixAbsoluteTemplateUrl"],""),mainTemplateUrl=prefixAbsoluteTemplateUrl+"src/webcontent/views/templates/"+FanPageConfig.template+"/main.html",pageTemplateUrl=prefixAbsoluteTemplateUrl+"src/webcontent/views/templates/"+FanPageConfig.template+"/_blank.html";FanPageConfig.anchorContent&&(pageTemplateUrl=mainTemplateUrl),$routeProvider.when("/",{templateUrl:mainTemplateUrl}).when("/:name",{templateUrl:pageTemplateUrl}).otherwise({redirectTo:"/"})}).run(function(FanPageConfig,$location){var prefixAbsoluteTemplateUrl=_.get(FanPageConfig,["prefixAbsoluteTemplateUrl"],"");if(MYFP.util.loadJS(prefixAbsoluteTemplateUrl+"src/webcontent/views/templates/"+FanPageConfig.template+"/assets/js/"+FanPageConfig.template+".js"),MYFP.util.loadCSS(prefixAbsoluteTemplateUrl+"src/webcontent/views/templates/"+FanPageConfig.template+"/assets/styles/"+FanPageConfig.template+".css"),""==$location.path()){var menuOption=_.remove(_.map(FanPageConfig.menu,function(item,key){return item.initialPage?key:void 0}),void 0)[0];menuOption&&$location.path("/"+menuOption)}});var MYFP=window.MYFP||{};MYFP.util=MYFP.util||{},MYFP.util=function(){return{loadJS:function(file){var js=document.createElement("script");js.type="text/javascript",js.src=file,document.body.appendChild(js)},camelCaseToDash:function(str){return str.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2")},dashToCamelCase:function(str){return str.replace(/\W+(.)/g,function(x,chr){return chr.toUpperCase()})},loadCSS:function(file,type){type=type||"stylesheet";var css=document.createElement("LINK");css.setAttribute("rel",type),css.setAttribute("href",file),document.body.appendChild(css)},replaceURLWithHTMLLinks:function(text){var exp=/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/gi;return text.replace(exp,"<a href='$1' target='_blank'>$3</a>")},getYoutubeIdFromURL:function(url){var regExp=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,match=url.match(regExp);return match&&11==match[7].length?match[7]:void console.log("youtube URL not match")}}}(),function($){$.util={includeScript:function(file,callback){var template=(angular.element("[ng-view]").scope()||"").templatePath;return $.getScript(template+"/assets/js/"+file,callback)},includeFile:function(file,type,rel){file=(file||"").toLowerCase();var ext=file.substring(file.length-4);if(-1!=file.indexOf("https")||-1!=file.indexOf("http"))-1!=ext.indexOf(".js")||-1!=(type||"").indexOf("js")?MYFP.util.loadJS(file):1==ext.indexOf(".css")&&-1==(type||"").indexOf("css")&&rel?console.log("File not loaded: ",file):MYFP.util.loadCSS(file,rel);else{var template=(angular.element("[ng-view]").scope()||"").templatePath;-1!=ext.indexOf(".js")||-1!=(type||"").indexOf("js")?MYFP.util.loadJS(template+"/assets/js/"+file):-1==ext.indexOf(".css")&&-1==(type||"").indexOf("css")&&rel?console.log("File not loaded: ",file):MYFP.util.loadCSS(template+"/assets/styles/"+file,rel)}}}}(jQuery),angular.module("myFanPageApp").controller("WebContentCtrl",function($scope,$rootScope,$q,WatchService,FanPageConfig,PageDetailService,PhotoService,FeedService,ModuleLoader,FanPageContent){function makeCache(){var fanPageContentCache={dateCriation:moment().format(),data:FanPageContent};try{fanPageContentCache=JSON.stringify(fanPageContentCache)}catch(err){console.log("Error generating cache: ",err)}localStorage.setItem("fanPageContentCache",fanPageContentCache)}var promise,arrPromises=[],pageDetailService=new PageDetailService,photoService=new PhotoService,feedService=new FeedService,prefixAbsoluteTemplateUrl=_.get(FanPageConfig,["prefixAbsoluteTemplateUrl"],""),enableCache=_.get(FanPageConfig,["enableCache"],!0);WatchService.watchRoutes($scope),$scope.FanPageContent=FanPageContent,$scope.templatePath=prefixAbsoluteTemplateUrl+"src/webcontent/views/templates/"+FanPageConfig.template,promise=pageDetailService.getPageInfos().then(function(){$rootScope.$broadcast("page-infos-ready"),ModuleLoader.loadAll()}),arrPromises.push(promise),promise=pageDetailService.getProfilePicture().then(function(){$rootScope.$broadcast("page-profile-picture-ready")}),arrPromises.push(promise),promise=photoService.getPhotoPage().then(function(){$rootScope.$broadcast("page-photo-ready")}),arrPromises.push(promise),promise=feedService.getMenuContent().then(function(){$rootScope.$broadcast("menu-content-ready")}),arrPromises.push(promise),$q.all(arrPromises).then(function(){if("undefined"!=typeof Storage)if(enableCache)if(null!=localStorage.getItem("fanPageContentCache"))try{var cache=JSON.parse(localStorage.getItem("fanPageContentCache"));moment().diff(moment(cache.dateCriation),"days")>=1&&(localStorage.removeItem("fanPageContentCache"),makeCache())}catch(err){console.log("Error in cache: ",err)}else makeCache();else localStorage.removeItem("fanPageContentCache")},function(){})}),angular.module("myFanPageApp").factory("FeedService",function($q,$log,$http,FanPageConfig,FanPageContent,API){var publicApi=void 0,setContentByType=function(data,hashtag){var page=angular.copy(FanPageContent.pages);switch((data.caption||"").toLowerCase()){case"soundcloud.com":page[0].picture=void 0;break;case"youtube.com":var template="http://img.youtube.com/vi/{ID}/mqdefault.jpg";page[0].picture=template.replace("{ID}",MYFP.util.getYoutubeIdFromURL(data.link));break;default:page[0].picture="link"==data.type?data.picture:void 0}return page[0].id=data.id,page[0].pictureId=data.object_id,page[0].hashtag=hashtag,page[0].text=data.message,page[0].type=data.caption||data.type,page[0].externalLink=data.link,page[0]},setMenuContentByHashtag=function(res){var prop,hashtagProp,tweetProp,defer=$q.defer(),arrConfigProp=[];for(prop in FanPageConfig.menu)hashtagProp=void 0,tweetProp=void 0,FanPageConfig.menu[prop].hasOwnProperty("active")&&FanPageConfig.menu[prop].active&&(FanPageConfig.menu[prop].hasOwnProperty("hashtag")&&-1!=FanPageConfig.menu[prop].hashtag.indexOf("#")&&(hashtagProp=FanPageConfig.menu[prop].hashtag),FanPageConfig.menu[prop].hasOwnProperty("tweet")&&(tweetProp=FanPageConfig.menu[prop].tweet)),(hashtagProp||tweetProp)&&arrConfigProp.push({hashtag:hashtagProp,tweet:tweetProp});if(res.data){for(var hashtagFound,pageContentFound=0,arrFanPageContentPages=[],i=0;i<res.data.length;i++)res.data[i].message&&(hashtagFound=arrConfigProp.filter(function(item){return-1!=res.data[i].message.indexOf(item.hashtag)}),hashtagFound.length>0&&(pageContentFound=FanPageContent.pages.filter(function(item){return item.hashtag==hashtagFound[0].hashtag}).length,(pageContentFound>0&&hashtagFound[0].tweet||0==pageContentFound)&&arrFanPageContentPages.push(setContentByType(res.data[i],hashtagFound[0].hashtag))));FanPageContent.pages=arrFanPageContentPages,console.log("FanPageContent: ",FanPageContent),defer.resolve(FanPageContent)}else defer.reject("Data not found");return defer.promise},getPicturesByFeedId=function(id,field){var defer=$q.defer();publicApi.isError=!1;var URL=API.get("identifier",id,{fields:field});return $http.get(URL).then(function(res){res.data?(publicApi.isError=!1,defer.resolve(res)):(publicApi.isError=!0,defer.reject("No Data Found."))},function(res){publicApi.isError=!0,defer.reject(res)}),defer.promise},requestMenuContent=function(){var defer=$q.defer();return publicApi.isError=!1,$http.get(API.get("feed",FanPageConfig.fanPageId)).then(function(res){res.data.data?(publicApi.isError=!1,defer.resolve(res)):(publicApi.isError=!0,defer.reject("No Data Found."))},function(res){publicApi.isError=!0,defer.reject(res)}),defer.promise},FeedService=function(){publicApi=this,this.getMenuContent=function(){var defer=$q.defer();return publicApi.isError=!1,FanPageContent.isCached?(defer.resolve(),defer.promise):(requestMenuContent().then(function(res){return setMenuContentByHashtag(res.data)},function(err){publicApi.isError=!0,defer.reject(err)}).then(function(){for(var promisesAttachments=[],i=0;i<FanPageContent.pages.length;i++)"photo"==FanPageContent.pages[i].type.toLowerCase()&&promisesAttachments.push(getPicturesByFeedId(FanPageContent.pages[i].id,"attachments"));$q.all(promisesAttachments).then(function(data){if(!data)return defer.reject("No Data Found."),publicApi.isError=!0,!1;for(var subattachments,idx,i=0;i<data.length;i++)if(data[i].data.attachments.data[0].hasOwnProperty("subattachments")){subattachments=[];for(var j=0;j<data[i].data.attachments.data[0].subattachments.data.length;j++)subattachments.push({big:data[i].data.attachments.data[0].subattachments.data[j].media.image.src,small:data[i].data.attachments.data[0].subattachments.data[j].target.id});idx=_.findIndex(FanPageContent.pages,function(item){return item.id==data[i].data.id}),FanPageContent.pages[idx].picture=subattachments}else idx=_.findIndex(FanPageContent.pages,function(item){return item.id==data[i].data.id}),FanPageContent.pages[idx].picture={big:data[i].data.attachments.data[0].media.image.src,small:data[i].data.attachments.data[0].target.id};for(var promisesPicture=[],arrPics=_.flatten(_.map(FanPageContent.pages,function(item){return"photo"==item.type?item.picture:void 0})),i=0;i<arrPics.length;i++)arrPics[i]&&promisesPicture.push(getPicturesByFeedId(arrPics[i].small,"picture"));$q.all(promisesPicture).then(function(data){for(var c=0;c<data.length;c++)for(var i=0;i<FanPageContent.pages.length;i++)if("photo"==FanPageContent.pages[i].type.toLowerCase()&&FanPageContent.pages[i].picture&&(_.isObject(FanPageContent.pages[i].picture)||_.isArray(FanPageContent.pages[i].picture)))if(_.isArray(FanPageContent.pages[i].picture))for(var j=0;j<FanPageContent.pages[i].picture.length;j++)FanPageContent.pages[i].picture[j].small==data[c].data.id&&(FanPageContent.pages[i].picture[j].small=data[c].data.picture);else FanPageContent.pages[i].picture.small==data[c].data.id&&(FanPageContent.pages[i].picture.small=data[c].data.picture);defer.resolve(data)},function(err){publicApi.isError=!0,defer.reject(err)})},function(err){publicApi.isError=!0,defer.reject(err)})},function(err){publicApi.isError=!0,defer.reject(err)}),defer.promise)},this.getContentByHashtag=function(hashtag){var pageContentFound=void 0,defer=$q.defer();return publicApi.isError=!1,FanPageContent.isCached?(defer.resolve(),defer.promise):(pageContentFound=FanPageContent.pages.filter(function(item){return item.hashtag==hashtag}),pageContentFound.length>0?(defer.resolve(pageContentFound),defer.promise):($http.get(API.get("feed",FanPageConfig.fanPageId)).then(function(res){if(res.data.data){publicApi.isError=!1;for(var i=0;i<res.data.data.length;i++)res.data.data[i].message&&-1!=res.data.data[i].message.indexOf(hashtag)&&FanPageContent.pages.push({id:res.data.data[i].id,pictureId:res.data.data[i].object_id,hashtag:hashtag,text:res.data.data[i].message,picture:void 0});pageContentFound=FanPageContent.pages.filter(function(item){return item.hashtag==hashtag}),defer.resolve(pageContentFound)}else publicApi.isError=!0,defer.reject("No Data Found.")},function(res){return publicApi.isError=!0,defer.reject(res)}),defer.promise))}};return FeedService}),angular.module("myFanPageApp").factory("PageDetailService",function($q,$log,$http,FanPageConfig,FanPageContent,API){var publicApi=void 0,getOriginalCoverPicture=function(coverId){var defer=$q.defer();return publicApi.isError=!1,FanPageConfig.menu.aboutFanPage.active?($http.get(API.get("identifier",coverId)).then(function(res){res.data?(FanPageConfig.coverPicture&&_.has(res.data,"images")&&(FanPageContent.pageDetails.cover.original=res.data.images[0].source),publicApi.isError=!1,defer.resolve(res)):(publicApi.isError=!0,defer.reject("No Data Found."))},function(res){publicApi.isError=!0,defer.reject(res)}),defer.promise):(publicApi.isError=!0,defer.reject("Content not active."),defer.promise)},PageDetailService=function(){publicApi=this,this.getPageInfos=function(){var defer=$q.defer();return publicApi.isError=!1,FanPageContent.isCached?(defer.resolve(),defer.promise):FanPageConfig.menu.aboutFanPage.active?($http.get(API.get("identifier",FanPageConfig.fanPageId)).then(function(res){res.data?(FanPageContent.pageDetails.name=res.data.name,FanPageContent.pageDetails.about=res.data.about,FanPageContent.pageDetails.description=res.data.description,FanPageContent.pageDetails.likes=res.data.likes,res.data.cover&&FanPageConfig.coverPicture&&(FanPageContent.pageDetails.cover={},FanPageContent.pageDetails.cover.picture=res.data.cover.source,getOriginalCoverPicture(res.data.cover.id)),publicApi.isError=!1,defer.resolve(res)):(publicApi.isError=!0,defer.reject("No Data Found."))},function(res){publicApi.isError=!0,defer.reject(res)}),defer.promise):(publicApi.isError=!0,defer.reject("Content not active."),defer.promise)},this.getProfilePicture=function(){var defer=$q.defer();return publicApi.isError=!1,FanPageContent.isCached?(defer.resolve(),defer.promise):FanPageConfig.profilePicture?($http.get(API.get("photos",FanPageConfig.fanPageId)).then(function(res){res.data.data?(FanPageContent.pageDetails.profilePicture.small=res.data.data[0].picture,FanPageContent.pageDetails.profilePicture.big=res.data.data[0].source,publicApi.isError=!1,defer.resolve(res)):(publicApi.isError=!0,defer.reject("No Data Found."))},function(res){publicApi.isError=!0,defer.reject(res)}),defer.promise):(publicApi.isError=!0,defer.reject("Content not active."),defer.promise)}};return PageDetailService}),angular.module("myFanPageApp").factory("PhotoService",function($q,$log,$http,FanPageConfig,FanPageContent,API){var publicApi=void 0,getAlbum=function(){var defer=$q.defer();return publicApi.isError=!1,$http.get(API.get("albums",FanPageConfig.fanPageId)).then(function(res){res.data.data?defer.resolve(res):(publicApi.isError=!0,defer.reject("No Data Found."))},function(res){publicApi.isError=!0,defer.reject(res)}),defer.promise},getWebsiteAlbumId=function(data){for(var albumId=void 0,len=data.length,i=0;len>i;i++)if(data[i].name.toLowerCase()==FanPageConfig.menu.photoFanPage.album.toLowerCase()){albumId=data[i].id;break}return albumId},getPictures=function(idAlbum){var defer=$q.defer();return publicApi.isError=!1,$http.get(API.get("photos",idAlbum)).then(function(res){res.data.data?(publicApi.isError=!1,defer.resolve(res)):(publicApi.isError=!0,defer.reject("No Data Found."))},function(res){publicApi.isError=!0,defer.reject(res)}),defer.promise},PhotoService=function(){publicApi=this,this.getPhotoPage=function(){var defer=$q.defer();return publicApi.isError=!1,FanPageContent.isCached?(defer.resolve(),defer.promise):FanPageConfig.menu.photoFanPage.active?getAlbum().then(function(d){var idAlbum=getWebsiteAlbumId(d.data.data);return getPictures(idAlbum)},function(err){defer.reject(err)}).then(function(d){if(d.data.data){for(var len=d.data.data.length,pictures=[],i=0;len>i;i++)pictures.push({small:d.data.data[i].picture,big:d.data.data[i].source,description:d.data.data[i].name});FanPageContent.pictures=pictures,defer.resolve(d)}else defer.reject("Content Not Found.")},function(err){defer.reject(err)}):(publicApi.isError=!0,defer.reject("Content not active."),defer.promise)}};return PhotoService}),angular.module("myFanPageApp").service("API",function API(FanPageConfig){var API={};return API.defaultBase="graph.facebook.com",API.routes={identifier:{protocol:"https",version:"v2.3",params:{access_token:FanPageConfig.token}},feed:{protocol:"https",version:"v2.3",params:{access_token:FanPageConfig.token,limit:250}},albums:{protocol:"https",version:"v2.3",params:{access_token:FanPageConfig.token}},photos:{protocol:"https",version:"v2.3",params:{access_token:FanPageConfig.token}}},API.get=function(endPoint,id,customParams){var base,protocol,URL,params="";if(API.routes.hasOwnProperty(endPoint)){FanPageConfig.server&&FanPageConfig.server.api?(base=FanPageConfig.server.api,protocol=""):(base=API.defaultBase,protocol=API.routes[endPoint].protocol+"://"),customParams&&angular.extend(API.routes[endPoint].params,customParams),""!=protocol||"identifier"!=endPoint&&!id||(angular.extend(API.routes[endPoint].params,{identifier:id,endPoint:endPoint}),delete API.routes[endPoint].params.access_token);for(var o in API.routes[endPoint].params)params+=o+"="+API.routes[endPoint].params[o]+"&";return params=params.substring(0,params.length-1),""!=protocol?URL=id?"identifier"==endPoint&&id?protocol+base+"/"+API.routes[endPoint].version+"/"+id+"?"+params:protocol+base+"/"+API.routes[endPoint].version+"/"+id+"/"+endPoint+"?"+params:protocol+base+"/"+API.routes[endPoint].version+"/"+endPoint+"?"+params:id?("identifier"==endPoint||id)&&(URL=protocol+base+"/identifier?"+params):URL=protocol+base+"/"+endPoint+"?"+params,URL}return void 0},API}),angular.module("myFanPageApp").service("WatchService",function(FanPageConfig,$route,$routeParams,$http,$compile){this.watchRoutes=function($scope){$scope.$watch(function(){return $routeParams.name},function(newVal,oldVal){newVal===oldVal||FanPageConfig.anchorContent||($route.current.templateUrl="src/webcontent/views/templates/"+FanPageConfig.template+"/"+$routeParams.name+".html",$http.get($route.current.templateUrl).then(function(msg){angular.element("[ng-view]").eq(0).html($compile(msg.data)($scope))}))},!1)}}),angular.module("myFanPageApp").filter("sanitize",function($sce){return function(htmlCode){return $sce.trustAsHtml(htmlCode)}}),angular.module("myFanPageApp").filter("enableLink",function(){return function(content){return MYFP.util.replaceURLWithHTMLLinks(content||"")}}),angular.module("myFanPageApp").directive("pageDetails",function(FanPageContent,FanPageConfig){return{templateUrl:"src/core/views/page-details.html",restrict:"E",scope:!0,replace:!0,link:{post:function(scope,element,attrs){scope.valueProp=null,scope.$watch(function(){return FanPageContent.pageDetails},function(){var pageDetailsProp=(attrs.value||"").toLowerCase(),original=attrs.original||"false",responsive=attrs.responsive||"false";if(scope.pageDetailsProp=pageDetailsProp,scope.original=original,scope.responsive=responsive,("profilepicture"==pageDetailsProp||"picture"==pageDetailsProp||"logo"==pageDetailsProp)&&(pageDetailsProp="profilePicture"),FanPageContent.pageDetails.hasOwnProperty(pageDetailsProp))if("profilePicture"==pageDetailsProp)scope.valueProp="true"===original?(""|FanPageContent.pageDetails[pageDetailsProp]).big:(FanPageContent.pageDetails[pageDetailsProp]||"").small;else if("about"===pageDetailsProp||"description"===pageDetailsProp)scope.valueProp=MYFP.util.replaceURLWithHTMLLinks(FanPageContent.pageDetails[pageDetailsProp]||"");else if("cover"===pageDetailsProp){var defaultCoverPicture=scope.templatePath+"/cover.jpg";scope.valueProp=FanPageConfig.coverPicture?"true"===original?_.get(FanPageContent,["pageDetails",pageDetailsProp,"original"],defaultCoverPicture):_.get(FanPageContent,["pageDetails",pageDetailsProp,"picture"],defaultCoverPicture):defaultCoverPicture}else scope.valueProp=FanPageContent.pageDetails[pageDetailsProp];else scope.valueProp=pageDetailsProp+" details not found."},!0)}}}}),angular.module("myFanPageApp").directive("pageMenu",function(FanPageContent,FanPageConfig,$timeout){return{templateUrl:"src/core/views/page-menu.html",restrict:"E",scope:!0,replace:!0,link:{post:function(scope,element){$timeout(function(){$(element.find("a")).bind("click",function(){var anchor=$(angular.element(this).attr("href"));FanPageConfig.anchorContent&&anchor.length>0&&$("html, body").animate({scrollTop:$(anchor).offset().top},500)})}),scope.menuOptions=FanPageContent.menuOptions}}}}),angular.module("myFanPageApp").directive("pagePhotos",function(FanPageContent){return{templateUrl:"src/core/views/page-photos.html",restrict:"E",scope:!0,replace:!0,link:{post:function(scope){scope.pictures=null,scope.$watch(function(){return FanPageContent.pictures},function(){scope.pictures=FanPageContent.pictures},!0)}}}}),angular.module("myFanPageApp").directive("pageContent",function(FanPageContent,FeedService,$routeParams,limitToFilter){return{templateUrl:"src/core/views/page-content.html",restrict:"E",scope:!0,replace:!0,controller:function($scope){$scope.infinitePage=0,$scope.loadMore=function(){$scope.infinitePage<$scope.pageContent.length&&($scope.infinitePage+=parseInt($scope.getItemsPerPage/2),$scope.lazyPageContent=limitToFilter($scope.pageContent,$scope.infinitePage))}},link:{post:function(scope,element,attrs){var _itemsPerPage=100,_infiniteItemsPerPage=999999;scope.isPictureArray=function(o){return _.isArray(o.picture)&&o.picture},scope.pageContent=[],scope.$watch(function(){return FanPageContent.pages},function(){var hashtagProp=(attrs.hashtag||"").toLowerCase(),itemProp=attrs.item;if(""!=hashtagProp){var tweetProp=attrs.tweet||"false",itemFound=FanPageContent.pages.filter(function(item){return item.hashtag==hashtagProp});if(0==itemFound.length){var feedService=new FeedService;feedService.getContentByHashtag(hashtagProp).then(function(item){"true"===tweetProp?(scope.active=!0,scope.getItemsPerPage=_itemsPerPage,scope.pageContent=itemProp?[item[itemProp]]:item,scope.lazyPageContent=limitToFilter(scope.pageContent,parseInt(scope.getItemsPerPage/2))):(scope.active=!1,scope.getItemsPerPage=_infiniteItemsPerPage,scope.pageContent=[item[itemProp||0]],scope.lazyPageContent=limitToFilter(scope.pageContent,parseInt(scope.getItemsPerPage/2)))})}else"true"===tweetProp?(scope.active=!0,scope.getItemsPerPage=_itemsPerPage,scope.pageContent=itemProp?[itemFound[itemProp]]:itemFound,scope.lazyPageContent=limitToFilter(scope.pageContent,parseInt(scope.getItemsPerPage/2))):(scope.active=!1,scope.getItemsPerPage=_infiniteItemsPerPage,scope.pageContent=[itemFound[itemProp||0]],scope.lazyPageContent=limitToFilter(scope.pageContent,parseInt(scope.getItemsPerPage/2)))}else if(FanPageContent.menuOptions.hasOwnProperty($routeParams.name||"")){var tweetProp=FanPageContent.menuOptions[$routeParams.name].hasOwnProperty("tweet")&&FanPageContent.menuOptions[$routeParams.name].tweet;if(FanPageContent.menuOptions[$routeParams.name].hasOwnProperty("hashtag")){var hashtag=FanPageContent.menuOptions[$routeParams.name].hashtag,itemFound=FanPageContent.pages.filter(function(item){return item.hashtag==hashtag});tweetProp?(FanPageContent.menuOptions[$routeParams.name].hasOwnProperty("pagination")?(scope.active=FanPageContent.menuOptions[$routeParams.name].pagination.active,scope.getItemsPerPage=scope.active?FanPageContent.menuOptions[$routeParams.name].pagination.itemsPerPage:_infiniteItemsPerPage):(scope.active=!0,scope.getItemsPerPage=_itemsPerPage),scope.pageContent=itemProp?[itemFound[itemProp]]:itemFound,scope.lazyPageContent=limitToFilter(scope.pageContent,parseInt(scope.getItemsPerPage/2))):(scope.active=!1,scope.getItemsPerPage=_infiniteItemsPerPage,scope.pageContent=[itemFound[itemProp||0]],scope.lazyPageContent=limitToFilter(scope.pageContent,parseInt(scope.getItemsPerPage/2)))}}},!0)}}}}),angular.module("myFanPageApp").directive("pageInclude",function($compile){return{restrict:"E",scope:!1,replace:!0,link:{post:function(scope,element,attrs){scope.filePath=scope.templatePath+"/"+attrs.value;var DOM=angular.element("<div ng-include src='filePath'></div>"),el=$compile(DOM)(scope);element.replaceWith(el)}}}}),angular.module("myFanPageApp").directive("fixHeader",function(){return{restrict:"A",link:{pre:function(scope,element){var elCopy=element,container=angular.element("[ng-view]").prev();element.remove(),container.html(""),container.append(elCopy)}}}}).directive("fixFooter",function(){return{restrict:"A",link:{pre:function(scope,element){var elCopy=element,container=angular.element("[ng-view]").next();element.remove(),container.html(""),container.append(elCopy)}}}}),angular.module("myFanPageApp").service("FanPageContent",function FanPageContent(FanPageConfig){var FanPageContent={};return FanPageContent.isCached=!1,FanPageContent.pageDetails={name:void 0,about:void 0,description:void 0,likes:void 0,cover:{original:void 0,picture:void 0},profilePicture:{small:void 0,big:void 0}},FanPageContent.pictures=[{small:void 0,big:void 0,description:void 0}],FanPageContent.menuOptions=FanPageConfig.menu,FanPageContent.pages=[{id:"0300303030",pictureId:"999399393",hashtag:"#anyhashtag",text:"test test test...",picture:"http://img.youtube.com/vi/BLqxR1YXZj4/0.jpg",type:"youtube",externalLink:"https://www.youtube.com/watch?v=BLqxR1YXZj4"}],function(){if("undefined"!=typeof Storage&&null!=localStorage.getItem("fanPageContentCache"))try{var cache=JSON.parse(localStorage.getItem("fanPageContentCache"));moment().diff(moment(cache.dateCriation),"days")<1&&(FanPageContent.isCached=!0,FanPageContent.pageDetails=cache.data.pageDetails,FanPageContent.pictures=cache.data.pictures,FanPageContent.menuOptions=cache.data.menuOptions,FanPageContent.pages=cache.data.pages)}catch(err){console.log("Error in cache: ",err)}}(),FanPageContent}),angular.module("myFanPageApp").factory("ModuleLoader",function($ocLazyLoad,$compile,$rootScope,$http,FanPageConfig){function getAllAttributes(domElement,returnString){for(var att,attrObj={},attrString="",i=0,atts=domElement.attributes,n=atts.length;n>i;i++)att=atts[i],attrObj[att.nodeName]=att.value,attrString=attrString+att.nodeName+'="'+att.value+'" ';return returnString?attrString:attrObj}return{loadAll:function(){if(!FanPageConfig.hasOwnProperty("plugin"))return void 0;var p,arrDirectiveElements,scope=$rootScope.$new();for(p in FanPageConfig.plugin)if(FanPageConfig.plugin.hasOwnProperty(p)&&FanPageConfig.plugin[p]){var pathPlugin="src/webcomponent/"+p.toLowerCase()+"/"+p.toLowerCase()+".js";$ocLazyLoad.load({name:p.toLowerCase(),files:[pathPlugin],serie:!0}).then(function(){$http.get(pathPlugin).then(function(fileContent){var regExp=/\.directive\(['"]([^'"\n]+)['"]/g,match=fileContent.data.match(regExp),arrDirectives=match.toString().replace(new RegExp(".directive\\(","g"),"").replace(new RegExp("\\'","g"),"").replace(new RegExp('\\"',"g"),"").split(",");arrDirectiveElements=[];for(var i=0;i<arrDirectives.length;i++)arrDirectiveElements.push(MYFP.util.camelCaseToDash(arrDirectives[i]).toLowerCase());for(var el,elToAppend,directivePart1,i=0;i<arrDirectiveElements.length;i++)directivePart1=arrDirectiveElements[i],$("body").find(arrDirectiveElements[i]).each(function(){el=$(this),elToAppend=$compile(angular.element("<"+arrDirectiveElements[i]+" "+getAllAttributes(el.get(0),!0)+"></"+arrDirectiveElements[i]+">"))(scope),el.after(elToAppend),el.remove()})})},function(e){console.log(e)})}},loadFile:function(files){return $ocLazyLoad.load(files)}}}),angular.module("myFanPageApp").run(["$templateCache",function($templateCache){$templateCache.put("src/core/views/page-content.html",'<div class="myfp__pagecontent"><div infinite-scroll="loadMore()"><div ng-class="{\'single-feed\': lazyPageContent.length == 1}" class="feeds-post" dir-paginate="page in lazyPageContent | itemsPerPage:getItemsPerPage track by $index"><div class="type-photo" ng-if="page.type==\'photo\'"><p ng-if="isPictureArray(page)" ng-bind-html="page.text|enableLink"></p><div class="wrap-text-image"><ul ng-if="isPictureArray(page)"><li ng-repeat="pic in page.picture track by $index"><a ng-href="{{pic.big}}" target="_blank"><img ng-if="page.picture.length > 1" class="photo-array" ng-src="{{pic.small}}"> <img ng-if="page.picture.length == 1" class="photo" ng-src="{{pic.small}}"></a></li></ul><div ng-if="!isPictureArray(page)"><a ng-href="{{page.picture.big}}" target="_blank"><img ng-src="{{page.picture.small}}"></a></div></div><p ng-if="!isPictureArray(page)" ng-bind-html="page.text|enableLink"></p></div><div class="type-other" ng-if="page.type!=\'photo\'"><div class="wrap-text-image"><img ng-show="page.picture" ng-src="{{page.picture}}"></div><p ng-bind-html="page.text|enableLink"></p></div></div><dir-pagination-controls ng-show="active"></dir-pagination-controls></div></div>'),$templateCache.put("src/core/views/page-details.html",'<div class="myfp__pagedetails"><img ng-if="pageDetailsProp == \'profilepicture\' || pageDetailsProp == \'picture\' || pageDetailsProp == \'logo\'" ng-src="{{valueProp}}" class="logo"><div ng-if="pageDetailsProp == \'cover\'"><div ng-if="responsive === \'true\'" class="cover-wrapper"><img class="cover" ng-src="{{valueProp}}"></div><img ng-if="responsive !== \'true\'" class="" ng-src="{{valueProp}}"></div><p ng-if="pageDetailsProp == \'name\'" class="title" ng-bind-html="valueProp"></p><p ng-if="pageDetailsProp == \'about\'" class="short-description" ng-bind-html="valueProp"></p><p ng-if="pageDetailsProp == \'description\'" class="long-description" ng-bind-html="valueProp"></p></div>'),$templateCache.put("src/core/views/page-menu.html",'<div class="myfp__pagemenu"><ul class="nav-list"><li ng-repeat="(id, menu) in menuOptions track by $index" class="list-item"><a ng-href="#{{id}}">{{menu.name}}</a></li></ul></div>'),$templateCache.put("src/core/views/page-photos.html",'<div class="myfp__pagephotos"><ul><li ng-repeat="picture in pictures track by $index"><a ng-href="{{picture.big}}" target="_blank"><img ng-src="{{picture.small}}"> </a><span>{{picture.description}}</span></li></ul></div>'),$templateCache.put("src/webcontent/views/templates/default/_blank.html",""),$templateCache.put("src/webcontent/views/templates/default/aboutFanPage.html",'<div><page-include value="header.html" fix-header></page-include><div class="bodyContent"><page-details value="description"></page-details></div></div>'),$templateCache.put("src/webcontent/views/templates/default/blogFanPage.html",'<div><page-include value="header.html" fix-header></page-include><page-content></page-content></div>'),$templateCache.put("src/webcontent/views/templates/default/header.html",'<page-details value="name" id="titlePage"></page-details><page-details value="cover" original="true" responsive="true" id="coverPicture"></page-details><page-details value="logo" original="false" id="logoPage"></page-details><page-menu id="menuPage"></page-menu>'),$templateCache.put("src/webcontent/views/templates/default/main.html",'<div><page-include value="header.html" fix-header></page-include></div>'),$templateCache.put("src/webcontent/views/templates/default/photoFanPage.html",'<div><page-include value="header.html" fix-header></page-include><page-photos></page-photos></div>'),$templateCache.put("src/webcontent/views/templates/default/service.html",'<div><page-include value="header.html" fix-header></page-include><page-content></page-content></div>')}]);