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
    CourseModel.remove({}, function (err, res) {

    });
    return api;

    function enrollByUserIdAndCourseId(userId, courseId) {

    }

    function quitByUserIdAndCourseId(userId, courseId) {

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

    }


};