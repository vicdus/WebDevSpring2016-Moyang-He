'use strict';
(function () {
    WebRegApp.controller("SearchController", SearchController);
    function SearchController($scope, CourseService, $rootScope) {

        function getAllCourses() {
            CourseService
                .findAllCourses()
                .then(function (courses) {
                    $scope.courses = courses;
                })
        }

        function getMyCourses() {
            CourseService
                .findCoursesByUserId($rootScope.user._id)
                .then(function (courses) {
                    $scope.mycourses = courses;
                })
        }

        getAllCourses();
        getMyCourses();
        $scope.hasConflict = false;


        $scope.take = function take(course) {
            if (noTimeConflict(course)) {
                CourseService
                    .enrollByUserIdAndCourseId($rootScope.user._id, course._id)
                    .then(function (res) {
                        $scope.hasConflict = false;
                        getAllCourses();
                        getMyCourses();
                    });
            } else {
                $scope.hasConflict = true;
            }
        };

        function noTimeConflict(course) {
            var conflict = $scope.mycourses.filter(function (curCourse) {
                return !(curCourse.startHour > course.endHour || curCourse.endHour < course.startHour);
            });
            return conflict.length == 0;
        }


    }
})();