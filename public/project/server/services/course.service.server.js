'use strict';

module.exports = function (app, CourseModel) {
    app.get("/api/project/course", findAllCourses);
    app.get("/api/project/user/:userId/course", findCoursesByUserId);
    app.post("/api/project/user/:userId/course", createCourseForUser);
    app.post("/api/project/user/:userId/course/:courseId/enroll", enrollByUserIdAndCourseId);
    app.post("/api/project/user/:userId/course/:courseId/quit", quitByUserIdAndCourseId);


    function findAllCourses(req, res) {
        CourseModel
            .findAllCourses()
            .then(function (courses) {
                res.json(courses);
            })
    }

    function findCoursesByUserId(req, res) {
        CourseModel
            .findCoursesByUserId(req.params.userId)
            .then(function (courses) {
                res.json(courses);
            });
    }

    function createCourseForUser(req, res) {
        CourseModel
            .createCourseForUser(req.body, req.params.userId)
            .then(function (course) {
                res.json(course);
            })
    }

    function enrollByUserIdAndCourseId(req, res) {
        CourseModel
            .enrollByUserIdAndCourseId(req.params.userId, req.params.courseId)
            .then(function (user) {
                res.json(user);
            })
    }

    function quitByUserIdAndCourseId(req, res) {
        CourseModel
            .quitByUserIdAndCourseId(req.params.userId, req.params.courseId)
            .then(function (user) {
                res.json(user);
            })
    }


};