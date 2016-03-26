"use strict";

(function () {
    FormBuilderApp.factory('FieldService', FieldService);

    function FieldService($http) {
        var service = {};

        service.getFieldsForForm = function (formId) {
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function (res) {
                    return res;
                })
        };

        return service;
    }
})();

