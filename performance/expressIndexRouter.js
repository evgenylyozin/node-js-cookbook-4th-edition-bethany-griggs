"use strict";
exports.__esModule = true;
var express = require("express");
// Настроим роутер
var router = express.Router();
router.get('/', function (req, res) {
    var user = req.session.user;
    res.render('index', { user: user });
});
router.post('/', function (req, res) {
    res.render('index', {
        title: 'Пост запрос на Экспресс с ejs'
    });
});
exports["default"] = router;
