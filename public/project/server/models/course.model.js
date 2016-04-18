'use strict';
var q = require("q");

module.exports = function (mongoose, db, UserModel) {
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

    CourseModel.remove({}, function (err, res) {
    });
    var sample = {
        CourseName: "CourseName",
        instructorId: "instructorId",
        location: "location",
        whatDay: 1,
        startHour: 12,
        endHour: 13
    };

    CourseModel.create(sample, function (err, res) {
    });


    return api;

    function enrollByUserIdAndCourseId(userId, courseId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) deferred.reject(err);
            else {
                CourseModel.findOne({_id: courseId}, function (err, course) {
                    if (err) deferred.reject(err);
                    else {
                        course.enrolledInStudentsId.push(user._id);
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
                            return id != courseId;
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

    function noTimeConflict(userId, course) {
        return userId == course;
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
        CourseModel.find({enrolledInStudentsId: userId}, function (err, courses) {
            if (err) deferred.reject(err);
            else deferred.resolve(courses);
        });
        return deferred.promise;
    }
};