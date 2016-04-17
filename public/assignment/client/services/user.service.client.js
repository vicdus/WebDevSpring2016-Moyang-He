"use strict";

(function () {
    FormBuilderApp.factory('UserService', UserService);

    function UserService($http, $q) {
        var api;
        api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            login: login
        };


        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/username=" + username)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/username=" + username + "&password=" + password)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user")
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user", user)
                .success(function (createdUser) {
                    deferred.resolve(createdUser);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/user/" + userId)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/user/" + userId, user)
                .success(function (modifiedUser) {
                    deferred.resolve(modifiedUser);
                });
            return deferred.promise;
        }

        return api;

    }
})();

