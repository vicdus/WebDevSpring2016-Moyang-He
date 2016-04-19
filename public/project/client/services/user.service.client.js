"use strict";

(function () {
    WebRegApp.factory('UserService', UserService);

    function UserService($http, $q) {
        var api;
        api = {
            login: login,
            updateUserById: updateUserById,
            createUser: createUser
        };

        return api;


        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function updateUserById(user, userId) {
            console.log(user);
            var deferred = $q.defer();
            $http.put("/api/project/user/" + userId, user)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/project/user", user)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }


    }
})();

