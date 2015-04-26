'use strict';
/**
 * @ngdoc overview
 * @name yeomanAngularApp
 * @description
 * # yeomanAngularApp
 *
 * Main module of the application.
 */
angular.module('polls',[])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/ang/Waterfall/ViewTasks', { templateUrl: '/public/partialviews/list', controller:
                WaterfallCtrl}).
            when('/poll/:pollId', { templateUrl: '/public/partialviews/item', controller:
                PollItemCtrl}).
            when('/ang/new', { templateUrl: '/public/partialviews/new', controller:
                PollNewCtrl}).
            otherwise({ redirectTo: '/' });
    }]);