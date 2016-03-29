"use strict";

(function () {
    FormBuilderApp.controller('FormController', function ($scope, $rootScope, FormService) {
        var userId = $rootScope.user._id;
        $scope.curForm = null;

        FormService
            .findAllFormsForUser(userId)
            .then(function (forms) {
                $scope.forms = forms;
            });

        //TBD
        $scope.addForm = function () {
            var form = {title: $scope.title, userId: userId, _id: Math.random()};
            if ($scope.curForm != null) {
                FormService
                    .createFormForUser(userId, form)
                    .then(function (forms) {
                        $scope.forms = forms;
                        $scope.curForm = null;
                        $scope.title = "";
                    });
            }
        };

        $scope.updateForm = function () {
            if ($scope.curForm != null) {
                $scope.curForm.title = $scope.title;
                FormService
                    .updateFormById($scope.curForm._id, $scope.curForm)
                    .then(function (forms) {
                        $scope.forms = forms;
                        $scope.curForm = null;
                        $scope.title = "";
                    })
            }
        };

        $scope.deleteForm = function (index) {
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(function (forms) {
                    $scope.forms = forms;
                    $scope.curForm = null;
                    $scope.title = "";
                })
        };

        $scope.selectForm = function (index) {
            $scope.curForm = {
                _id: $scope.forms[index]._id,
                userId: $rootScope.user._id,
                title: $scope.forms[index].title,
                fields: $scope.forms[index].fields
            };
            $scope.title = $scope.curForm.title;
        }
    })
})();




