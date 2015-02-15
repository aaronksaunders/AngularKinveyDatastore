/**
 * UI-Router information
 * =====================
 * @see - https://github.com/angular-ui/ui-router/wiki
 *
 *
 * Kinvey Information
 * ==================
 * @see - http://devcenter.kinvey.com/angular/guides/users
 * @see - http://devcenter.kinvey.com/angular/guides/datastore
 */
var app = angular.module('kinveyRestAPIApp', ['ui.router', 'appServices', 'appControllers']);


app.run(['$rootScope', '$state', function ($rootScope, $state) {

    // this code handles any error when trying to change state.
    $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
            console.log('$stateChangeError ' + error.error);

            // if the error is "noUser" the go to login state
            if (error && error.error === "noUser") {
                $state.go('app.login', {});
            }
        });
}])
    .constant('KINVEY', {
        APPINFO: {

        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


        // top level abstract state used to initialize Kinvey before anything
        // else happens.
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                template: "<ui-view/>",
                resolve: {
                    kinveyInit: function (KinveyService) {
                        return KinveyService.init();
                    }
                }
            })
            // the list view which is displayed ONLY if we can get a UserObject from
            // the Kinvey Service, if we cannot, an error is generated on the stateChange
            // and the user is re-directed to the login screen, see app.run
            .state('app.list', {
                url: "/list",
                templateUrl: "views/list.html",
                controller: "ListController",
                resolve: {
                    UserObject: function (KinveyService, kinveyInit) {
                        return KinveyService.currentUser(kinveyInit);
                    }
                }
            })
            // login state that is needed to log the user in after logout
            // or if there is no user object available
            .state('app.login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: "LoginController"
            });

        // For any unmatched url, redirect to /list
        $urlRouterProvider.otherwise("app/list");
    }]);
