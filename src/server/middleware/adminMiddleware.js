require("dotenv").config();
const asyncHandler = require("express-async-handler");
exports.adminProtection = asyncHandler(async (req, res, next) => {
  const { user_role } = req.user;
  if (user_role === "admin") {
    return next();
  } else {
    res.status(401).json({ message: "You don't use admin, please go back." });
    res.end();
  }
});
