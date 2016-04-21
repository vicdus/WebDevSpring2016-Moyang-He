"use strict";
module.exports = function (mongoose) {
    var LetterSchema = mongoose.Schema({
        fromUsername: String,
        toUsername: String,
        content: String,
        date: {type: Date, default: Date.now}
    }, {collection: "letter"});

    return LetterSchema;
};