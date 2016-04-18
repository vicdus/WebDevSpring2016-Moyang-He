"use strict";

module.exports = function (mongoose) {
    var CourseSchema = mongoose.Schema({
        CourseName: String,
        instructorId: String,
        location: String,
        whatDay: {type: Number, min: 1, max: 7},
        startHour: {type: Number, min: 0, max: 24},
        endHour: {type: Number, min: 0, max: 24},
        description: {type: String, default: "Class description"},
        enrolledInStudentsId: {type: String, default: []}
    }, {collection: "course"});

    return CourseSchema;
};