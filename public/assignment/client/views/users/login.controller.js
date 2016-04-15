(function () {
    'use strict';
    FormBuilderApp.controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        $scope.login = login;

        function login(user) {
            if (user) {
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            $rootScope.user = response.data;
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