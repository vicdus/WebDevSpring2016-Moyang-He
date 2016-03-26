"use strict";

(function () {
    FormBuilderApp.controller('LoginController', function ($rootScope, $location, UserService) {
        var model = this;
        model.login = function (){
            var username = model.username;
            var pwd = model.password;
            UserService.findUserByUsernameAndPassword(username, pwd)
                .then(function(user){
                    if(user != null){
                        $rootScope.currentUser = user;
                        $location.path("/profile")
                    }
                })
        };
    })
})();






//$scope.login = function () {
//    UserService.findUserByCredentials($scope.username, $scope.password, function (user) {
//        if (user != null) {
//            $rootScope.currentUser = user;
//            $location.path("/profile")
//        }
//    })
//};
