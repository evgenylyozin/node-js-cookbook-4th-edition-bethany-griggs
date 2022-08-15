"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get('/login', function (req, res, next) {
    res.render('login', { fail: false });
    next();
});
router.post('/login', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
        next();
        return;
    }
    if (req.body.username === 'Евгений' && req.body.password === '12345') {
        req.session.user = { name: req.body.username };
        res.redirect('/');
        next();
        return;
    }
    res.render('login', { fail: true });
    next();
});
router.get('/logout', function (req, res, next) {
    req.session.user = null;
    res.redirect('/');
});
exports["default"] = router;
