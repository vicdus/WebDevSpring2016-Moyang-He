"use strict";

(function () {
    FormBuilderApp.controller('RegisterController', function ($scope, $rootScope, $location, UserService) {
        $scope.reg = function () {
            var newUser = {
                username: $scope.inputUsername,
                password: $scope.inputPassword,
                email: $scope.inputEmail
            };

            UserService
                .findUserByUsername(newUser.username)
                .then(function (user) {
                    if (user != null) {
                        window.alert("user already exists!");
                    } else {
                        UserService
                            .createUser(newUser)
                            .then(function (createdUser) {
                                UserService
                                    .login(createdUser)
                                    .then(function (res) {
                                        $location.path('/profile');
                                    });
                            });
                    }
                });


        };

    })
})();





