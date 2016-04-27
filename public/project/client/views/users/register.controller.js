"use strict";

(function () {
    WebRegApp.controller('RegisterController', function ($scope, $rootScope, $location, UserService) {
        $scope.reg = function (user) {

            UserService
                .createUser(user)
                .then(function (createdUser) {
                    UserService
                        .login(user)
                        .then(function (res) {
                            $rootScope.user = res.data;
                            $location.path('/profile');
                        });
                });


        };

    })
})();





