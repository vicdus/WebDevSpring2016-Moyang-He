"use strict";

(function () {
    FormBuilderApp.controller('SidebarController', function SidebarController($scope, $rootScope, $location) {
        $scope.isActive = function (item) {
            return $location.url() == "/" + item;
        };

        $scope.isLogin = function () {
            return $scope.currentUser != null;
        };

        $scope.isAdminLogin = function () {
            if ($scope.isLogin() && $rootScope.currentUser.roles != undefined) {
                for (var i = 0; i < $rootScope.currentUser.roles.length; i++) {
                    if ($rootScope.currentUser.roles[i] == "admin") {
                        return true;
                    }
                }
            } else {
                return false;
            }
        };

    });
})();


