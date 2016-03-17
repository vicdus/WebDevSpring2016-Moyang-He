"use strict";

(function () {
    FormBuilderApp.controller('LoginController', function ($scope, $rootScope, $location, UserService) {
        $scope.login = function () {
            UserService.findUserByCredentials($scope.username, $scope.password, function (user) {
                if (user != null) {
                    $rootScope.currentUser = user;
                    $location.path("/profile")
                }
            })
        };


    })
})();





