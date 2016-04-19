"use strict";

(function () {
    WebRegApp.factory("CourseService", CourseService);

    function CourseService($http, $q) {
        var api;
        api = {
            findAllCourses: findAllCourses,
            findCoursesByUserId: findCoursesByUserId,
            createCourseForUser: createCourseForUser,
            enrollByUserIdAndCourseId: enrollByUserIdAndCourseId,
            quitByUserIdAndCourseId: quitByUserIdAndCourseId
        };
        return api;

        function findAllCourses() {
            var deferred = $q.defer();
            $http
                .get("/api/project/course")
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function findCoursesByUserId(userId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user/" + userId + "/course")
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function createCourseForUser(course, userId) {
            var deferred = $q.defer();
            $http
                .post("/api/project/user/" + userId + "/course", course)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function enrollByUserIdAndCourseId(userId, courseId) {
            var deferred = $q.defer();
            $http
                .post("/api/project/user/" + userId + "/course/" + courseId + "/enroll")
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function quitByUserIdAndCourseId(userId, courseId) {
            var deferred = $q.defer();
            $http
                .post("/api/project/user/" + userId + "/course/" + courseId + "/quit")
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }


    }
})();