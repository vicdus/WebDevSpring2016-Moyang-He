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
                var newField = {label: "New " + $scope.inputType, type: newType, options: [], placeholder: ""};
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


        $scope.removeField = function (ind) {
            FieldService
                .deleteFieldFromForm($scope.form._id, $scope.form.fields[ind]._id)
                .then(function (fields) {
                    $scope.form.fields = fields;
                })
        };


        $scope.showOptions = function () {
            var type = $scope.field.type;
            return type == "OPTIONS" || type == "CHECKBOXES" || type == "RADIOS";
        };
        $scope.showPlaceHolder = function () {
            var type = $scope.field.type;
            return type == "TEXT" || type == "TEXTAREA" || type == "EMAIL";
        };


        $scope.ok = function () {
            var newField = {};
            newField._id = $scope.field._id;
            newField.label = $scope.field.label;
            newField.type = $scope.field.type;
            if ($scope.showOptions()) {
                var objoptions = [];
                var strs = $scope.new_options.split("\n");
                for (var i = 0; i < strs.length; i++) {
                    objoptions.push(JSON.parse(strs[i]));
                }
                newField.options = objoptions;
            }
            if ($scope.showPlaceHolder()) {
                newField.placeholder = $scope.new_placeholder;
            }
            $scope.okM($scope.formId, newField._id, newField);


        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    });


})();




