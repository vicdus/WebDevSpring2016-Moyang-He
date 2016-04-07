"use strict";

(function () {
    FormBuilderApp.controller('FormController', function ($scope, $rootScope, FormService) {
        var userId = $rootScope.user._id;
        $rootScope.curForm = null;

        FormService
            .findAllFormsForUser(userId)
            .then(function (forms) {
                $scope.forms = forms;
            });

        //TBD
        $scope.addForm = function () {
            var form = {title: $scope.title, userId: userId, _id: Math.random()};
            FormService
                .createFormForUser(userId, form)
                .then(function (forms) {
                    $scope.forms = forms;
                    $rootScope.curForm = null;
                    $scope.title = "";
                })
        };

        $scope.updateForm = function () {
            if ($rootScope.curForm != null) {
                $rootScope.curForm.title = $scope.title;
                FormService
                    .updateFormById($rootScope.curForm._id, $rootScope.curForm)
                    .then(function (forms) {
                        $scope.forms = forms;
                        $rootScope.curForm = null;
                        $scope.title = "";
                    })
            }
        };

        $scope.deleteForm = function (index) {
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(function (forms) {
                    $scope.forms = forms;
                    $rootScope.curForm = null;
                    $scope.title = "";
                })
        };

        $scope.selectForm = function (index) {
            $rootScope.curForm = {
                _id: $scope.forms[index]._id,
                userId: $rootScope.user._id,
                title: $scope.forms[index].title,
                fields: $scope.forms[index].fields
            };
            $scope.title = $rootScope.curForm.title;
        }
    })
})();




