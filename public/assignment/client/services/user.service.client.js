"use strict";

(function () {
    FormBuilderApp.factory('UserService', UserService);

    function UserService($http) {
        var service = {};

        service.findUserByUsername = function (username) {
            $http
                .get("/api/assignment/user/" + username)
                .success(function (res) {
                    return res;
                })
        };

        return service;
    }
})();

