"use strict";

(function () {
    WebRegApp.controller("ProfileController", ProfileController);
    function ProfileController($scope, $rootScope, UserService) {
        $scope.username = $rootScope.user.username;
        $scope.password = $rootScope.user.password;
        $scope.fullName = $rootScope.user.fullName;

        $scope.update = function () {
            console.log($rootScope.user);
            //var modifiedUser = {
            //    username: $scope.username,
            //    password: $scope.password,
            //    _id: $rootScope.user._id,
            //    fullName: $scope.fullName
            //};
            //UserService
            //    .updateUser($rootScope.user._id, modifiedUser)
            //    .then(function (user) {
            //        $rootScope.user = user;
            //    })
        }
    }

})();