// BASE CONFIG
var express = require('express');
var app = express();
var port = 8081;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

// SETUP MONGODB
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/geoinsight_test");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(cb) {
    console.log('mongodb connection established');
});

// SETUP ROUTER
var router = require('./router.js')(app, express);

// START SERVER
app.listen(port);
console.log('Server running on http://localhost:'+port);
