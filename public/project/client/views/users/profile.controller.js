"use strict";

(function () {
    WebRegApp.controller("ProfileController", ProfileController);
    function ProfileController($scope, $rootScope, UserService) {
        $scope.updatedUser = $rootScope.user;

        $scope.update = function () {
            $scope.updatedUser._id = $rootScope.user._id;
            $scope.updatedUser.role = $rootScope.user.role;
            console.log($scope.updatedUser);
            UserService
                .updateUserById($scope.updatedUser, $rootScope.user._id)
                .then(function (user) {
                    $rootScope.user = user;
                })
        }
    }

})();