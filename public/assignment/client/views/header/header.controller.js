"use strict";

(function () {
    FormBuilderApp.controller('HeaderController', function ($scope, $rootScope) {

        $scope.isLogin = function () {
            return $rootScope.currentUser != null;
        };

        $scope.isAdminLogin = function () {
            if ($scope.isLogin() && $rootScope.currentUser.roles != undefined) {
                for (var i = 0; i < $rootScope.currentUser.roles.length; i++) {
                    if ($rootScope.currentUser.roles[i] == "admin") {
                        return true;
                    }
                }
            } else {
                return false;
            }
        };

        $scope.username = function(){
            if($scope.isLogin()){
                return $rootScope.currentUser.username;
            }else{
                return "HIDEN";
            }
        };


        $scope.logout = function () {
            $rootScope.currentUser = null;
        }

    });
})();















