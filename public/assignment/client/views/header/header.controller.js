"use strict";

(function () {
    FormBuilderApp.controller('HeaderController', function ($scope, $rootScope) {

        $scope.isLogin = function () {
            return $rootScope.user != null;
        };

        $scope.isAdminLogin = function () {
            if ($scope.isLogin() && $rootScope.user.roles != undefined) {
                for (var i = 0; i < $rootScope.user.roles.length; i++) {
                    if ($rootScope.user.roles[i] == "admin") {
                        return true;
                    }
                }
            } else {
                return false;
            }
        };

        $scope.username = function(){
            if($scope.isLogin()){
                return $rootScope.user.username;
            }else{
                return "HIDEN";
            }
        };


        $scope.logout = function () {
            $rootScope.user = null;
        }

    });
})();















