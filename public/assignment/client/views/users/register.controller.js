"use strict";

(function () {
    FormBuilderApp.controller('RegisterController', function ($scope, $rootScope, $location, UserService) {
        $scope.reg = function () {
            var newUser = {
                username: $scope.inputUsername,
                password: $scope.inputPassword,
                email: $scope.inputEmail
            };
            console.log(newUser);

            UserService
                .createUser(newUser)
                .then(function (createdUser) {
                    $rootScope.user = createdUser;
                    $location.path('/profile');
                });
        };

    })
})();





