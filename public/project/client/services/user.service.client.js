"use strict";

(function () {
    WebRegApp.factory('UserService', UserService);

    function UserService($http, $q) {
        var api;
        api = {
            login: login,
            updateUserById: updateUserById,
            createUser: createUser,
            createLetter: createLetter,
            findLettersByUsername: findLettersByUsername
        };

        return api;


        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function updateUserById(user, userId) {
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

        function createLetter(letter) {
            console.log(letter);
            var deferred = $q.defer();
            $http.post("/api/project/letter/", letter)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function findLettersByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/project/letter/user/" + username)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }


    }
})();

