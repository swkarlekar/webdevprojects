var mainApp = angular.module("mainApp", ['ngRoute', 'webcontrollers', 'firebase']);
 
mainApp.config(function($routeProvider) {
    $routeProvider
         .when('/Lab04', {
            templateUrl: 'Lab04/Lab04.html',
            controller: 'ScrabbleController'
        })
        .when('/Lab03', {
            templateUrl: 'Lab03/Lab03.html',
            controller: 'FormController'
        })
        .when('/Lab02', {
            templateUrl: 'Lab02/Lab02.html',
            controller: 'DOMTreeController'
        })
        .when('/Lab01', {
            templateUrl: 'Lab01/Lab01.html',
            controller: 'QuizGameController'
        })
        .when('/Lab00', {
            templateUrl: 'Lab00/Lab00.html',
            controller: 'ContentController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'LabController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

