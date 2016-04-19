'use strict';


module.exports = function (app, UserModel) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var mongoose = require("mongoose");


    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUserById);
    app.get("/api/project/user/username=:username", findUserByUsername);
    app.get("/api/project/letter/:id", findLetterByUserId);
    app.post("/api/project/letter/", sendLetterToUserId);
    app.post("/api/project/login", passport.authenticate("projectLogin"), login);
    app.post('/api/project/logout', logout);
    app.get('/api/project/loggedin', loggedin);

    passport.use("projectLogin", new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var auth = authorized;

    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials({username: username, password: password})
            .then(function (user) {

                if (user == null) {
                    return done(null, false)
                } else {
                    return done(null, user)
                }
            })
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(function (user) {
                    done(null, user);
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : req.user);
    }


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