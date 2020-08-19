require("dotenv").config();
const asyncHandler = require("express-async-handler");
exports.checkAdminPage = asyncHandler(async (req, res, next) => {
    return res.status(200).send({ message: "You are admin" });
});