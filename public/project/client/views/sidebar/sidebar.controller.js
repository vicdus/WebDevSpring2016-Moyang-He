"use strict";

(function () {
    WebRegApp.controller('SidebarController', function SidebarController($scope, $rootScope, $location) {
        $scope.isActive = function (item) {
            return $location.url() == "/" + item;
        };

        $scope.isLogin = function () {
            return $rootScope.user != null;
        };

    });
})();


