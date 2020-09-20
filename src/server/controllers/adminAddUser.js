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
const empty = require("is-empty");
const {
  duplicateEmail,
  duplicateUsername,
  addDataUserSuccess,
} = require("./messagRes");

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
          res.status(200).json({ error: "Invalid email format." });
          res.end();
          break;
        case "Email address is require.":
          res.status(200).json({ error: "Email address is require." });
          res.end();
          break;
        default:
          res.status(200).json({ error: "Error" });
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
        res.status(200).json({ error: "Password is require." });
        res.end();
      } else if (Array.isArray(error)) {
        res.status(200).json({ error: error });
        res.end();
      } else {
        res.status(200).json({ error: "Error" });
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
          res.status(200).json({ error: "Username is require." });
          res.end();
          break;

        default:
          res.status(200).json({ error: "Error" });
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
          res.status(200).json({ error: "Userrole is require." });
          res.end();
          break;

        default:
          res.status(200).json({ error: "Error" });
          res.end();
          break;
      }
    });

  // sends Data
  const objSendsDb = {
    user_email: resultEmail,
    user_name: resultUserName,
    user_password: resultPassword,
    user_role: resultUserRole,
  };

  if (
    empty(resultEmail) === false &&
    empty(resultUserName) === false &&
    empty(resultPassword) === false &&
    empty(resultUserRole) === false
  ) {
    req.getConnection(
      asyncHandler(async (err, connection) => {
        if (err) return next(err);
        // ตรวจสอบว่า Email นี้มีอยู่แล้วหรือไม่
        const sqlCheckEmail =
          "SELECT user_email FROM tbl_user WHERE user_email=?";

        // ตรวจสอบว่า Username นี้มีอยู่แล้วหรือไม่
        const sqlCheckUser = "SELECT user_name FROM tbl_user WHERE user_name=?";

        connection.query(sqlCheckEmail, [objSendsDb.user_email], (err, row) => {
          if (err) return next(err);
          const checkRowEmail = empty(row);
          if (checkRowEmail) {
            // ตรวจสอบว่ามี Username อยู่ใน db หรือไม่
            connection.query(
              sqlCheckUser,
              [objSendsDb.user_name],
              (err, row) => {
                if (err) return next(err);
                const checkRowUsername = empty(row);
                if (checkRowUsername) {
                  // insert data
                  const insertData = "insert into tbl_user set ? ";
                  connection.query(insertData, [objSendsDb], (err, row) => {
                    if (err) return next(err);
                    res.status(200).json({ message: addDataUserSuccess });
                    res.end();
                  });
                } else if (checkRowUsername === false) {
                  res.status(200).json({ error: duplicateUsername });
                  res.end();
                }
              }
            );
          } else if (checkRowEmail === false) {
            res.status(200).json({ error: duplicateEmail });
            res.end();
          }
        });
      })
    );
  }
});
