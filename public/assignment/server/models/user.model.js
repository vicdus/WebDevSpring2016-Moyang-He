'use strict';

module.exports = function (app) {
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
};