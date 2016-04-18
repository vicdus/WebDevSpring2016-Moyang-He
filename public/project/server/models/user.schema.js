"use strict";
module.exports = function (mongoose) {
    var LetterSchema = require("LetterSchema.js");
    var UserSchema = mongoose.Schema({
        fullName: {type: String, default: ""},
        username: String,
        password: String,
        roles: String,
        letters: {type: [LetterSchema], default: []}
    }, {collection: "puser"});

    return UserSchema;
};