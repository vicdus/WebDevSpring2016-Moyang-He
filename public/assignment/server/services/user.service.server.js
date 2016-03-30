'use strict';

module.exports = function (app, model) {
    app.get("/api/assignment/user/username=:username&password=:password", findUserByUsernameAndPassword);
    //
    app.post("/api/assignment/user", createUser);
    //app.delete("/api/assignment/user/:id", deleteUser);
    //app.get("/api/assignment/user", findAllUsers);
    //
    app.put("/api/assignment/user/:id", updateUser);
    //
    ////app.get("/api/assignment/user/username=:username", findUserByUsername);
    //
    //app.get("/api/assignment/user/:id", findUserById);


    function createUser(req, res) {
        var user = req.body;
        model
            .createUser(user)
            .then(function (users) {
                res.json(users);
            });
    }
    //
    //function deleteUser(req, res) {
    //    var userId = req.params.id;
    //    model
    //        .deleteUser(userId)
    //}
    //
    //function findAllUsers(req, res) {
    //    model
    //        .findAllUsers()
    //        .then(function (users) {
    //            res.json(users);
    //        });
    //}
    //
    //
    //function findUserById(req, res) {
    //    var userId = req.params.id;
    //    model
    //        .findUserById(userId)
    //        .then(function (user) {
    //            res.json(user);
    //        });
    //}

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        model
            .updateUserById(userId, user)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByUsernameAndPassword(req, res) {
        var credentials = {username: req.params.username, password: req.params.password};
        model
            .findUserByCredentials(credentials)
            .then(function (user) {
                res.json(user);
            })
    }
};