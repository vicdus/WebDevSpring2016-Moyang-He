"use strict";

(function () {
    FormBuilderApp.factory('UserService', UserService);

    function UserService($http) {
        var api;
        api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByUsername(username) {
            $http
                .get("/api/assignment/user/username=" + username)
                .success(function (res) {
                    return res;
                })
        }

        function findUserByCredentials(username, password) {
            $http
                .get("/api/assignment/user/username=" + username + "&password=" + password)
                .success(function (res) {
                    return res;
                })
        }

        function findAllUsers() {
            $http
                .get("/api/assignment/user")
                .success(function (res) {
                    return res;
                })
        }

        function createUser(user) {
            user.id = Math.random();
            user.firstName = "";
            user.lastName = "";
            $http
                .post("/api/assignment/user", user)
                .success(function (res) {
                    return res;
                })
        }

        function deleteUserById(userId) {
            $http
                .delete("/api/assignment/user/" + userId)
                .success(function (res) {
                    return res;
                })
        }

        function updateUser(userId, user) {
            $http
                .post("/api/assignment/user/" + userId, user)
                .success(function (res) {
                    return res;
                })
        }


    }
})();

