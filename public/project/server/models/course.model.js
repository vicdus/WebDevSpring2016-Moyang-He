'use strict';
var q = require("q");

module.exports = function (mongoose, db) {
    var api;
    api = {
        findAllCourses: findAllCourses,
        createCourseForUser: createCourseForUser,
        enrollByUserIdAndCourseId: enrollByUserIdAndCourseId,
        quitByUserIdAndCourseId: quitByUserIdAndCourseId,
        findCoursesByUserId: findCoursesByUserId
    };

    var CourseSchema = require("./course.schema.js")(mongoose);
    var CourseModel = mongoose.model("CourseModel", CourseSchema);
    var UserSchema = require('./user.schema.js')(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    CourseModel.remove({}, function (err, res) {
    });
    var sample = {
        CourseName: "Web Development",
        instructorId: "Example Instructor 1",
        instructorUsername: "professor 1",
        location: "ORCAS",
        whatDay: 4,
        startHour: 15,
        endHour: 19
    };

    var sample2 = {
        CourseName: "Object Oriented Design",
        instructorId: "Example Instructor 2",
        instructorUsername: "professor 2",
        location: "Whidby",
        whatDay: 1,
        startHour: 18,
        endHour: 21
    };

    var sample3 = {
        CourseName: "Algorithm",
        instructorId: "Example Instructor 3",
        instructorUsername: "professor 3",
        location: "Brain Brige",
        whatDay: 1,
        startHour: 12,
        endHour: 14
    };


    CourseModel.create(sample, function (err, res) {
    });
    CourseModel.create(sample2, function (err, res) {
    });
    CourseModel.create(sample3, function (err, res) {
    });

    return api;

    function enrollByUserIdAndCourseId(userId, courseId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) deferred.reject(err);
            else {
                CourseModel.findOne({_id: courseId}, function (err, course) {
                    if (err) deferred.reject(err);
                    else if (course.enrolledInStudentsId.indexOf(userId) == -1) {
                        course.enrolledInStudentsId.push(user._id);
                        course.enrolledInUsername.push(user.username);
                        CourseModel.update({_id: courseId}, {$set: course}, function (err, updatedCourse) {
                            if (err) deferred.reject(err);
                            else {
                                deferred.resolve(updatedCourse);
                            }
                        })

                    }
                })
            }
        });
        return deferred.promise;
    }

    function quitByUserIdAndCourseId(userId, courseId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) deferred.reject(err);
            else {
                CourseModel.findOne({_id: courseId}, function (err, course) {
                    if (err) deferred.reject(err);
                    else {
                        course.enrolledInStudentsId = course.enrolledInStudentsId.filter(function (id) {
                            return id == courseId;
                        });

                        course.enrolledInUsername = course.enrolledInUsername.filter(function (username) {
                            return username != user.username;
                        });

                        CourseModel.update({_id: courseId}, {$set: course}, function (err, updatedCourse) {
                            if (err) deferred.reject(err);
                            else {
                                deferred.resolve(updatedCourse);
                            }
                        })
                    }
                })
            }
        });
        return deferred.promise;
    }


    function findAllCourses() {
        var deferred = q.defer();
        CourseModel.find({}, function (err, res) {
            if (err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }


    function createCourseForUser(course, userId) {
        var deferred = q.defer();
        course.instructorId = userId;
        CourseModel.create(course, function (err, res) {
            if (err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findCoursesByUserId(userId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) deferred.reject(err);
            else {
                if (user != null && user.role == "student") {
                    CourseModel.find({enrolledInStudentsId: userId}, function (err, courses) {
                        if (err) deferred.reject(err);
                        else deferred.resolve(courses);
                    });
                } else {
                    CourseModel.find({instructorId: userId}, function (err, courses) {
                        if (err) deferred.reject(err);
                        else deferred.resolve(courses);
                    })
                }
            }
        });

        return deferred.promise;
    }
};