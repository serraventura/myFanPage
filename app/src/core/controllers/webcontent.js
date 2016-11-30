'use strict';

angular.module('myFanPageApp')
    .controller('WebContentCtrl', function (
        $scope,
        $rootScope,
        $q,
        WatchService,
        FanPageConfig,
        PageDetailService,
        PhotoService,
        FeedService,
        ModuleLoader,
        FanPageContent,
        ENV
    ) {

        var arrPromises = [];
        var promise;
        var pageDetailService = new PageDetailService();
        var photoService = new PhotoService();
        var feedService = new FeedService();
        var prefixAbsoluteTemplateUrl = FanPageConfig.prefixAbsoluteTemplateUrl || '';
        var enableCache = FanPageConfig.enableCache || true;

        // if there is template cache available no need to load absolute path
        if (ENV.templateCache) prefixAbsoluteTemplateUrl = '';

        // TODO: decide whow to organize the watches blocks
        WatchService.watchRoutes($scope);

        $scope.FanPageContent = FanPageContent;
        $scope.templatePath = prefixAbsoluteTemplateUrl + 'src/webcontent/views/templates/' + FanPageConfig.template;

        promise = pageDetailService.getPageInfos().then(function (res) {
            $rootScope.$broadcast('page-infos-ready');
            ModuleLoader.loadAll();
        });
        arrPromises.push(promise);

        promise = pageDetailService.getProfilePicture().then(function (res) {
            $rootScope.$broadcast('page-profile-picture-ready');
        });
        arrPromises.push(promise);

        promise = photoService.getPhotoPage().then(function (res) {
            $rootScope.$broadcast('page-photo-ready');
        });
        arrPromises.push(promise);

        promise = feedService.getMenuContent().then(function (res) {
            $rootScope.$broadcast('menu-content-ready');
        });
        arrPromises.push(promise);

        function makeCache() {

            var fanPageContentCache = {
                dateCriation: new Date(),
                data: FanPageContent
            };

            try {
                fanPageContentCache = JSON.stringify(fanPageContentCache);
            } catch (err) {
                console.log('Error generating cache: ', err);
            }

            localStorage.setItem('fanPageContentCache', fanPageContentCache);

        };

        $q.all(arrPromises).then(function (data) {

            //TODO: maybe the cache checking should be isolated
            // handling cache
            if (typeof Storage !== 'undefined') {

                if (enableCache) {

                    if (localStorage.getItem('fanPageContentCache') != null) {

                        try {

                            var cache = JSON.parse(localStorage.getItem('fanPageContentCache'));
                            var now = new Date().getDate();
                            var dateCriation = new Date(cache.dateCriation || now).getDate();

                            if ((now - dateCriation) < 1) {
                                localStorage.removeItem('fanPageContentCache');
                                makeCache();
                            };

                        } catch (err) {
                            console.log('Error in cache: ', err);
                        }

                    } else {
                        makeCache();
                    }

                } else {
                    localStorage.removeItem('fanPageContentCache');
                }

            }

        }, function (err) {

        });

    });
