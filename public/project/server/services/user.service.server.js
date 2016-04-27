'use strict';

var bcrypt = require("bcrypt-nodejs");
module.exports = function (app, UserModel) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var mongoose = require("mongoose");

    app.get('/api/project/loggedin', loggedin);
    passport.use("projectLogin", new LocalStrategy(localStrategy));
    app.post("/api/project/login", passport.authenticate("projectLogin"), login);
    //app.get("/api/project/user/username=:username", findUserByUsername);

    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUserById);


    app.post('/api/project/logout', logout);

    app.get("/api/project/letter/user/:username", findLettersByUsername);
    app.post("/api/project/letter/", createLetter);


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var auth = authorized;

    function localStrategy(username, password, done) {
        UserModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user == null || !bcrypt.compareSync(password, user.password)) {
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
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        UserModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        UserModel
            .updateUserById(user, req.params.id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findLettersByUsername(req, res) {
        UserModel
            .findLettersByUsername(req.params.username)
            .then(function (letters) {
                res.json(letters);
            });
    }

    function createLetter(req, res) {
        UserModel
            .createLetter(req.body)
            .then(function (letter) {
                res.json(letter);
            });
    }


};