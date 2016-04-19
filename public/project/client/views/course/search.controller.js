'use strict';
(function () {
    WebRegApp.controller("SearchController", SearchController);
    function SearchController($scope, CourseService) {

        function getAllCourses() {
            CourseService
                .findAllCourses()
                .then(function (courses) {
                    $scope.courses = courses;
                })
        }

        getAllCourses();




    }
})();