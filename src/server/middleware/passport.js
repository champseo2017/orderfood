require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const localOptions = {
  passReqToCallback: true,
  usernameField: "user_email",
  passwordField: "user_password",
};
const localLogin = new LocalStrategy(localOptions, function (
  req,
  user_email,
  user_password,
  done
) {
  req.getConnection((err, connection) => {
    if (err) return next(err);
    connection.query(
      "select * from tbl_user where user_email=?",
      [user_email],
      (err, row) => {
        if (err) return done(err);
        if (!row.length) return done(null, false);
        if (row[0].user_password !== user_password) {
          return done(null, false);
        } else {
          return done(null, row[0]);
        }
      }
    );
  });
});

passport.use(localLogin);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET,
  passReqToCallback: true,
};

const jwtRoute = new JwtStrategy(jwtOptions, function (req, payload, done) {
  req.getConnection((err, connection) => {
    if (err) return next(err);
    connection.query(
      "select * from tbl_user where user_id=?",
      [payload.sub],
      (err, row) => {
        if (err) return done(err);
        if (!row.length) return done(null, false);

        return done(null, row[0]);
      }
    );
  });
});
passport.use(jwtRoute);
