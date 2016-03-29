'use strict';
var q = require("q");

module.exports = function () {
    var api;
    var allForms = require("./form.mock.json");
    api = {
        findFormsByUserId: findFormsByUserId,
        createForm: createForm,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };
    return api;

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
    //function findFormById(formId) {
    //    var res = null;
    //    for (var i = 0; i < allForms.length; i++) {
    //        if (allForms[i]._id == formId) {
    //            return allForms[i];
    //        }
    //    }
    //    return null;
    //}
    //
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


};