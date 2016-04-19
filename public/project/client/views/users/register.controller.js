"use strict";

(function () {
    WebRegApp.controller('RegisterController', function ($scope, $rootScope, $location, UserService) {
        $scope.reg = function (user) {
            console.log(user);
            UserService
                .createUser(user)
                .then(function (createdUser) {
                    UserService
                        .login(createdUser)
                        .then(function (res) {
                            $rootScope.user = res.data;
                            $location.path('/profile');
                        });
                });


        };

    })
})();





