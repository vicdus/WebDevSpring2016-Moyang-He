"use strict";

(function () {
    FormBuilderApp.controller('SidebarController', function SidebarController($scope, $rootScope, $location) {
        $scope.isActive = function (item) {
            return $location.url() == "/" + item;
        };

        $scope.isLogin = function () {
            return $rootScope.user != null;
        };

        $scope.isAdminLogin = function () {
            if ($scope.isLogin() && $rootScope.user.roles != undefined) {
                for (var i = 0; i < $rootScope.user.roles.length; i++) {
                    if ($rootScope.user.roles[i] == "admin") {
                        return true;
                    }
                }
            } else {
                return false;
            }
        };

    });
})();


