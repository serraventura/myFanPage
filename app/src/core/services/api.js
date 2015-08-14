'use strict';

angular.module('myFanPageApp').service('API', function API(FanPageConfig) {

  var API = {};

  API.defaultBase = 'graph.facebook.com';

  API.routes = {

    identifier: {
      protocol: 'https',
      version: 'v2.3',
      params: {
        access_token: FanPageConfig.token
      }
    },

    feed: {
      protocol: 'https',
      version: 'v2.3',
      params: {
        access_token: FanPageConfig.token,
        limit: 250
      }

    },

    albums: {
      protocol: 'https',
      version: 'v2.3',
      params: {
        access_token: FanPageConfig.token
      }
    },

    photos: {
      protocol: 'https',
      version: 'v2.3',
      params: {
        access_token: FanPageConfig.token
      }
    }

  };

  API.get = function(endPoint, id, customParams){

    var base, protocol, URL;
    var params = '';

    if(API.routes.hasOwnProperty(endPoint)){

      if(FanPageConfig.server && FanPageConfig.server.api){
        base = FanPageConfig.server.api;
        protocol = '';
      }else{
        base = API.defaultBase;
        protocol = API.routes[endPoint].protocol + '://';
      }

      if (customParams) {
        angular.extend(API.routes[endPoint].params, customParams);
      };

      // server side API enable on config file
      if( protocol == '' && (endPoint == 'identifier' || id) ){

        angular.extend(API.routes[endPoint].params, {
          identifier: id, 
          endPoint: endPoint
        });

        delete API.routes[endPoint].params.access_token;

      }

      for (var o in API.routes[endPoint].params){
        params += o + '=' + API.routes[endPoint].params[o] + '&';
      }

      params = params.substring(0,params.length-1);

      if (protocol != '') {

        if(id){

          if(endPoint == 'identifier' && id){
            URL = protocol + base + '/' + API.routes[endPoint].version + '/' + id + '?' + params;
          }else{
            URL = protocol + base + '/' + API.routes[endPoint].version + '/' + id + '/' + endPoint + '?' + params;
          }

        }else{
          URL = protocol + base + '/' + API.routes[endPoint].version + '/' + endPoint + '?' + params;
        }

      }else{ // server side API enable on config file

        if(id){

          if(endPoint == 'identifier' || id){
            URL = protocol + base + '/identifier?' + params; 
            // http://api/identifier?identifier=424234234234234 => http://api/424234234234234?token=jopjjpopojopj
            // http://api/identifier?identifier=424234234234234&endPoint=feed => http://api/424234234234234/feed/?token=jopjjpopojopj
          }

        }else{
          URL = protocol + base + '/' + endPoint + '?' + params;
        }

      }

      return URL;

    }else{
      return undefined;
    }

  };

  return API;

});
