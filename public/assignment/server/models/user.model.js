'use strict';
var q = require("q");

module.exports = function (mongoose, db) {
    var api;
    api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUserById: updateUserById,

        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    var UserSchema = require('./user.schema.js')(mongoose);
    var allUsers = require("./user.mock.json");


    var userModel = mongoose.model("userModel", UserSchema);

    userModel.remove({}, function (err, users) {
    });


    var alice = {username: "alice", lastName: "alice", firstName: "alice", password: "alice", roles: ["admin"]};
    userModel.create(alice, function (err, user) {
        console.log(err);
    });


    return api;


    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        return userModel.findOne({username: credentials.username, password: credentials.password});
    }


    function findAllUsers() {
        var deferred = q.defer();
        userModel.find({}, function (err, users) {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(users)
            }
        });
        return deferred.promise;
    }

    function createUser(newUser) {
        console.log(newUser);
        var deferred = q.defer();
        userModel.create(newUser, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(user);
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }


    function findUserById(userId) {
        return userModel.findOne({_id: userId});
    }

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

    function deleteUserById(userId) {
        var deferred = q.defer();
        userModel
            .remove({_id: userId}, function (err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

};