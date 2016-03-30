"use strict";

(function () {
    FormBuilderApp.factory("FormService", formService);

    function formService($http, $q) {
        var api;
        api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById:findFormById
        };
        return api;

        function createFormForUser(userid, newForm) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + newForm.userId + "/form", newForm)
                .success(function (forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userId + "/form")
                .success(function (forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }

        //
        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId)
                .success(function (forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, newForm)
                .success(function (forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }

        function findFormById(formId){
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId)
                .success(function (forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }
    }
})();