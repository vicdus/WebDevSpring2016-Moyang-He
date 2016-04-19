(function () {
    'use strict';
    WebRegApp.controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        $scope.login = login;

        function login(user) {
            if (user) {
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            $rootScope.user = response.data;
                            console.log($rootScope.user);
                            $location.url("/profile");
                        },
                        function (err) {
                            $scope.error = err;
                        }
                    )
            }
        }

    }
})();