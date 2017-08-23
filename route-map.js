define([
    'angular',
    'require',
    'angular-route'
], function(angular, require) {
    console.log(angular);
    var app = angular.module('webapp', [
        'ngRoute'
    ]);

    app.config(['$routeProvider', '$controllerProvider',
        function($routeProvider, $controllerProvider) {

            var routeMap = {
                '/model1': {
                    path: 'app/model1/controller.js',
                    controller: 'app1Controller'
                },
                '/model2': {
                    path: 'app/model2/controller.js',
                    controller: 'app2Controller'
                },
                '/model2/:name': {
                    path: 'app/model2/controller.js',
                    controller: 'app2Controller'
                }
            };

            var defaultRoute = '/model1';

            $routeProvider.otherwise({redirectTo: defaultRoute});

            for (var key in routeMap) {
                $routeProvider.when(key, {
                    template: '',
                    controller: routeMap[key].controller,
                    resolve:{
                        keyName: requireModule(routeMap[key].path, routeMap[key].controller)
                    }
                });
            }

            function requireModule(path, controller) {
                return function ($route, $q) {
                    var deferred = $q.defer();
                    require([path], function (ret) {
                        $controllerProvider.register(controller, ret.controller);
                        $route.current.template = ret.tpl;
                        deferred.resolve();
                    });
                    return deferred.promise;
                }
            }

        }]);
    return app;
})