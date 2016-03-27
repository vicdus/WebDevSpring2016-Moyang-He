'use strict';

module.exports = function () {
    var api;
    var allForms = require("./form.mock.json");
    api = {
        createForm: createForm,
        deleteFormById:deleteFormById,
        findAllForm: findAllForm,
        findFormById: findFormById,
        updateFormById:updateFormById,

        findFormByTitle:findFormByTitle,

        findFormsByUserId:findFormsByUserId
    };
    return api;

    function findFormByTitle(title) {
        var res = null;
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i].title == title) {
                return allForms[i];
            }
        }
        return null;
    }

    function createForm(newForm) {
        allForms.push(newForm);
        return allForms;
    }

    function findAllForm() {
        return allForms;
    }

    function findFormById(formId) {
        var res = null;
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                return allForms[i];
            }
        }
        return null;
    }

    function updateFormById(formId, form) {
        var res = null;
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                allForms[i] = form;
                return;
            }
        }
    }

    function deleteFormById(formId) {
        for (var i = 0; i < allForms.length; i++) {
            if (allForms[i]._id == formId) {
                allForms.splice(i, 1);
                break;
            }
        }
    }

    function findFormsByUserId(userId){
        var res = [];
        for(var i = 0; i < allForms.length; i++){
            if(allForms[i].userId == userId){
                res.push(allForms[i]);
            }
        }
        return res;
    }

};