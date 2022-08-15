"use strict";
exports.__esModule = true;
var logger = function (req, res, next) {
    console.log('Запрос получен:', req.method, req.url);
    next();
};
exports["default"] = logger;
