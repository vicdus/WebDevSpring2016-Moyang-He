'use strict';

module.exports = function (app, model) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);

    function findAllFormsForUser(req, res) {
        model
            .findFormsByUserId(req.params.userId)
            .then(function (forms) {
                res.json(forms);
            });
    }


    function findFormById(req, res) {
        model
            .findFormById(req.params.formId)
            .then(function (form) {
                res.json(form);
            });
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        model
            .deleteFormById(formId)
            .then(function(forms){
                res.json(forms);
            });
    }
    //
    function createFormForUser(req, res) {
        var form = req.body;
        model
            .createForm(form)
            .then(function (forms) {
                res.json(forms);
            });
    }


    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model
            .updateFormById(formId, form)
            .then(function (forms) {
                res.json(forms);
            });
    }

};