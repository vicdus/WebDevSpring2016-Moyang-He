var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

app.use(bodyParser.json({limit: '50mb'}));// for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: false})); // for parsing application/x-www-form-urlencoded


app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


var db = mongoose.connect('mongodb://127.0.0.1:27017/cs5610');


require("./public/assignment/server/app.js")(app,mongoose,db);

app.listen(port, ipaddress);