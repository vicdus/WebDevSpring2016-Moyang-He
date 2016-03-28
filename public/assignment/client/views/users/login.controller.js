(function () {
    'use strict';
    FormBuilderApp.controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        $scope.login = login;

        function login() {
            var username = $scope.username;
            var pwd = $scope.password;
            UserService
                .findUserByCredentials(username, pwd)
                .then(function (user) {
                        if (user != null) {
                            $rootScope.user = user;
                            $location.url("/profile");
                        }
                    }
                )
        }

    }
})();