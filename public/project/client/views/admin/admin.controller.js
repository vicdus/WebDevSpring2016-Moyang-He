"use strict";

(function () {
    FormBuilderApp.controller('AdminController', function AdminController($filter, $scope, $rootScope, $location, UserService) {
            $scope.addUser = addUser;
            $scope.updateUser = updateUser;
            $scope.deleteUser = deleteUser;
            $scope.editUser = editUser;
            $scope.prettyRoles = prettyRoles;
            var orderBy = $filter('orderBy');

            $scope.order = function (predicate) {
                $scope.predicate = predicate;
                $scope.reverse = ($scope.predicate == predicate) ? !$scope.reverse : false;
                $scope.users = orderBy($scope.users, predicate, $scope.reverse);
            };

            $scope.predicate = "";
            $scope.reverse = false;


            function prettyRoles(roles) {
                var res = "";
                for (var i = 0; i < roles.length; i++) {
                    res = res + roles[i] + (i == roles.length - 1 ? "" : ",");
                }
                return res;
            }


            getAllUsers();

            function getAllUsers() {
                UserService
                    .findAllUsers()
                    .then(function (users) {
                        $scope.users = users;
                    })
            }

            function addUser() {
                var roles = $scope.rolesText != null ? $scope.rolesText.split(",") : [];
                var newUser = {
                    username: $scope.username,
                    password: $scope.password,
                    firstName: $scope.firstname,
                    lastName: $scope.lastname,
                    roles: roles
                };
                console.log(newUser);
                UserService.createUser(newUser)
                    .then(function (response) {
                        getAllUsers();
                        $scope.username = "";
                        $scope.password = "";
                        $scope.firstname = "";
                        $scope.lastname = "";
                        $scope.rolesText = "";
                    });

            }

            function updateUser() {
                if ($scope.user == null) return;
                var roles = $scope.rolesText != null ? $scope.rolesText.split(",") : [];
                console.log(roles);
                var newUser = {
                    username: $scope.username,
                    password: $scope.password,
                    firstName: $scope.firstname,
                    lastName: $scope.lastname,
                    roles: roles
                };
                UserService
                    .updateUser($scope.user._id, newUser)
                    .then(function (response) {
                        $scope.user = null;
                        getAllUsers();
                        $scope.username = "";
                        $scope.password = "";
                        $scope.firstname = "";
                        $scope.lastname = "";
                        $scope.rolesText = "";
                    });
            }

            function deleteUser(user) {
                UserService
                    .deleteUserById(user._id)
                    .then(function (res) {
                        $scope.user = null;
                        getAllUsers();
                    });
            }

            function editUser(user) {
                $scope.user = user;
                $scope.username = user.username;
                $scope.password = user.password;
                $scope.firstname = user.firstName;
                $scope.lastname = user.lastName;
                $scope.rolesText = prettyRoles(user.roles);
            }

        }
    )
})();





