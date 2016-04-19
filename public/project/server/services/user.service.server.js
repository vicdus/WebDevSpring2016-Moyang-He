'use strict';


module.exports = function (app, UserModel) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var mongoose = require("mongoose");

    app.get('/api/project/loggedin', loggedin);
    passport.use("projectLogin", new LocalStrategy(localStrategy));
    app.post("/api/project/login", passport.authenticate("projectLogin"), login);
    app.get("/api/project/user/username=:username", findUserByUsername);
    app.get("/api/project/letter/:id", findLetterByUserId);

    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUserById);

    app.post("/api/project/letter/", sendLetterToUserId);

    app.post('/api/project/logout', logout);


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
        console.log("usr=" + user);
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("usr=" + user);
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
        res.send(req.isAuthenticated() ? req.user : null);
    }


    function createUser(req, res) {
        UserModel
            .createUser(req.body)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        //var deferred = q.defer();
        //UserModel
        //return deferred.promise;
    }

    function findUserByUsername(req, res) {
    }

    function findLetterByUserId(req, res) {

    }

    function sendLetterToUserId(req, res) {

    }

};