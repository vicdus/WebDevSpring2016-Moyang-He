"use strict";

module.exports = function (app,db,mongoose) {
    var userModel = require("./models/user.model.js")(mongoose, db);
    var formModel = require("./models/course.model.js")(mongoose, db);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/course.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
};