const multer = require("multer");
const users = require("../controllers/Users");
const fileUploadMiddleware = require("../controllers/FileUpload");
const getImages = require("../controllers/GetImages");
const csrf = require("csurf");
const passport = require("passport");
const passportService = require("../middleware/passport");
const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });
const adminMiddleware = require("../middleware/adminMiddleware");
const adminPage = require("../controllers/CheckAdmin");
const adminAddUser = require("../controllers/adminAddUser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
module.exports = function (app) {
  const csrfProtection = csrf({ cookie: true });
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  app.post("/api/users/store", users.storeCreate);
  app.post("/api/upload", fileUploadMiddleware.fileUploads);
  app.get(
    "/api/getusers",
    cors(corsOptions),
    requireAuth,
    adminMiddleware.adminProtection,
    users.getUserList
  );

  app.get(
    "/api/checkadminpages",
    cors(corsOptions),
    csrfProtection,
    requireAuth,
    adminMiddleware.adminProtection,
    adminPage.checkAdminPage
  );

  // admin add users
  app.post(
    "/api/addusers",
    cors(corsOptions),
    csrfProtection,
    requireAuth,
    adminMiddleware.adminProtection,
    adminAddUser.addUsers
  );

  app.post(
    "/api/adminlogin",
    cors(corsOptions),
    csrfProtection,
    requireSignin,
    users.signin
  );
};
