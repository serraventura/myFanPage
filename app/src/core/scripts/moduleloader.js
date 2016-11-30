'use strict';

angular.module('myFanPageApp')
    .factory('ModuleLoader', function ($ocLazyLoad, $compile, $rootScope, $http, FanPageConfig, ENV) {

        function getAllAttributes(domElement, returnString) {

            var attrObj = {};
            var attrString = '';

            for (var att, i = 0, atts = domElement.attributes, n = atts.length; i < n; i++) {
                att = atts[i];
                //attrObj[att.nodeName] = att.nodeValue;
                attrObj[att.nodeName] = att.value;
                attrString = attrString + att.nodeName + '="' + att.value + '" ';

            }

            if (returnString) {
                return attrString;
            } else {
                return attrObj;
            }

        };

        // Public API here
        return {

            loadAll: function () {

                if (FanPageConfig.hasOwnProperty('plugin')) {

                    var p;
                    var arrDirectiveElements, promise;
                    var scope = $rootScope.$new();

                    for (p in FanPageConfig.plugin) {

                        if (FanPageConfig.plugin.hasOwnProperty(p) && FanPageConfig.plugin[p]) {

                            var prefixAbsoluteTemplateUrl = FanPageConfig.prefixAbsoluteTemplateUrl || '';
                            var pathPlugin = prefixAbsoluteTemplateUrl + 'src/webcomponent/' + p.toLowerCase() + '/' + p.toLowerCase() + '.js';

                            if (ENV.development) {
                                promise = $ocLazyLoad.load({ name: p.toLowerCase(), files: [pathPlugin], serie: true });
                            } else {
                                promise = $ocLazyLoad.inject(p.toLowerCase());
                            }

                            promise.then(function () {

                                $http.get(pathPlugin).then(function (fileContent) {

                                    var regExp = /\.directive\(['"]([^'"\n]+)['"]/g;
                                    var match = fileContent.data.match(regExp);

                                    var arrDirectives = match.toString()
                                        .replace(new RegExp('.directive\\(', 'g'), '')
                                        .replace(new RegExp("\\'", 'g'), '')
                                        .replace(new RegExp('\\"', 'g'), '').split(',');

                                    arrDirectiveElements = [];

                                    for (var i = 0; i < arrDirectives.length; i++) {

                                        arrDirectiveElements.push(
                                            (MYFP.util.camelCaseToDash(arrDirectives[i])).toLowerCase()
                                        );

                                    }

                                    var el, elToAppend, directivePart1;

                                    for (var i = 0; i < arrDirectiveElements.length; i++) {

                                        //TODO: remove dom manipulation from service

                                        directivePart1 = arrDirectiveElements[i]

                                        $('body').find(arrDirectiveElements[i]).each(function () {

                                            el = $(this);

                                            elToAppend = $compile(angular.element('<' + arrDirectiveElements[i] + ' ' + getAllAttributes(el.get(0), true) + '></' + arrDirectiveElements[i] + '>'))(scope);
                                            el.after(elToAppend);
                                            el.remove();

                                        });

                                    }

                                });

                            }, function (e) {
                                console.log(e);
                            });

                        };

                    };

                } else {
                    return undefined;
                };

            },
            loadFile: function (files) {
                return $ocLazyLoad.load(files);
            }

        };

    });
