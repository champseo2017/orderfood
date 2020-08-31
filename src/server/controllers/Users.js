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
const jwt = require("jwt-simple");

exports.storeCreate = asyncHandler(async (req, res, next) => {
  const {
    Users_email,
    Users_phonenumber,
    Users_password,
    Users_image,
  } = req.body;

  const emailFunc = (email) => {
    return new Promise((resolve, reject) => {
      const strTags = striptags(email);
      const removeSpace = removeWhitespace(strTags);
      if (isNullOrEmpty(removeSpace)) {
        res.status(200).json({ message: "Email address is require." });
        res.end();
      } else if (email) {
        const checkEmail = validator.validate(removeSpace);
        if (checkEmail) {
          resolve(removeSpace);
        } else {
          res.status(200).json({ message: "Invalid email format." });
          res.end();
        }
      }
    });
  };

  const phoneFunc = (phone) => {
    const strTags = striptags(phone);
    const removeSpace = removeWhitespace(strTags);
    return new Promise((resolve, reject) => {
      if (isNullOrEmpty(removeSpace)) {
        res.status(200).json({ message: "Phone is require." });
        res.end();
      } else if (removeSpace) {
        const checkNumber = isNumber(removeSpace);
        if (checkNumber) {
          if (removeSpace.length > 10 || removeSpace.length < 10) {
            res.status(200).json({ message: "Number must be 10 digits long." });
            res.end();
          } else {
            resolve(removeSpace);
          }
        } else {
          res.status(200).json({ message: "Phone in numbers only." });
          res.end();
        }
      }
    });
  };

  const passwordFunc = (password) => {
    const strTags = striptags(password);
    const removeSpace = removeWhitespace(strTags);
    return new Promise((resolve, reject) => {
      if (isNullOrEmpty(removeSpace)) {
        res.status(200).json({ message: "Password is require." });
        res.end();
      } else if (removeSpace) {
        const schema = new passwordValidator();
        schema
          .is()
          .min(8) // Minimum length 8
          .is()
          .max(100) // Maximum length 100
          .has()
          .uppercase() // Must have uppercase letters
          .has()
          .lowercase() // Must have lowercase letters
          .has()
          .digits() // Must have digits
          .has()
          .not()
          .spaces() // Should not have spaces
          .is()
          .not()
          .oneOf(["Passw0rd", "Password123", "123456789"]); // Blacklist these values

        const checkPass = schema.validate(removeSpace, { list: true });

        if (checkPass.length !== 0) {
          res.status(200).json({ message: checkPass });
          res.end();
        } else {
          const hashedPassword = passwordHash.generate(removeSpace);
          resolve(hashedPassword);
        }
      }
    });
  };

  const imageFunc = (image) => {
    const strTags = striptags(image);
    return new Promise((resolve, reject) => {
      if (isNullOrEmpty(strTags)) {
        res.status(200).json({ message: "Images is require." });
        res.end();
      } else if (strTags) {
        const isImage = require("is-image");
        const checkImage = isImage(strTags);
        if (checkImage) {
          resolve(strTags);
        } else {
          res.status(200).json({ message: "The image format is invalid." });
          res.end();
        }
      }
    });
  };

  let resultEmail;
  try {
    resultEmail = await emailFunc(Users_email).then((res) => {
      return res;
    });
  } catch (error) {
    res.status(200).json({ message: "Error" });
    res.end();
  }

  let resultPhone;
  try {
    resultPhone = await phoneFunc(Users_phonenumber).then((res) => {
      return res;
    });
  } catch (error) {
    res.status(200).json({ message: "Error" });
    res.end();
  }

  let resultPassword;
  try {
    resultPassword = await passwordFunc(Users_password).then((res) => {
      return res;
    });
  } catch (error) {
    res.status(200).json({ message: "Error" });
    res.end();
  }

  let resultImage;
  try {
    resultImage = await imageFunc(Users_image).then((res) => {
      return res;
    });
  } catch (error) {
    res.status(200).json({ message: "Error" });
    res.end();
  }

  const usersRole = "shopstore";
  const usersActives = "inactive";
  const usersCreateat = moment().tz("Asia/Bangkok").format();

  console.log(resultEmail);
  console.log(resultPhone);
  console.log(resultPassword);
  //passwordHash.verify('Bo@1234567785555', resultPassword)
  console.log(resultImage);
  console.log(usersRole);
  console.log(usersActives);
  console.log(usersCreateat);

  // req.getConnection(
  //   asyncHandler(async (err, connection) => {
  //     if (err) return next(err);
  //     const sql = "select * from tbl_users";
  //     connection.query(sql, (err, results) => {
  //       if (err) return next(err);
  //       console.log(results);
  //     });
  //   })
  // );
});

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.user_id,
      username: user.user_name,
      iat: timestamp,
    },
    process.env.SECRET
  );
};

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

exports.getUserList = asyncHandler(async (req, res, next) => {
  const sql = `SELECT user_id, user_name, user_regdate, user_last_login FROM tbl_user ORDER BY user_name`;
  req.getConnection(
    asyncHandler(async (err, connection) => {
      if (err) return next(err);
      connection.query(sql, (err, results) => {
        if (err) return next(err);
        console.log(results);
      });
    })
  );
});
