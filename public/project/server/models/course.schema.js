"use strict";

module.exports = function (mongoose) {
    var CourseSchema = mongoose.Schema({
        CourseName: String,
        instructorId: String,
        instructorUsername: String,
        location: String,
        enrolledInStudentsId: {type: [String], default: []},
        enrolledInUsername: {type: [String], default: []},
        whatDay: {type: Number, min: 1, max: 7},
        startHour: {type: Number, min: 0, max: 24},
        endHour: {type: Number, min: 0, max: 24},
        description: {type: String, default: "Class description"}
    }, {collection: "course"});

    return CourseSchema;
};