"use strict";
exports.__esModule = true;
exports.LoginSchema = void 0;
var joi_1 = require("joi");
exports.LoginSchema = joi_1["default"].object({
    username: joi_1["default"].string().required(),
    password: joi_1["default"].string().required()
});
