'use strict';

angular.module('myFanPageApp', [
    'ngRoute',
    'ngSanitize',
    'angularUtils.directives.dirPagination',
    'infinite-scroll',
    'oc.lazyLoad'
])

.config(function ($routeProvider, FanPageConfig, ENV) {

    var prefixAbsoluteTemplateUrl = FanPageConfig.prefixAbsoluteTemplateUrl || '';

    // if there is template cache available no need to load absolute path
    if (ENV.templateCache) prefixAbsoluteTemplateUrl = '';

    var mainTemplateUrl = prefixAbsoluteTemplateUrl + 'src/webcontent/views/templates/' + FanPageConfig.template + '/main.html';
    var pageTemplateUrl = prefixAbsoluteTemplateUrl + 'src/webcontent/views/templates/' + FanPageConfig.template + '/_blank.html';

    if (FanPageConfig.anchorContent) {
        pageTemplateUrl = mainTemplateUrl;
    }

    $routeProvider
        .when('/', {
            templateUrl: mainTemplateUrl,
        })
        .when('/:name', {
            templateUrl: pageTemplateUrl,
        })
        .otherwise({
            redirectTo: '/'
        });

})

.run(function (FanPageConfig, $location) {

    var prefixAbsoluteTemplateUrl = FanPageConfig.prefixAbsoluteTemplateUrl || '';

    MYFP.util.loadJS(prefixAbsoluteTemplateUrl + 'src/webcontent/views/templates/' + FanPageConfig.template + '/assets/js/' + FanPageConfig.template + '.js');
    MYFP.util.loadCSS(prefixAbsoluteTemplateUrl + 'src/webcontent/views/templates/' + FanPageConfig.template + '/assets/styles/' + FanPageConfig.template + '.css');

    if ($location.path() == '') {

        var menuOption = Object.keys(FanPageConfig.menu || {}).map(function (item) { return FanPageConfig.menu[item] }).find(function (item) { return item.initialPage });
        if (menuOption) $location.path('/' + menuOption);

    }

})
