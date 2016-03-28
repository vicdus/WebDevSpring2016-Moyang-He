"use strict";

(function () {
    FormBuilderApp.controller('FormController', function ($scope, $rootScope, FormService) {

        var userId = $rootScope.user._id;


        FormService
            .findAllFormsForUser(userId)
            .then(function (forms) {
                $scope.forms = forms;
            });


        $scope.addForm = function () {
            var form = {title: $scope.title, userId: userId};
            FormService
                .createFormForUser(userId, form)
                .then(function (forms) {
                    $scope.forms = forms;
                });
            $scope.name = "";
        };
        //
        //$scope.updateForm = function () {
        //    if ($scope.curForm != null) {
        //        $scope.curForm.title = $scope.name;
        //        FormService.updateFormById($scope.curForm._id, $scope.curForm, pullData);
        //        $scope.curForm = null;
        //        $scope.name = "";
        //    }
        //};
        //
        //$scope.deleteForm = function (index) {
        //    FormService.deleteFormById($scope.forms[index]._id, pullData);
        //};
        //
        //$scope.selectForm = function (index) {
        //    $scope.curForm = {
        //        _id: $scope.forms[index]._id,
        //        userId: $scope.forms[index].userId,
        //        title: $scope.forms[index].title
        //    };
        //    $scope.name = $scope.curForm.title;
        //}
    })
})();




