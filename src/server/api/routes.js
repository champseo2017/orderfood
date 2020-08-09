const multer = require('multer');
const users = require('../controllers/Users')
const fileUploadMiddleware = require('../controllers/FileUpload');
const csrf = require("csurf");

module.exports = function (app) {
  const csrfProtection = csrf({ cookie: true });
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  app.post('/api/users/store', users.storeCreate)
  app.post('/api/filesupload',upload.single('file'),fileUploadMiddleware.fileUploads)
};
