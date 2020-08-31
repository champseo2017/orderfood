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

module.exports = function (app) {
  const csrfProtection = csrf({ cookie: true });
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  app.post("/api/users/store", users.storeCreate);
  app.post("/api/upload", fileUploadMiddleware.fileUploads);
  app.get(
    "/api/getusers",
    requireAuth,
    adminMiddleware.adminProtection,
    users.getUserList
  );
  app.get(
    "/api/images",
    requireAuth,
    adminMiddleware.adminProtection,
    getImages.getImage
  );
  app.get(
    "/api/checkadminpages",
    csrfProtection,
    requireAuth,
    adminMiddleware.adminProtection,
    adminPage.checkAdminPage
  );
  app.post("/api/adminlogin", csrfProtection, requireSignin, users.signin);
};
