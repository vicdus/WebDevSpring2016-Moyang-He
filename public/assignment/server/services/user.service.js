'use strict';

module.exports = function (app, model) {
    app.get("/api/assignment/user/:id", findUserById);

    function findUserById(req, res) {
        var userId = req.params.id;
        model
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }
};