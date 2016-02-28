"use strict";

(function () {
    FormBuilderApp.factory('FormService', function () {
        var service = {};
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ];

        service.createFormForUser = function (userId, form, callback) {
            var res = form;
            res._id = (new Date).getTime().toString();
            res.userId = userId;
            forms.push(res);
            callback(res)
        };

        service.findAllFormsForUser = function (userId, callback) {
            var res = [];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userId == userId) {
                    res.push(forms[i]);
                }
            }
            callback(res);
        };

        service.deleteFormById = function (formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        };

        service.updateFormById = function (formId, newForm, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i] = newForm;
                }
            }
            callback(newForm);
        };
        return service;
    });
})();




