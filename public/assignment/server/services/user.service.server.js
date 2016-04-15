'use strict';


module.exports = function (app, model) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var mongoose = require("mongoose");

    app.get('/api/loggedin', loggedin);
    app.get('/api/adminloggedin', adminLoggedin);
    app.post("/api/login", passport.authenticate("local"), login);

    app.post('/api/logout', logout);


    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/user", findAllUsers);
    //
    app.put("/api/assignment/user/:id", updateUser);
    //
    ////app.get("/api/assignment/user/username=:username", findUserByUsername);
    //
    //app.get("/api/assignment/user/:id", findUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var auth = authorized;

    function localStrategy(username, password, done) {
        model
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
        model
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
        console.log(req.logOut);
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function adminLoggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.roles.indexOf("admin") != -1 ? req.user : null);
    }


    function createUser(req, res) {
        var user = req.body;
        model
            .createUser(user)
            .then(function (users) {
                res.json(users);
            });
    }


    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        model
            .updateUserById(userId, user)
            .then(function (user) {
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        model
            .findAllUsers()
            .then(function (users) {
                res.json(users)
            })
    }

    function deleteUserById(req, res) {
        model
            .deleteUserById(req.params.id)
            .then(function (users) {
                res.json(users);
            })
    }

};