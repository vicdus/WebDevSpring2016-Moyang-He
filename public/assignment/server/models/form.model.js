'use strict';

module.exports = function () {
    var allForms = JSON.parse("form.mock.json");
    var api = {
        findFormById: findFormById
    };
    return api;

    function findFormById(formId) {
        var res = null;
        for (var i = 0; i < i < userId; i++) {
            if (allForms[i]._id == userId) {
                return allForms[i];
            }
        }
        return null;
    }
};