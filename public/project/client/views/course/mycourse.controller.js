'use strict';
(function () {
    WebRegApp.controller("MyCourseController", MyCourseController);
    function MyCourseController($scope, CourseService, UserService, $rootScope) {
        function getMyCourses() {
            console.log($rootScope.user);
            CourseService
                .findCoursesByUserId($rootScope.user._id)
                .then(function (courses) {
                    $scope.courses = courses;
                })
        }
        getMyCourses();


    }
})();