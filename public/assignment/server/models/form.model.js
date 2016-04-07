'use strict';
var q = require("q");

module.exports = function () {
    var api;
    var allForms = require("./form.mock.json");
    api = {
        findFormsByUserId: findFormsByUserId,
        createForm: createForm,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        createFieldForFormId: createFieldForFormId,
        updateFieldByFormIdAndFieldId: updateFieldByFormIdAndFieldId
    };
    return api;

    function createFieldForFormId(formId, field) {
        var deferred = q.defer();
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                field._id = Math.random();
                allForms[i].fields.push(field);
                deferred.resolve(allForms[i].fields);
                break;
            }
        }
        return deferred.promise;
    }


    //function findFormByTitle(title) {
    //    var res = null;
    //    for (var i = 0; i < allForms.length; i++) {
    //        if (allForms[i].title == title) {
    //            return allForms[i];
    //        }
    //    }
    //    return null;
    //}
    //
    function createForm(newForm) {
        allForms.push(newForm);
        return api.findFormsByUserId(newForm.userId);
    }

    //
    //function findAllForm() {
    //    return allForms;
    //}
    //
    function findFormById(formId) {
        var deferred = q.defer();
        var res = allForms.filter(function (form) {
            return form._id == formId;
        })[0];
        deferred.resolve(res);
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var deferred = q.defer();
        var userId = findUserIdByFormId(formId);
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                allForms[i] = form;
            }
        }
        return api.findFormsByUserId(userId);
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        var userId = findUserIdByFormId(formId);
        allForms = allForms.filter(function (form) {
            return form._id != formId;
        });
        return api.findFormsByUserId(userId);
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();
        var res = allForms.filter(function (form) {
            return form.userId == userId;
        });
        deferred.resolve(res);
        return deferred.promise;
    }

    function findUserIdByFormId(formId) {
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                return allForms[i].userId;
            }
        }
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId) {
        var deferred = q.defer();
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                allForms[i].fields = allForms[i].fields.filter(function (field) {
                    return field._id != fieldId;
                });
                deferred.resolve(allForms[i].fields);
            }
        }
        return deferred.promise;
    }

    function updateFieldByFormIdAndFieldId(formId, fieldId, field) {
        var deferred = q.defer();
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                for (var j = 0; j < allForms[i].fields.length; j++) {
                    if (allForms[i].fields[j]._id == fieldId) {
                        allForms[i].fields[j] = field;
                        deferred.resolve(allForms[i].fields);
                        return deferred.promise;
                    }
                }
            }
        }
    }


};