require("dotenv").config();
const asyncHandler = require("express-async-handler");
const striptags = require("striptags");
const removeWhitespace = require("remove-whitespace");
const validator = require("email-validator");
const isNumber = require("is-number");
const passwordValidator = require("password-validator");
const isNullOrEmpty = require("check-is-empty-js");
const passwordHash = require("password-hash");
const moment = require("moment-timezone");

exports.addUsers = asyncHandler(async (req, res, next) => {
     console.log(req.body);
     next();
})