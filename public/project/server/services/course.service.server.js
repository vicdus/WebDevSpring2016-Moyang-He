'use strict';

module.exports = function (app, model) {
    app.get("/api/project/course", findAllCourses);
    app.get("/api/project/user/:userId/course", findCoursesByUserId);
    app.post("/api/project/user/:userId/course", course);
    app.post("/api/project/user/:userId/course/:courseId/enroll", enrollByUserIdAndCourseId);
    app.post("/api/project/user/:userId/course/:courseId/quit", enrollByUserIdAndCourseId);


};