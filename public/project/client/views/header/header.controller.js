"use strict";

(function () {
    WebRegApp.controller('HeaderController', function ($scope, $rootScope, $http, $location, $window) {

        $scope.isLogin = function () {
            return $rootScope.user != null;
        };

        $scope.isAdminLogin = function () {
            if ($scope.isLogin() && $rootScope.user.roles != undefined) {
                return $rootScope.user.roles.indexOf("admin") != -1;
            }
            return false;
        };

        $scope.username = function () {
            if ($scope.isLogin()) {
                return $rootScope.user.username;
            } else {
                return "HIDEN";
            }
        };


        $scope.logout = function () {
            $http
                .post("/api/logout")
                .success(function (res) {
                    console.log("logout!");
                    $rootScope.user = null;
                    $window.location.reload();
                    $location.url("/login")
                });
            $rootScope.user = null;
        }

    });
})();















