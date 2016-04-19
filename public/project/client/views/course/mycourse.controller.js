'use strict';
(function () {
    WebRegApp.controller("MyCourseController", MyCourseController);
    function MyCourseController($scope, CourseService, UserService, $rootScope) {
        function getMyCourses() {
            CourseService
                .findCoursesByUserId($rootScope.user._id)
                .then(function (courses) {
                    $scope.courses = courses;
                })
        }

        getMyCourses();
        $scope.hasConflict = false;

        $scope.remove = function remove(courseId) {
            CourseService
                .quitByUserIdAndCourseId($rootScope.user._id, courseId)
                .then(function (res) {
                    getMyCourses();
                })
        };

        $scope.isInstructor = function () {
            return $rootScope.user.role == "instructor";
        };

        $scope.createCourse = function (newCourse) {
            if (noTimeConflict(newCourse)) {
                CourseService
                    .createCourseForUser(newCourse, $rootScope.user._id)
                    .then(function (res) {
                        getMyCourses();
                    });
                $scope.hasConflict = false;
            } else {
                $scope.hasConflict = true;
            }

        };

        $scope.incomplete = function (newClass) {
            return newClass == null || newClass.CourseName == "" || newClass.whatDay == "" || newClass.startHour == "" ||
                newClass.endHour == "" || newClass.location == "" || newClass.description == "";
        };


        function noTimeConflict(course) {
            var conflict = $scope.courses.filter(function (curCourse) {
                return !(curCourse.startHour > course.endHour || curCourse.endHour < course.startHour);
            });
            return conflict.length == 0;
        }


    }
})();