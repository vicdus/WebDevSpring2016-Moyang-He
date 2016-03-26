'use strict';

module.exports = function (app, model) {
    app.get("/api/assignment/form/:formId", findFormById);

    function findFormById(req, res) {
        var formId = req.params.formId;
        model
            .findFormById(formId)
            .then(function (form) {
                res.json(form);
            });
    }
};