'use strict';

module.exports = function (app, model) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        model
            .findFormsByUserId(userId)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        model
            .findFormById(formId)
            .then(function (form) {
                res.json(form);
            });
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        model
            .deleteFormById(formId);
    }

    function createFormForUser(req, res) {
        var form = req.body;
        model
            .createForm(form)
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model
            .updateFormById(formId, form)
            .then(function (users) {
                res.json(users);
            });
    }

};