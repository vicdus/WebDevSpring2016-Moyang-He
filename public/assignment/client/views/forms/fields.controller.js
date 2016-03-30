"use strict";

(function () {
    FormBuilderApp.controller('FieldController', function ($scope, $rootScope, FieldService, $uibModal, $log) {
        $scope.form = $rootScope.curForm;
        $scope.hasForm = function () {
            return $scope.form != null;
        };

        $scope.ttt = function () {
            console.log($scope.inputType);
        };

        $scope.showPlaceHolder = function () {
            return $scope.inputType == "Single Line Text" || $scope.inputType == "Date";
        };

        $scope.showOptions = function () {
            return $scope.inputType == "Dropdown" || $scope.inputType == "Checkboxes" || $scope.inputType == "Radio buttons" || $scope.inputType == "Multi Line Text";
        };


        $scope.addField = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/assignment/client/views/forms/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: "sm",
                resolve: {
                    items: {
                        sp: $scope.showPlaceHolder(), so: $scope.showOptions()
                    }

                }
            });

            modalInstance.result.then(
                function (selectedItem) {
                    $scope.selected = selectedItem;
                },
                function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        };
        $scope.removeField = function (ind) {
            FieldService
                .deleteFieldFromForm($scope.form._id, $scope.form.fields[ind]._id)
                .then(function (fields) {
                    $scope.form.fields = fields;
                })
        };
        $scope.items = ['item1', 'item2', 'item3'];
    });


    FormBuilderApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        console.log(items);
        $scope.sp = items["sp"];
        $scope.so = items["so"];

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });


})();




