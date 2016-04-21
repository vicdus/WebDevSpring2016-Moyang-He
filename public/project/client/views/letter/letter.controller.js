"use strict";

(function () {
    WebRegApp.controller('LetterController', function LetterController($scope, $rootScope, $location, UserService) {

        function getMyLetters() {
            UserService
                .findLettersByUsername($rootScope.user.username)
                .then(function (letters) {
                    $scope.letters = letters;
                })
        }

        getMyLetters();

        $scope.incomplete = function (letter) {
            return letter == null || letter.content == null || letter.toUsername == null;
        };


        $scope.send = function (letter) {
            letter.fromUsername = $rootScope.user.username;
            console.log(letter);
            UserService
                .createLetter(letter)
                .then(function (letters) {
                    console.log(letters);
                    getMyLetters();
                });
        }


    })
})();





