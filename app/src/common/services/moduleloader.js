'use strict';

angular.module('myFanPageApp')
  .factory('ModuleLoader', function ($ocLazyLoad, $compile, FanPageConfig) {

    // Public API here
    return {

        loadAll: function ($scope) {

            if (FanPageConfig.hasOwnProperty('plugin')) {

                var p;
                var arrPlugins = [];

                for(p in FanPageConfig.plugin){

                    if (FanPageConfig.plugin.hasOwnProperty(p) && FanPageConfig.plugin[p]) {
                        MYFP.util.loadJS('src/webcomponent/'+p.toLowerCase()+'/'+p.toLowerCase()+'.js');
                        arrPlugins.push('src/webcomponent/'+p.toLowerCase()+'/'+p.toLowerCase()+'.js');

                        $ocLazyLoad.load({
                            name: p.toLowerCase(), 
                            files: ['src/webcomponent/'+p.toLowerCase()+'/'+p.toLowerCase()+'.js'],
                            serie: true
                        }).then(function () {

                            var el, elToAppend;
                            elToAppend = $compile('<my-test-plugin></my-test-plugin>')( $scope );
                            el = angular.element('body').find('my-test-plugin').parent();
                            angular.element('body').find('my-test-plugin').remove();
                            el.append(elToAppend);

                        }, function (e) {
                            console.log(e);
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