"use strict";

(function () {
    FormBuilderApp.factory('UserService', function () {
        var service = {};
        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];


        service.findUserByCredentials = function (username, password, callback) {
            var res = null;
            var i;
            for (i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    res = users[i];
                }
            }
            callback(res)
        };


        service.findAllUsers = function (callback) {
            callback(users);
        };

        service.createUser = function (newUser, callback) {
            newUser._id = (new Date).getTime();
            users.push(newUser);
            callback(newUser);
        };

        service.deleteUserById = function (userid, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userid) {
                    users.splice(i, 1);
                    break;
                }
            }
            callback(users);
        };

        service.updateUser = function (userId, user, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    user[i] = user;
                }
            }
            callback(user);
        };

        return service;

    });
})();




