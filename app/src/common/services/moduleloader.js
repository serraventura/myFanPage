'use strict';

angular.module('myFanPageApp')
  .factory('ModuleLoader', function ($ocLazyLoad, $compile, $rootScope, $http, FanPageConfig) {

    // Public API here
    return {

        loadAll: function () {

            if (FanPageConfig.hasOwnProperty('plugin')) {

                var p;
                var arrDirectiveElements;
                var arrPlugins = [];
                var scope = $rootScope.$new();

                for(p in FanPageConfig.plugin){

                    if (FanPageConfig.plugin.hasOwnProperty(p) && FanPageConfig.plugin[p]) {

                      //TODO: files should be loaded by LazyLoad module not by "hand"

                        MYFP.util.loadJS('src/webcomponent/'+p.toLowerCase()+'/'+p.toLowerCase()+'.js');
                        arrPlugins.push('src/webcomponent/'+p.toLowerCase()+'/'+p.toLowerCase()+'.js');

                        $http.get('src/webcomponent/'+p.toLowerCase()+'/'+p.toLowerCase()+'.js').then(function (fileContent) {

                          var regExp = /\.directive\(['"]([^'"\n]+)['"]/g;
                          var match = fileContent.data.match(regExp);

                          var arrDirectives = match.toString()
                            .replace(new RegExp('.directive\\(', 'g'), '')
                            .replace(new RegExp("\\'", 'g'), '')
                            .replace(new RegExp('\\"', 'g'), '').split(',');

                          arrDirectiveElements = [];

                          for (var i = 0; i < arrDirectives.length; i++) {

                            arrDirectiveElements.push(
                              ('<' + MYFP.util.camelCaseToDash(arrDirectives[i]) + '></' + MYFP.util.camelCaseToDash(arrDirectives[i]) + '>').toLowerCase()
                            );

                          }

                          //TODO: the whole logic to check plugins directives should happen after lazyload
                          $ocLazyLoad.load({
                            name: p.toLowerCase(),
                            files: ['src/webcomponent/'+p.toLowerCase()+'/'+p.toLowerCase()+'.js'],
                            serie: true
                          }).then(function () {

                            var el, elToAppend;

                            for (var i = 0; i < arrDirectiveElements.length; i++) {

                              //TODO: get attributes from directives found in the DOM
                              //TODO: remove duplicated directives
                              $('body').find(
                                arrDirectiveElements[i].split('<')[1].replace('>', '')
                              ).each(function(){
                                  
                                  $(this).parent().append(elToAppend); //TODO: get attributes

                                  //TODO: get and apply properties before compiling
                                  elToAppend = $compile( angular.element( arrDirectiveElements[i] ) )(scope);

                              });

                              //el = angular.element('body').find('my-test-plugin').parent();
                              //angular.element('body').find('my-test-plugin').remove();
                              //el.append(elToAppend);

                            }

                          }, function (e) {
                            console.log(e);
                          });


                        });



                    };

                };

                // return $ocLazyLoad.load({
                //     name: '',
                //     files: arrPlugins
                // });

            }else{
                return undefined;
            };

        },
        loadFile: function (files) {
            return $ocLazyLoad.load(files);
        }

    };

  });
