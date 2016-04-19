"use strict";

module.exports = function (app, db, mongoose) {
    var UserModel = require("./models/user.model.js")(mongoose, db);
    var CourseModel = require("./models/course.model.js")(mongoose, db);

    require("./services/user.service.server.js")(app, UserModel);
    require("./services/course.service.server.js")(app, CourseModel);
};