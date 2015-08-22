'use strict';

angular.module('myFanPageApp', [
  'ngRoute',
  'ngSanitize',
  'angularUtils.directives.dirPagination',
  'infinite-scroll',
  'oc.lazyLoad'
])

.config(function ($routeProvider, FanPageConfig) {

  var mainTemplateUrl = 'src/webcontent/views/templates/'+FanPageConfig.template+'/main.html';
  var pageTemplateUrl = 'src/webcontent/views/templates/'+FanPageConfig.template+'/_blank.html';

  if(FanPageConfig.anchorContent){
    pageTemplateUrl = mainTemplateUrl;
  }

  $routeProvider
    .when('/', {
      templateUrl: mainTemplateUrl,
    })
    .when('/:name', {
      templateUrl: pageTemplateUrl,
    })
    .otherwise({
      redirectTo: '/'
    });

})

.run(function(FanPageConfig, $rootScope, $location) {

  MYFP.util.loadJS('src/webcontent/views/templates/'+FanPageConfig.template+'/assets/js/'+FanPageConfig.template+'.js');
  MYFP.util.loadCSS('src/webcontent/views/templates/'+FanPageConfig.template+'/assets/styles/'+FanPageConfig.template+'.css');

  if($location.path() == ''){

    var menuOption = _.remove(_.map(FanPageConfig.menu, function(item, key){
      if(item.initialPage) return key
    }), undefined)[0];

    if(menuOption) $location.path('/'+menuOption);

  }

})
