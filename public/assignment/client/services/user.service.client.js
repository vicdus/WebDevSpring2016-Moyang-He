"use strict";

(function () {
    FormBuilderApp.factory('UserService', UserService);

    function UserService($http, $q) {
        var api;
        api = {
            //findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            //findAllUsers: findAllUsers,
            createUser: createUser,
            //deleteUserById: deleteUserById,
            updateUser: updateUser
        };


        //function findUserByUsername(username) {
        //
        //    $http
        //        .get("/api/assignment/user/username=" + username)
        //        .success(function (res) {
        //            return res;
        //        })
        //}

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/username=" + username + "&password=" + password)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        //function findAllUsers() {
        //    var deferred = $q.defer();
        //    $http
        //        .get("/api/assignment/user")
        //        .success(function (res) {
        //            return res;
        //        })
        //}

        function createUser(user) {
            var deferred = $q.defer();
            user.id = Math.random();
            user.firstName = "";
            user.lastName = "";
            $http
                .post("/api/assignment/user", user)
                .success(function (createdUser) {
                    deferred.resolve(createdUser);
                });
            return deferred.promise;
        }

        //function deleteUserById(userId) {
        //    $http
        //        .delete("/api/assignment/user/" + userId)
        //        .success(function (res) {
        //            return res;
        //        })
        //}
        //
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

