"use strict";

(function () {
    FormBuilderApp.controller("ProfileController", ProfileController);
    function ProfileController($scope, $rootScope, $location, UserService) {
        $scope.username = $rootScope.user.username;
        $scope.password = $rootScope.user.password;
        $scope.firstName = $rootScope.user.firstName;
        $scope.lastName = $rootScope.user.lastName;
        $scope.email = $rootScope.user.email;

        $scope.update = function () {
            console.log($rootScope.user);
        }
    }

})();