'use strict';

angular.module('myFanPageApp', [
  'ngRoute'
])

.config(function ($routeProvider, FanPageConfig) {

  $routeProvider
    .when('/', { 
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/main.html',
    })
    .when('/:name', { 
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/_blank.html',
    })
    .otherwise({
      redirectTo: '/'
    });

})

.run(function(FanPageConfig) {

  myFanPageApp1.util.loadJS('src/webcontent/views/templates/'+FanPageConfig.template+'/assets/js/'+FanPageConfig.template+'.js');
  myFanPageApp1.util.loadCSS('src/webcontent/views/templates/'+FanPageConfig.template+'/assets/styles/'+FanPageConfig.template+'.css');

})