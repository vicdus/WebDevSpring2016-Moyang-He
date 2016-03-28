'use strict';
var q = require("q");

module.exports = function () {
    var api;
    var allForms = require("./form.mock.json");
    api = {
        findFormsByUserId: findFormsByUserId
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
        return api.findAllFormsForUser(newForm.userId);
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
    //function updateFormById(formId, form) {
    //    var res = null;
    //    for (var i = 0; i < allForms.length; i++) {
    //        if (allForms[i]._id == formId) {
    //            allForms[i] = form;
    //            return;
    //        }
    //    }
    //}
    //
    //function deleteFormById(formId) {
    //    for (var i = 0; i < allForms.length; i++) {
    //        if (allForms[i]._id == formId) {
    //            allForms.splice(i, 1);
    //            break;
    //        }
    //    }
    //}

    function findFormsByUserId(userId) {
        var deferred = q.defer();
        var res = allForms.filter(function (form) {
            return form.userId == userId;
        });
        deferred.resolve(res);
        return deferred.promise;
    }

};