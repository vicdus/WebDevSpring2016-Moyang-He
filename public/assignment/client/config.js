"use strict";

(function () {
    FormBuilderApp
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
                    resolve: {isLogIn: isLogin}
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {isAdminLogin: isAdminLogin}
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {isLogIn: isLogin}
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    resolve: {isLogIn: isLogin}
                })
                .when("/fields", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    resolve: {isLogIn: isLogin}
                })
                .otherwise({
                    redirectTo: '/home'
                });
        });


    function isLogin($q, $http, $rootScope) {
        var deferred = $q.defer();
        $http
            .get("/api/loggedin")
            .success(function (res) {
                deferred.resolve(res);
                $rootScope.user = res;
            });
        return deferred.promise
    }

    function isAdminLogin($q, $http, $rootScope) {
        var deferred = $q.defer();
        $http
            .get("/api/adminloggedin")
            .success(function (res) {
                deferred.resolve(res);
                $rootScope.user = res;
            });
        return deferred.promise
    }


})();

