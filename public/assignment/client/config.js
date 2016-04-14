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
                    templateUrl: "views/home/home.view.html"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/fields", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController"
                })
                .otherwise({
                    redirectTo: '/home'
                });
        });


    function isLogin($q, $rootScope, $location) {
        var deferred = $q.defer();
        if ($rootScope.user != null) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url("/login");
        }
        return deferred.promise
    }

    function isAdminLogin($q, $rootScope, $location) {
        var deferred = $q.defer();
        if ($rootScope.user != null && $rootScope.user.roles != undefined) {
            for (var i = 0; i < $rootScope.user.roles.length; i++) {
                if ($rootScope.user.roles[i] == "admin") {
                    deferred.resolve();
                    return deferred.promise;
                }
            }
            deferred.reject();
            $location.url("/login");
            return deferred.promise;
        } else {
            deferred.reject();
            $location.url("/login");
            return deferred.promise;
        }
    }


})();

