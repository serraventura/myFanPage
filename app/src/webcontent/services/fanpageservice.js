'use strict';

angular.module('myFanPageApp').factory('FanPageService', function (Facebook, $q, $log) {

  // Private API
  var publicApi = null;

  // Public API
  var FanPageService = function() { // constructor

    // properties
    publicApi = this;

    // methods


  };

  return FanPageService;

});
