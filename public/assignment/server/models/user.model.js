'use strict';
var q = require("q");

module.exports = function () {
    var api;
    var allUsers = require("./user.mock.json");
    api = {
        createUser: createUser,
        //deleteUserById: deleteUserById,
        //findAllUsers: findAllUsers,
        //findUserById: findUserById,
        updateUserById: updateUserById,

        //findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;


    //function findUserByUsername(username) {
    //    var res = null;
    //    for (var i = 0; i < allUsers.length; i++) {
    //        if (allUsers[i].username == username) {
    //            return allUsers[i];
    //        }
    //    }
    //    return null;
    //}

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        var res = null;
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username == credentials.username && allUsers[i].password == credentials.password) {
                deferred.resolve(allUsers[i]);
                break;
            }
        }
        return deferred.promise;
    }
    //
    //function findAllUsers() {
    //    var deferred = q.defer();
    //    deferred.resolve(allUsers);
    //    return deferred.promise;
    //}

    function createUser(newUser) {
        var deferred = q.defer();
        allUsers.push(newUser);
        deferred.resolve(newUser);
        return deferred.promise;
    }

    //
    //function findUserById(userId) {
    //    var deferred = q.defer();
    //    for (var i = 0; i < allUsers.length; i++) {
    //        if (allUsers[i]._id == userId) {
    //            deferred.resolve(allUsers[i]);
    //        }
    //    }
    //    return deferred.promise;
    //}

    function updateUserById(UserId, User) {
        var deferred = q.defer();
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id == UserId) {
                allUsers[i] = User;
                deferred.resolve(User);
                break;
            }
        }
        return deferred.promise;
    }

    //function deleteUserById(UserId) {
    //    for (var i = 0; i < allUsers.length; i++) {
    //        if (allUsers[i]._id == UserId) {
    //            allUsers.splice(i, 1);
    //            break;
    //        }
    //    }
    //}

};