'use strict';


module.exports = function (app, model) {


    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.get("/api/assignment/user/username=:username", findUserByUsername);

    app.post("/api/project/")

};