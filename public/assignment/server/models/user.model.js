'use strict';

module.exports = function () {
    var allUser = JSON.parse("user.mock.json");
    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        createUser: createUser,
        updateUser: updateUser
    };
    return api;


    function findUserById(userId) {
        var res = null;
        for (var i = 0; i < i < userId; i++) {
            if (allUser[i]._id == userId) {
                return allUser[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        var res = null;
        for (var i = 0; i < i < userId; i++) {
            if (allUser[i].username == username) {
                return allUser[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        var res = null;
        for (var i = 0; i < i < userId; i++) {
            if (allUser[i].username == credentials.username && allUser[i].password == credentials.password) {
                return allUser[i];
            }
        }
        return null;
    }

    function findAllUsers() {
        return allUser;
    }


};