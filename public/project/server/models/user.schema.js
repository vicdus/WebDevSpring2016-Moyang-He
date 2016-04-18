"use strict";
module.exports = function (mongoose) {
    var LetterSchema = require("./letter.schema.js")(mongoose);
    var UserSchema = mongoose.Schema({
        fullName: {type: String, default: "John Doe"},
        username: String,
        password: String,
        roles: String,
        letters: {type: [LetterSchema], default: []}
    }, {collection: "projectUser"});

    return UserSchema;
};