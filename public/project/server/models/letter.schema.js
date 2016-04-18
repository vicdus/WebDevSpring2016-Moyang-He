"use strict";
module.exports = function (mongoose) {
    var LetterSchema = mongoose.Schema({
        from: String,
        to: String,
        content: String,
        date: {type: Date, default: Date.now}
    });

    return LetterSchema;
};