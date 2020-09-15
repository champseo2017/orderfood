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
  const { user_name, user_password, user_role, user_email } = req.body;
  /* email func */
  const emailFunc = (email) => {
    return new Promise((resolve, reject) => {
      const strTags = striptags(email);
      const removeSpace = removeWhitespace(strTags);
      if (isNullOrEmpty(removeSpace)) {
        reject("Email address is require.");
      } else if (email) {
        const checkEmail = validator.validate(removeSpace);
        if (checkEmail) {
          resolve(removeSpace);
        } else {
          reject("Invalid email format.");
        }
      }
    });
  };

  /* func password */
  const passwordFunc = (password) => {
    const strTags = striptags(password);
    const removeSpace = removeWhitespace(strTags);
    return new Promise((resolve, reject) => {
      if (isNullOrEmpty(removeSpace)) {
        reject("Password is require.");
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
          reject(checkPass);
        } else {
          const hashedPassword = passwordHash.generate(removeSpace);
          resolve(hashedPassword);
        }
      }
    });
  };

  /* func Username */
  const userNameFunc = (uasername) => {
    return new Promise((resolve, reject) => {
      const strTags = striptags(uasername);
      const removeSpace = removeWhitespace(strTags);
      if (isNullOrEmpty(removeSpace)) {
        reject("Username is require.");
      } else {
        resolve(removeSpace);
      }
    });
  };

  /* func Userrole */
  const userRoleFunc = (uasername) => {
    return new Promise((resolve, reject) => {
      const strTags = striptags(uasername);
      const removeSpace = removeWhitespace(strTags);
      if (isNullOrEmpty(removeSpace)) {
        reject("Userrole is require.");
      } else {
        resolve(removeSpace);
      }
    });
  };

  let resultEmail = "";
  let resultPassword = "";
  let resultUserName = "";
  let resultUserRole = "";

  /* Email */
  resultEmail = await emailFunc(user_email)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      switch (error) {
        case "Invalid email format.":
          res.status(200).json({ message: "Invalid email format." });
          res.end();
          break;
        case "Email address is require.":
          res.status(200).json({ message: "Email address is require." });
          res.end();
          break;
        default:
          res.status(200).json({ message: "Error" });
          res.end();
          break;
      }
    });

  /* Password */
  resultPassword = await passwordFunc(user_password)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error === "Password is require.") {
        res.status(200).json({ message: "Password is require." });
        res.end();
      } else if (Array.isArray(error)) {
        res.status(200).json({ message: error });
        res.end();
      } else {
        res.status(200).json({ message: "Error" });
        res.end();
      }
    });

  /* Username */
  resultUserName = await userNameFunc(user_name)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      switch (error) {
        case "Username is require.":
          res.status(200).json({ message: "Username is require." });
          res.end();
          break;

        default:
          res.status(200).json({ message: "Error" });
          res.end();
          break;
      }
    });

  /* resultUserRole */
  resultUserRole = await userRoleFunc(user_role)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      switch (error) {
        case "Userrole is require.":
          res.status(200).json({ message: "Userrole is require." });
          res.end();
          break;

        default:
          res.status(200).json({ message: "Error" });
          res.end();
          break;
      }
    });

  // sends Data
  const objSendsDb = {
    user_email: isNullOrEmpty(resultEmail) ? null : resultEmail,
    user_name: isNullOrEmpty(resultUserName) ? null : resultUserName,
    user_password: isNullOrEmpty(resultPassword) ? null : resultPassword,
    user_role: isNullOrEmpty(resultUserRole) ? null : resultUserRole,
  };

  console.log(objSendsDb)
});
