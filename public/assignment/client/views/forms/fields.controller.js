"use strict";

(function () {
    FormBuilderApp.controller('FieldController', function ($scope, $rootScope, FieldService, $uibModal, $log) {
        $scope.form = $rootScope.curForm;
        $scope.hasForm = function () {
            return $scope.form != null;
        };


        $scope.addField = function () {
            var newType = null;
            if ($scope.inputType == "Single Line Text") {
                newType = "TEXT";
            }
            if ($scope.inputType == "Date") {
                newType = "DATE";
            }
            if ($scope.inputType == "Dropdown") {
                newType = "OPTIONS";
            }
            if ($scope.inputType == "Checkboxes") {
                newType = "CHECKBOXES";
            }
            if ($scope.inputType == "Radio buttons") {
                newType = "RADIOS";
            }
            if ($scope.inputType == "Multi Line Text") {
                newType = "TEXTAREA";
            }
            if (newType != null) {
                var newField = {label: "New " + $scope.inputType, fieldType: newType};
                FieldService
                    .createFieldForForm($scope.form._id, newField)
                    .then(function (fields) {
                        $rootScope.curForm.fields = fields;
                        $scope.form.fields = fields;
                    });
            }
        };

        $scope.updateField = function (ind) {
            $rootScope.curField = $scope.form.fields[ind];

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/assignment/client/views/forms/myModalContent.html',
                size: "sm",
                controller: "ModalInstanceCtrl",
                resolve: {
                    field: function () {
                        return $scope.form.fields[ind]
                    },
                    formId: function () {
                        return $scope.form._id
                    }
                }
            });

            modalInstance.result.then(
                function (fields) {
                    $scope.form.fields = fields;
                });
        };

        $scope.copyField = function (ind) {
            var newField = {};
            newField.label = $scope.form.fields[ind].label;
            newField.fieldType = $scope.form.fields[ind].fieldType;
            newField.placeholder = $scope.form.fields[ind].placeholder;
            newField.options = $scope.form.fields[ind].options;
            FieldService
                .createFieldForForm($scope.form._id, newField)
                .then(function (fields) {
                    $rootScope.curForm.fields = fields;
                    $scope.form.fields = fields;
                });
        };

        $scope.removeField = function (ind) {
            FieldService
                .deleteFieldFromForm($scope.form._id, $scope.form.fields[ind]._id)
                .then(function (fields) {
                    $scope.form.fields = fields;
                })
        };


        $scope.showOptions = function () {
            var fieldType = $scope.field.fieldType;
            return fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS";
        };
        $scope.showPlaceHolder = function () {
            var fieldType = $scope.field.fieldType;
            return fieldType == "TEXT" || fieldType == "TEXTAREA" || fieldType == "EMAIL";
        };


        $scope.ok = function () {
            var newField = {};
            newField._id = $scope.field._id;
            newField.label = $scope.new_label;
            newField.fieldType = $scope.field.fieldType;
            if ($scope.showOptions()) {
                var objoptions = [];
                var strs = $scope.new_options.split("\n");
                for (var i = 0; i < strs.length; i++) {
                    if (strs[i] == "") break;
                    objoptions.push(JSON.parse(strs[i]));
                }
                newField.options = objoptions;
            }
            if ($scope.showPlaceHolder()) {
                newField.placeholder = $scope.new_placeholder;
            }
            $scope.okM($scope.formId, newField._id, newField);


        };


    });


})();




