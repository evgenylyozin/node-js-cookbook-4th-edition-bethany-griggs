"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var expressIndexRouter_1 = require("./expressIndexRouter");
var expressAuthRouter_1 = require("./expressAuthRouter");
var expressMiddleware_1 = require("./expressMiddleware");
var bodyParser = require("body-parser");
var session = require("express-session");
var helmet_1 = require("helmet");
var PORT = process.env.PORT || 3333;
var app = express();
app.set('views', path.resolve(process.cwd(), 'performance/views'));
app.set('view engine', 'ejs');
app.use((0, helmet_1["default"])());
app.use(session({
    name: 'SESSIONID',
    secret: 'Node Cookbook',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.resolve(process.cwd(), 'performance/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressMiddleware_1["default"]);
app.use('/auth', expressAuthRouter_1["default"]);
app.use('/', expressIndexRouter_1["default"]);
app.listen(PORT, function () {
    console.log('Экспресс сервер готов и слушает на порту ', PORT);
});
