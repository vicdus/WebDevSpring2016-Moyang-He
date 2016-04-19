"use strict";
module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        fullName: {type: String, default: "John Doe"},
        username: String,
        password: String,
        role: {type: String, default: "student"}
    }, {collection: "projectUser"});

    return UserSchema;
};