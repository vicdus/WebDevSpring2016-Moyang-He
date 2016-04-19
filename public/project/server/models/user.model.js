'use strict';
var q = require("q");

module.exports = function (mongoose, db) {
    var api;
    api = {
        createUser: createUser,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById
    };

    var UserSchema = require('./user.schema.js')(mongoose);
    var UserModel = mongoose.model("ProjectUserModel", UserSchema);

    UserModel.remove({}, function (err, users) {
    });


    var alice = {username: "alice", fullName: "alice", password: "alice", role: "student"};
    UserModel.create(alice, function (err, user) {
    });

    var bob = {username: "bob", fullName: "bob", password: "bob", role: "instructor"};
    UserModel.create(bob, function (err, user) {
    });

    return api;


    function createUser(newUser) {
        var deferred = q.defer();
        UserModel.create(newUser, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(user);
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function updateUserById(UserId, User) {
        var deferred = q.defer();
        UserModel.update({_id: UserId}, {$set: User}, function (err, user) {
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

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne({username: credentials.username, password: credentials.password});
    }


    function findUserById(userId) {
        return UserModel.findOne({_id: userId});
    }
};