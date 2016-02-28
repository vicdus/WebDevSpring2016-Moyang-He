"use strict";

(function () {
    FormBuilderApp.controller('RegisterController', function ($scope, $rootScope, $location, UserService) {
        $scope.reg = function () {
            var newUser = {
                username: $scope.inputUsername,
                password: $scope.inputPassword,
                email: $scope.inputEmail
            };

            UserService.createUser(newUser, function (newUser) {
                $rootScope.currentUser = newUser;
                $location.path('/profile');
            });
        };

    })
})();





