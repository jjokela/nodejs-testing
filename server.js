var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var app = express();

var controllers = require("./controllers");
// setup the view engine
app.set("view engine", "jade");

// set the public static resource folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: false }}))
app.use(flash());

// Map the routes
controllers.init(app);

var server = http.createServer(app);

server.listen(1337);

var updater = require("./updater");
updater.init(server);