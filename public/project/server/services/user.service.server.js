'use strict';


module.exports = function (app, UserModel) {
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUserById);
    app.get("/api/project/user/username=:username", findUserByUsername);
    app.get("/api/project/letter/:id", findLetterByUserId);
    app.post("/api/project/letter/", sendLetterToUserId);


    function createUser(req, res) {
        UserModel
            .createUser(req.body)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        var deferred = q.defer();
        UserModel.update({_id: UserId}, {$set: User}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.findOne({_id: UserId}, function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(req, res) {
        var deferred = q.defer();
        UserModel.findOne({username: req.params.username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findLetterByUserId(req, res) {

    }

    function sendLetterToUserId(req, res) {

    }

};