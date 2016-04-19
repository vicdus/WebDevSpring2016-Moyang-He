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
            newCourse.instructorId = $rootScope.user._id;
            newCourse.instructorUsername = $rootScope.user.username;
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
            return newClass == null || newClass.CourseName == null || newClass.whatDay == null || newClass.startHour == null ||
                newClass.endHour == null || newClass.location == null || newClass.description == null;
        };


        function noTimeConflict(course) {
            var conflict = $scope.courses.filter(function (curCourse) {
                return !(curCourse.startHour > course.endHour || curCourse.endHour < course.startHour);
            });
            return conflict.length == 0;
        }


        $scope.twittercourse = function () {
            var res = "";
            if ($scope.courses == null || $scope.courses.length == 0) {
                return "no+class!"
            }
            for (var i = 0; $scope.courses != null && i < $scope.courses.length; i++) {
                res += $scope.courses[i].CourseName.replace(" ", "+") + ", "
            }
            return res.slice(0, -2) + "!";
        }

    }
})();