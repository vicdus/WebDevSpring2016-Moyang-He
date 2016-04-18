'use strict';
var q = require("q");

module.exports = function (mongoose, db) {
    var api;
    api = {
        createUser: createUser,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        sendLetterToUserId: sendLetterToUserId,
        findLetterByUserId: findLetterByUserId
    };

    var UserSchema = require('./user.schema.js')(mongoose);
    var userModel = mongoose.model("userModel", UserSchema);

    userModel.remove({}, function (err, users) {
    });


    var alice = {username: "alice", lastName: "alice", firstName: "alice", password: "alice", roles: ["admin"]};
    userModel.create(alice, function (err, user) {
    });


    return api;


};