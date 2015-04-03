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
    .otherwise({
      redirectTo: '/'
    });
});
