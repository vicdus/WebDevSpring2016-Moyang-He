'use strict';

module.exports = function () {
    var allUsers = JSON.parse("user.mock.json");
    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUserById: updateUserById,

        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;


    function findUserByUsername(username) {
        var res = null;
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username == username) {
                return allUser[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        var res = null;
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username == credentials.username && allUser[i].password == credentials.password) {
                return allUsers[i];
            }
        }
        return null;
    }

    function findAllUsers() {
        return allUsers;
    }

    function createUser(newUser) {
        allUsers[n] = newUser;
        return allUsers;
    }

    function findAllUser() {
        return allUsers;
    }

    function findUserById(UserId) {
        var res = null;
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id == UserId) {
                return allUsers[i];
            }
        }
        return null;
    }

    function updateUserById(UserId, User) {
        var res = null;
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id == UserId) {
                allUsers[i] = User;
                return;
            }
        }
    }

    function deleteUserById(UserId) {
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id == UserId) {
                allUsers.splice(i, 1);
                break;
            }
        }
    }

};