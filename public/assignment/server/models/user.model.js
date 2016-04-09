'use strict';
var q = require("q");

module.exports = function (mongoose, db) {
    var api;
    api = {
        createUser: createUser,
        //deleteUserById: deleteUserById,
        //findAllUsers: findAllUsers,
        //findUserById: findUserById,
        updateUserById: updateUserById,

        //findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    var UserSchema = require('./user.schema.js')(mongoose);
    var allUsers = require("./user.mock.json");


    var userModel = mongoose.model("userModel", UserSchema);

    userModel.remove({}, function (err, users) {
    });
    for (var i = 0; i < allUsers.length; i++) {
        userModel.create(allUsers[i], function (err, res) {
        });
    }


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
        userModel.findOne({username: credentials.username, password: credentials.password}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

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
        userModel.create(newUser, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

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
        userModel.update({_id: UserId}, {$set: User}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                userModel.findOne({_id: UserId}, function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log(user);
                        deferred.resolve(user);
                    }
                });
            }
        });
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