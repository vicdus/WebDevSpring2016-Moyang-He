"use strict";

module.exports = function (mongoose) {
    var ClassSchema = mongoose.Schema({
        className: String,
        instructorId: String,
        location: String,
        whatDay: {type: Number, min: 1, max: 7},
        startHour: {type: Number, min: 0, max: 24},
        endHour: {type: Number, min: 0, max: 24},
        description: {type: String, default: ""},
        enrolledInStudentsId: {type: Schema.Types.ObjectId, default: []}
    }, {collection: "class"});

    return ClassSchema;
};