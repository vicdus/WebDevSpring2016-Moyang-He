"use strict";

module.exports = function (app,db,mongoose) {
    var userModel = require("./models/user.model.js")(mongoose, db);
    var formModel = require("./models/form.model.js")(mongoose, db);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
};