"use strict";
module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        fullName: {type: String, default: "John Doe"},
        username: String,
        password: String,
        role: String
    }, {collection: "projectUser"});

    return UserSchema;
};