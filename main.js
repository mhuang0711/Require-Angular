'use strict';
(function () {

    requirejs.config({
        baseUrl: './',
        paths: {
            'angular': 'libs/angular/angular',
            'angular-route': 'libs/angular/angular-route',
            'text': 'libs/require/text'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular-route': {
                deps: ['angular'],
                exports: 'ngRouteModule'
            }
        },
        deps: []
    });

    require(['angular', 'route-map'], function(angular){
        angular.bootstrap(document, ['webapp']);
    });

})(window);