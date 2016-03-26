"use strict";

module.exports=function(app){
    var model = require("./models/user.model.js") ();
    require("./services/user.service.server.js")(app, model);

    var formModel = require("./models/form.model.js") ();
    require("./services/form.service.server.js")(app, formModel);

};