"use strict";

(function () {
    FormBuilderApp.controller("ProfileController", function ($scope, $rootScope, $location, UserService) {
        var curUser = $rootScope.currentUser;

        $scope.username = curUser.username;
        $scope.password = curUser.password;
        $scope.firstName = curUser.firstName;
        $scope.lastName = curUser.lastName;
        $scope.email = curUser.email;

        $scope.update = function () {
            curUser.username = $scope.username;
            curUser.password = $scope.password;
            curUser.firstName = $scope.firstName;
            curUser.lastName = $scope.lastName;
            curUser.email = $scope.email;
            UserService.updateUser(curUser._id, curUser, function () {
            })
        };


    })

})();