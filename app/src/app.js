'use strict';

angular.module('myFanPageApp', [
  'ngRoute',
  'facebook'
])

.config(function(FacebookProvider) {
  FacebookProvider.init('YOUR_APP_ID');
})

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/common/views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
