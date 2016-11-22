angular.module('myFanPageApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/core/views/page-content.html',
    "<div class=\"myfp__pagecontent\"><div infinite-scroll=\"loadMore()\"><div ng-class=\"{'single-feed': lazyPageContent.length == 1}\" class=\"feeds-post\" dir-paginate=\"page in lazyPageContent | itemsPerPage:getItemsPerPage track by $index\"><div class=\"type-photo\" ng-if=\"page.type=='photo'\"><p ng-if=\"isPictureArray(page)\" ng-bind-html=\"page.text|enableLink\"></p><div class=\"wrap-text-image\"><ul ng-if=\"isPictureArray(page)\"><li ng-repeat=\"pic in page.picture track by $index\"><a ng-href=\"{{pic.big}}\" target=\"_blank\"><img ng-if=\"page.picture.length > 1\" class=\"photo-array\" ng-src=\"{{pic.small}}\"> <img ng-if=\"page.picture.length == 1\" class=\"photo\" ng-src=\"{{pic.small}}\"></a></li></ul><div ng-if=\"!isPictureArray(page)\"><a ng-href=\"{{page.picture.big}}\" target=\"_blank\"><img ng-src=\"{{page.picture.small}}\"></a></div></div><p ng-if=\"!isPictureArray(page)\" ng-bind-html=\"page.text|enableLink\"></p></div><div class=\"type-other\" ng-if=\"page.type!='photo'\"><div class=\"wrap-text-image\"><img ng-show=\"page.picture\" ng-src=\"{{page.picture}}\"></div><p ng-bind-html=\"page.text|enableLink\"></p></div></div><dir-pagination-controls ng-show=\"active\"></dir-pagination-controls></div></div>"
  );


  $templateCache.put('src/core/views/page-details.html',
    "<div class=\"myfp__pagedetails\"><img ng-if=\"pageDetailsProp == 'profilepicture' || pageDetailsProp == 'picture' || pageDetailsProp == 'logo'\" ng-src=\"{{valueProp}}\" class=\"logo\"><div ng-if=\"pageDetailsProp == 'cover'\"><div ng-if=\"responsive === 'true'\" class=\"cover-wrapper\"><img class=\"cover\" ng-src=\"{{valueProp}}\"></div><img ng-if=\"responsive !== 'true'\" class=\"\" ng-src=\"{{valueProp}}\"></div><p ng-if=\"pageDetailsProp == 'name'\" class=\"title\" ng-bind-html=\"valueProp\"></p><p ng-if=\"pageDetailsProp == 'about'\" class=\"short-description\" ng-bind-html=\"valueProp\"></p><p ng-if=\"pageDetailsProp == 'description'\" class=\"long-description\" ng-bind-html=\"valueProp\"></p></div>"
  );


  $templateCache.put('src/core/views/page-menu.html',
    "<div class=\"myfp__pagemenu\"><ul class=\"nav-list\"><li ng-repeat=\"(id, menu) in menuOptions track by $index\" class=\"list-item\"><a ng-href=\"#{{id}}\">{{menu.name}}</a></li></ul></div>"
  );


  $templateCache.put('src/core/views/page-photos.html',
    "<div class=\"myfp__pagephotos\"><ul><li ng-repeat=\"picture in pictures track by $index\"><a ng-href=\"{{picture.big}}\" target=\"_blank\"><img ng-src=\"{{picture.small}}\"> </a><span>{{picture.description}}</span></li></ul></div>"
  );


  $templateCache.put('src/webcontent/views/templates/default/_blank.html',
    ""
  );


  $templateCache.put('src/webcontent/views/templates/default/aboutFanPage.html',
    "<div><page-include value=\"header.html\" fix-header></page-include><div class=\"bodyContent\"><page-details value=\"description\"></page-details></div></div>"
  );


  $templateCache.put('src/webcontent/views/templates/default/blogFanPage.html',
    "<div><page-include value=\"header.html\" fix-header></page-include><page-content></page-content></div>"
  );


  $templateCache.put('src/webcontent/views/templates/default/header.html',
    "<page-details value=\"name\" id=\"titlePage\"></page-details><page-details value=\"cover\" original=\"true\" responsive=\"true\" id=\"coverPicture\"></page-details><page-details value=\"logo\" original=\"false\" id=\"logoPage\"></page-details><page-menu id=\"menuPage\"></page-menu>"
  );


  $templateCache.put('src/webcontent/views/templates/default/main.html',
    "<div><page-include value=\"header.html\" fix-header></page-include></div>"
  );


  $templateCache.put('src/webcontent/views/templates/default/photoFanPage.html',
    "<div><page-include value=\"header.html\" fix-header></page-include><page-photos></page-photos></div>"
  );


  $templateCache.put('src/webcontent/views/templates/default/service.html',
    "<div><page-include value=\"header.html\" fix-header></page-include><page-content></page-content></div>"
  );

}]);
