"use strict";

(function () {
    WebRegApp.factory('UserService', UserService);

    function UserService($http, $q) {
        var api;
        api = {login: login};

        return api;


        function login(user) {
            return $http.post("/api/project/login", user);
        }

    }
})();

