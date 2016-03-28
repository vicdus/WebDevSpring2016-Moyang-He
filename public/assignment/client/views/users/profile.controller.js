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
            var modifiedUser = {
                username: $scope.username,
                password: $scope.password,
                _id: $rootScope.user._id,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email
            };
            UserService
                .updateUser($rootScope.user._id, modifiedUser)
                .then(function (user) {
                    $rootScope.user = user;
                })
        }
    }

})();