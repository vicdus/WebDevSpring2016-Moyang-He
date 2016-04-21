"use strict";

(function () {
    WebRegApp
        .config(function ($routeProvider) {
            $routeProvider
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {isLogin: isLogin}
                })
                .when("/letter", {
                    templateUrl: "views/letter/letter.view.html",
                    controller: "LetterController",
                    resolve: {isLogin: isLogin}
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {isLogin: isLogin}
                })
                .when("/help", {
                    templateUrl: "views/home/help.view.html"
                })
                .when("/mycourse", {
                    templateUrl: "views/course/mycourse.view.html",
                    controller: "MyCourseController",
                    resolve: {isLogin: isLogin}
                })
                .when("/search", {
                    templateUrl: "views/course/search.view.html",
                    controller: "SearchController",
                    resolve: {isLogin: isLogin}
                })
                .otherwise({
                    redirectTo: '/home'
                });
        });


    function isLogin($q, $http, $rootScope, $location) {
        var deferred = $q.defer();
        //$http
        //    .get("/api/project/loggedin")
        //    .success(function (res) {
        //        console.log(res);
        //        deferred.resolve(res);
        //        $rootScope.user = res;
        //    });
        //return deferred.promise
        if ($rootScope.user == null) {
            $location.path("/login");
        }
    }


})();

