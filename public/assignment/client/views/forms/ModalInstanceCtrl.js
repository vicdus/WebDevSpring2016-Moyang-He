(function () {

    FormBuilderApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, FieldService, field, formId) {
        $scope.field = field;
        $scope.formId = formId;


        $scope.showOptions = function () {
            var type = field.type;
            return type == "OPTIONS" || type == "CHECKBOXES" || type == "RADIOS";
        };
        $scope.showPlaceHolder = function () {
            var type = field.type;
            return type == "TEXT" || type == "TEXTAREA" || type == "EMAIL";
        };


        $scope.new_label = field.label;
        if ($scope.showOptions()) {
            var stropt = "";
            console.log(field.options);
            for (var i = 0; i < field.options.length; i++) {
                console.log(field.options[i]);
                temp = {};
                temp.label = field.options[i].label;
                temp.value = field.options[i].value;
                stropt += JSON.stringify(temp);
                stropt += "\n"
            }
            $scope.new_options = stropt;
        }
        if ($scope.showPlaceHolder()) {
            $scope.new_placeholder = field.placeholder;
        }


        $scope.okM = function (formId, fieldId, newField) {
            console.log(newField);
            FieldService
                .updateField(formId, fieldId, newField)
                .then(function (field) {
                    $uibModalInstance.close(field)
                })

        };


    })
})();