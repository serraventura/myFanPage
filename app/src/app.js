'use strict';

angular.module('myFanPageApp', [
  'ngRoute'
])

.config(function() {

})

.config(function ($routeProvider, FanPageConfig) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/main.html',
      controller: 'WebContentCtrl'
    })
    .when('/aboutFanPage', {
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/aboutFanPage.html',
      controller: 'WebContentCtrl'
    })
    .when('/photoFanPage', {
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/photoFanPage.html',
      controller: 'WebContentCtrl'
    })
    .when('/blogFanPage', {
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/blogFanPage.html',
      controller: 'WebContentCtrl'
    })
    .otherwise({
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/others.html',
      controller: 'WebContentCtrl'
    });
});
