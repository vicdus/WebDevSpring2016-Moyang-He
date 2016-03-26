"use strict";

(function () {
    FormBuilderApp.factory('FormService', FormService);

    function FormService($http) {
        var service = {};

        service.findFormById = function (formId) {
            $http
                .get("/api/assignment/form/" + formId)
                .success(function (res) {
                    return res;
                })
        };

        return service;
    }
})();

