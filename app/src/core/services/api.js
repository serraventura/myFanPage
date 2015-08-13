'use strict';

angular.module('myFanPageApp').service('API', function API(FanPageConfig) {

  var API = {};

  API.defaultBase = 'graph.facebook.com';

  API.routes = {

    identifier: {
      protocol: 'https',
      version: '',
      params: {
        access_token: FanPageConfig.token
      }
    },

    feed: {
      protocol: 'https',
      version: '',
      params: {
        access_token: FanPageConfig.token,
        limit: 250
      }

    },

    albums: {
      protocol: 'https',
      version: '',
      params: {
        access_token: FanPageConfig.token
      }
    },

    photos: {
      protocol: 'https',
      version: '',
      params: {
        access_token: FanPageConfig.token
      }
    }

  };

  API.get = function(endPoint, id){

    var base, protocol, URL;
    var params = '';

    if(FanPageConfig.server && FanPageConfig.server.api){
      base = FanPageConfig.server.api;
    }else{
      base = API.defaultBase;
    }

    if(API.routes.hasOwnProperty(endPoint)){

      for (var o in API.routes[endPoint].params){
        params += o + '=' + API.routes[endPoint].params[o] + '&';
      }

      params = params.substring(0,params.length-1);

      if(id){

        if(endPoint == 'identifier' && id){
          URL = API.routes[endPoint].protocol + '://' + base + '/' + id + '?' + params;
        }else{
          URL = API.routes[endPoint].protocol + '://' + base + '/' + id + '/' + endPoint + '?' + params;
        }

      }else{
        URL = API.routes[endPoint].protocol + '://' + base + '/' + endPoint + '?' + params;
      }

      return URL;

    }else{
      return 'http://'+base+'/'+endPoint+'-routenotfound'
    }

  };

  return API;

});
