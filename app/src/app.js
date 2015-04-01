'use strict';

angular.module('myFanPageApp', [
  'ngRoute',
  'facebook'
])

.config(function(FacebookProvider, FanPageConfig) {
  FacebookProvider.init(FanPageConfig.fanPageId);
})

.config(function ($routeProvider, FanPageConfig) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/webcontent/views/templates/'+FanPageConfig.template+'/main.html',
      controller: 'WebContentCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
