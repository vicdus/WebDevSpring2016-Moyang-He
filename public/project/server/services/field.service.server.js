'use strict';

module.exports = function (app, model) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdAndFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldForFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdAndFieldId);

    function findAllFieldsByFormId(req, res) {
        model
            .findAllFieldsByFormId(req.params.formId)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function findFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .findFieldByFormIdAndFieldId(formId, fieldId)
            .then(function (form) {
                res.json(form);
            });
    }

    function deleteFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteFieldByFormIdAndFieldId(formId, fieldId)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function createFieldForFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;

        model
            .createFieldForFormId(formId, field)
            .then(function (field) {
                console.log("yo");
                res.json(field);
            });
    }

    function updateFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        model
            .updateFieldByFormIdAndFieldId(formId, fieldId, field)
            .then(function (forms) {
                res.json(forms);
            });
    }

};